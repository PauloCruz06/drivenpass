import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import credentialSchema from "../schemas/credentialSchema.js";
import validateIdSchema from "../schemas/validateIdSchema.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import {
    registerCredential,
    showUserCredentials,
    showCredentialbyId,
    deleteCredential
} from "../controller/credentialController.js";

const credentialRoute = Router();

credentialRoute.post(
    "/register/credentials",
    validateSchema(credentialSchema),
    tokenValidation,
    registerCredential
);
credentialRoute.get(
    "/credentials",
    tokenValidation,
    showUserCredentials
);
credentialRoute.get(
    "/credentials/:id",
    validateSchema(validateIdSchema),
    tokenValidation,
    showCredentialbyId
);
credentialRoute.delete(
    "/remove/credentials/:id",
    validateSchema(validateIdSchema),
    tokenValidation,
    deleteCredential
);

export default credentialRoute;