import { Request, Response } from "express";

import * as cardService from "../services/cardService.js";

export async function registerCard(req: Request, res: Response) {
    const userId = res.locals.user.id;
    const body = req.body;

    await cardService.registerCard({ userId, ...body });

    res.sendStatus(201);
}