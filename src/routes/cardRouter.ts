import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import cardSchema from "../schemas/cardSchema.js";
import validateIdSchema from "../schemas/validateIdSchema.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import {
    registerCard,
    showUserCards,
    showCardById,
    deleteCard
} from "../controller/cardController.js";

const cardRouter = Router();

cardRouter.post(
    "/register/cards",
    validateSchema(cardSchema),
    tokenValidation,
    registerCard
);
cardRouter.get(
    "/cards",
    tokenValidation,
    showUserCards
)
cardRouter.get(
    "/cards/:id",
    validateSchema(validateIdSchema),
    tokenValidation,
    showCardById
)
cardRouter.delete(
    "/remove/cards/:id",
    validateSchema(validateIdSchema),
    tokenValidation,
    deleteCard
)

export default cardRouter;