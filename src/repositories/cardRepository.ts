import { prisma } from "../config/database.js";
import { cardData } from "../types/cardType.js";

export async function findCardbyUserId(userId: number) {
    const result = await prisma.cards.findMany({
        where: { userId },
    });
    return result;
}

export async function insertCard(card: cardData) {
    await prisma.cards.create({ data: card });
}