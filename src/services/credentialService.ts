import Cryptr from "cryptr";
import dotenv from "dotenv";

import * as credentialRepository from "../repositories/credentialRepository.js";

dotenv.config();
const cryptr = new Cryptr(process.env.SECRET || 'secret');

export async function registerCredential(
    userId: number,
    title: string,
    userName: string,
    url: string,
    password: string
) {
    const userCredentialList = await
        credentialRepository.findCredentialsByUserId(userId);
    if(userCredentialList.some(cred => cred.title === title))
        throw { code: 'Conflict', message: 'Credential title already exist' };
    
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

export async function showUserCredentials(userId: number) {
    const userCredentialList = await
        credentialRepository.findCredentialsByUserId(userId);
    if(!userCredentialList.length)
        throw { code: 'NotFound', message: 'User credentials do not exist' };
    
    const urlList = await credentialRepository.findUrl();
    
    const credentialList = userCredentialList.map((credential) => ({
        userId: credential.userId,
        title: credential.title,
        userName: credential.userName,
        credentialUrl: urlList.find(url =>
            url.id === credential.credentialUrlId
        )?.url,
        credentialPassword: cryptr.decrypt(credential.credentialPassword)
    }));

    return credentialList;
}

export async function showCredentialbyId(id: number, userId: number) {
    const credential = await
        credentialRepository.findCredentialById(id);
    if(!credential)
        throw { code: 'NotFound', message: 'Credential not found' };
    if(userId !== credential.userId)
        throw { code: 'Unauthorized', message: 'User not allowed' };
    
    const userCredential = {
        userId: credential.userId,
        title: credential.title,
        userName: credential.userName,
        credentialUrl: await credentialRepository.findUrlbyId(
            credential.credentialUrlId
        ),
        credentialPassword: cryptr.decrypt(credential.credentialPassword)
    };

    return(userCredential);
}