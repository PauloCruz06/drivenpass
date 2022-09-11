import * as noteRepository from "../repositories/noteRepository.js";
import { verifyTitle } from "./utils.js";

export async function registerNote(
    userId: number,
    title: string,
    note: string
) {
    const notesUserList = await
        noteRepository.findNotesByUserId(userId);
    verifyTitle(notesUserList, title);
    
    await noteRepository.insertNote({
        userId,
        title,
        note
    });
}