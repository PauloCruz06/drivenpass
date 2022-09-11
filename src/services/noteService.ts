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
    const userNotesList = await
        noteRepository.findNotesByUserId(userId);
    verifyList(userNotesList, "notes");

    return userNotesList;
}

export async function showNotebyId(noteId: number, userId: number) {
    const note = await verifyNoteOwner(noteId, userId);

    return note;
}

export async function deleteNote(noteId: number, userId: number) {
    await verifyNoteOwner(noteId, userId);
    const result = await noteRepository.removeNote(noteId);

    return result;
}

async function verifyNoteOwner(noteId: number, userId: number) {
    const note = await noteRepository.findNoteById(noteId);
    
    if(!note)
        throw { code: 'NotFound', message: 'Note not found' };
    if(note.userId !== userId)
        throw { code: 'Unauthorized', message: 'User not allowed' };
    
    return note;
}