import * as credentialRepository from "../repositories/credentialRepository.js";
import { credentialData } from "../types/credentialType";

export async function registerCredential(
    userId: number, credential: credentialData
) {
    const userCredentialList = await
        credentialRepository.findCredentialsByUserId(userId);
    if(userCredentialList.some(cred => cred.title === credential.title))
        throw {code: 'Conflict', message: 'Credential title already exist'};
    
    //const email = await credentialRepository.findUrlbyUrl()
}