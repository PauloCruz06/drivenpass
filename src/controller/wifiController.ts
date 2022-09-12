import { Request, Response } from "express";

import * as wifiService from "../services/wifiService.js";

export async function registerWifi(req: Request, res: Response) {
    const userId = res.locals.user.id;
    const body = req.body;

    await wifiService.registerWifi({userId, ...body});

    res.sendStatus(201);
}

export async function showUserWifis(req: Request, res: Response) {
    const { id } = res.locals.user;

    const userWifiList = await wifiService.showUserWifis(id);

    res.status(200).send(userWifiList);
}

export async function showWifiById(req: Request, res: Response) {
    const userId = res.locals.user.id;
    const wifiId = Number(req.params.id);

    const wifi = await wifiService.showWifiById(wifiId, userId);

    res.status(200).send(wifi);
}