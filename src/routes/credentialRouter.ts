import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import credentialSchema from "../schemas/credentialSchema.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import {
    registerCredential
} from "../controller/credentialController.js";

const credentialRoute = Router();

credentialRoute.post(
    "/register/credentials",
    validateSchema(credentialSchema),
    tokenValidation,
    registerCredential
);

export default credentialRoute;