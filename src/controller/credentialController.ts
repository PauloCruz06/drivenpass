import { Request, Response } from "express";

import * as credentialService from "../services/credentialService.js"

export async function registerCredential(req: Request, res: Response) {
    const { id } = res.locals.user;
    const { title, userName, url, password } = req.body;

    await credentialService.registerCredential(
        id, title, userName, url, password
    );

    res.sendStatus(201);
}

export async function showUserCredentials(req: Request, res: Response) {
    const { id } = res.locals.user;
    
    const credentialList = await credentialService.showUserCredentials(id);

    res.status(200).send(credentialList);
}

export async function showCredentialbyId(req: Request, res: Response) {
    const user = res.locals.user;
    const credentialId = Number(req.params.id);

    const credential = await
        credentialService.showCredentialbyId(credentialId, user.id);

    res.status(200).send(credential);
}