import Cryptr from "cryptr";
import dotenv from "dotenv";

import { cardData } from "../types/cardType";
import * as cardRepository from "../repositories/cardRepository.js"
import { verifyTitle, verifyList } from "./utils.js";

dotenv.config();
const cryptr = new Cryptr(process.env.SECRET || 'secret');

export async function registerCard(card: cardData) {
    const userCardList = await
        cardRepository.findCardbyUserId(card.userId);
    verifyTitle(userCardList, card.title);

    const hashCardCVV = cryptr.encrypt(card.cardCVV);
    const hashCardPassword = cryptr.encrypt(card.password);

    await cardRepository.insertCard({
        ...card,
        cardCVV: hashCardCVV,
        password: hashCardPassword
    });
}

export async function showUserCards( userId: number) {
    const userCardsList = await
        cardRepository.findCardbyUserId(userId);
    verifyList(userCardsList, 'cards');

    const cardList = userCardsList.map((card) => ({
        ...card,
        cardCVV: cryptr.decrypt(card.cardCVV),
        password: cryptr.decrypt(card.password)
    }));

    return cardList;
}

export async function showCardById( cardId: number, userId: number ) {
    const card = await verifyCardOwner(cardId, userId);

    const userCard = {
        ...card,
        cardCVV: cryptr.decrypt(card.cardCVV),
        password: cryptr.decrypt(card.password)
    };

    return userCard;
}

async function verifyCardOwner(cardId: number, userId: number) {
    const card = await cardRepository.findCardById(cardId);

    if(!card)
        throw { code: 'NotFound', message: 'card not found' };
    if(userId !== card.userId)
        throw { code: 'Unauthorized', message: 'User not allowed' };

    return card;
}