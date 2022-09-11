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