import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import validateIdSchema from "../schemas/validateIdSchema.js";
import wifiSchema from "../schemas/wifiSchema.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import {
    registerWifi,
    showUserWifis,
    showWifiById,
    removeWifi
} from "../controller/wifiController.js";

const wifiRouter = Router();

wifiRouter.post(
    "/register/wifis",
    validateSchema(wifiSchema),
    tokenValidation,
    registerWifi
);
wifiRouter.get(
    "/wifis",
    tokenValidation,
    showUserWifis
);
wifiRouter.get(
    "/wifis/:id",
    validateSchema(validateIdSchema),
    tokenValidation,
    showWifiById
)
wifiRouter.delete(
    "/remove/wifis/:id",
    validateSchema(validateIdSchema),
    tokenValidation,
    removeWifi
)

export default wifiRouter;