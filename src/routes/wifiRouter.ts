import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import wifiSchema from "../schemas/wifiSchema.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import { registerWifi } from "../controller/wifiController.js";

const wifiRouter = Router();

wifiRouter.post(
    "/register/wifis",
    validateSchema(wifiSchema),
    tokenValidation,
    registerWifi
);

export default wifiRouter;