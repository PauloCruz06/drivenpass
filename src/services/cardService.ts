import Cryptr from "cryptr";
import dotenv from "dotenv";

import { cardData } from "../types/cardType";
import * as cardRepository from "../repositories/cardRepository.js"
import { verifyTitle } from "./utils.js";

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