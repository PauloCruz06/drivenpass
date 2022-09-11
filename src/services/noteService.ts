import * as noteRepository from "../repositories/noteRepository.js";
import { verifyTitle, verifyList } from "./utils.js";

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

export async function showUserNotes(userId: number) {
    const userNoteslist = await
        noteRepository.findNotesByUserId(userId);
    verifyList(userNoteslist, "notes");

    const notesList = userNoteslist.map(note => ({
        userId: note.userId,
        title: note.title,
        note: note.note
    }));

    return notesList
}