import { prisma } from "../config/database.js";
import { noteData } from "../types/noteType";

export async function findNotesByUserId(userId: number) {
    const result = await prisma.notes.findMany({
        where: { userId },
    });
    return result;
}

export async function insertNote(note: noteData) {
    await prisma.notes.create({ data: note });
}