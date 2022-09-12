import { Request, Response } from "express";

import * as cardService from "../services/cardService.js";

export async function registerCard(req: Request, res: Response) {
    const userId = res.locals.user.id;
    const body = req.body;

    await cardService.registerCard({ userId, ...body });

    res.sendStatus(201);
}

export async function showUserCards(req: Request, res: Response) {
    const { id } = res.locals.user;

    const cardsList = await cardService.showUserCards(id);

    res.status(200).send(cardsList);
}

export async function showCardById(req: Request, res: Response) {
    const userId = res.locals.user.id;
    const cardId = Number(req.params.id);

    const card = await cardService.showCardById(cardId, userId);

    res.status(200).send(card);
}