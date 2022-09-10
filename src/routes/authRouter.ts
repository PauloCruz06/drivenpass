import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import validateUserSchema from "../schemas/validateUserSchema.js";
import { signUp, login } from "../controller/authController.js";

const authRouter = Router();

authRouter.post(
    "/signup",
    validateSchema(validateUserSchema),
    signUp
);

authRouter.post(
    "/login",
    validateSchema(validateUserSchema),
    login
)

export default authRouter;
