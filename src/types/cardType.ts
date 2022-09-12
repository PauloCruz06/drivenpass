import { Cards } from "@prisma/client";

export type cardData = Omit<Cards, "id">;