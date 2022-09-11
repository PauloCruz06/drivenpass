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

export async function showNotesbyId(req: Request, res: Response) {
    const userId = res.locals.user.id;
    const noteId = Number(req.params.id);

    const userNote = await noteService.showNotebyId(noteId, userId);

    res.status(200).send(userNote);
}

export async function deleteNote(req: Request, res: Response) {
    const userId = res.locals.user.id;
    const noteId = Number(req.params.id);

    const result = await noteService.deleteNote(noteId, userId);

    res.status(204).send(result);
}