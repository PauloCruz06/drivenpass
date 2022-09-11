import { Notes } from "@prisma/client";

export type noteData = Omit<Notes, "id">;