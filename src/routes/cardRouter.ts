import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import cardSchema from "../schemas/cardSchema.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import { registerCard } from "../controller/cardController.js";

const cardRouter = Router();

cardRouter.post(
    "/register/cards",
    validateSchema(cardSchema),
    tokenValidation,
    registerCard
);

export default cardRouter;