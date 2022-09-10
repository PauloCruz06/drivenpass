import bcrypt from "bcrypt";

import * as authRepository from "../repositories/authRepository.js";

export async function signUp(email: string, password: string) {
    const userList = await authRepository.findAllUsers();
    if(userList.some(user => user.email === email))
        throw { code: 'Conflict', message: 'User already registered' };
    
    const hashPassword = bcrypt.hashSync(password, 10);
    await authRepository.insertUser({
        email,
        password: hashPassword
    });
}