import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import * as authRepository from "../repositories/authRepository.js";
import { userData } from "../types/userType.js";

dotenv.config();

export async function signUp(body: userData) {
    const userList = await authRepository.findAllUsers();
    if(userList.some(user => user.email === body.email))
        throw { code: 'Conflict', message: 'User already registered' };
    
    const hashPassword = bcrypt.hashSync(body.password, 10);
    await authRepository.insertUser({
        email: body.email,
        password: hashPassword
    });
}

export async function login(body: userData) {
    const user = await authRepository.findUserByEmail(body.email);
    if(!user)
        throw { code: 'NotFound', message: 'User not found' };

    const compareHash = bcrypt.compareSync(body.password, user.password);
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
    return token;
}