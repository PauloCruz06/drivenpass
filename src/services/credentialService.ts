import Cryptr from "cryptr";
import dotenv from "dotenv";

import * as credentialRepository from "../repositories/credentialRepository.js";

dotenv.config();

export async function registerCredential(
    userId: number,
    title: string,
    userName: string,
    url: string,
    password: string
) {
    const cryptr = new Cryptr(process.env.SECRET || 'secret');

    const userCredentialList = await
        credentialRepository.findCredentialsByUserId(userId);
    if(userCredentialList.some(cred => cred.title === title))
        throw {code: 'Conflict', message: 'Credential title already exist'};
    
    let site = await credentialRepository.findUrlbyUrl(url);
    if(!site)
        site = await credentialRepository.insertUrl(url);
    
    const hashCredPassword = cryptr.encrypt(password);

    await credentialRepository.insertCredential({
        userId,
        title,
        userName,
        credentialUrlId: site.id,
        credentialPassword: hashCredPassword
    });
}