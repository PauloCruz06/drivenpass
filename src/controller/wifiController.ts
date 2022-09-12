import { Request, Response } from "express";

import * as wifiService from "../services/wifiService.js";

export async function registerWifi(req: Request, res: Response) {
    const userId = res.locals.user.id;
    const body = req.body;

    await wifiService.registerWifi({userId, ...body});

    res.sendStatus(201);
}