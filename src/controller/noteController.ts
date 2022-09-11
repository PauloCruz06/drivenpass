import { Request, Response } from "express";

import * as noteService from "../services/noteService.js";

export async function registerNote(req: Request, res: Response) {
    const { id } = res.locals.user;
    const { title, note } = req.body;

    await noteService.registerNote(id, title, note);

    res.sendStatus(201);
}

export async function showUserNotes(req: Request, res: Response) {
    const { id } = res.locals.user;

    const userNoteslist = await noteService.showUserNotes(id);

    res.status(200).send(userNoteslist);
}