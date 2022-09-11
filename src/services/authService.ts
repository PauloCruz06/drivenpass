import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import * as authRepository from "../repositories/authRepository.js";

dotenv.config();

export async function signUp(email: string, password: string) {
    const userList = await authRepository.findAllUsers();
    if(userList.some(user => user.email === email))
        throw { code: 'Conflict', message: 'User already registered' };
    
    const hashPassword = bcrypt.hashSync(password, 10);
    await authRepository.insertUser({
        email: email,
        password: hashPassword
    });
}

export async function login(email: string, password: string) {
    const user = await authRepository.findUserByEmail(email);
    if(!user)
        throw { code: 'NotFound', message: 'User not found' };

    const compareHash = bcrypt.compareSync(password, user.password);
    if(!compareHash)
        throw { code: 'Unauthorized', message: 'Invalid password!' };

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        }, process.env.SECRET || 'secret', {
            expiresIn: 1800
        }
    );
    return {
        id: user.id,
        email: user.email,
        token
    };
}