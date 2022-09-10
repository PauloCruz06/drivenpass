import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import validateUserSchema from "../schemas/validateUserSchema.js";
import { signUp } from "../controller/authController.js";

const authRouter = Router();

authRouter.post(
    "/signup",
    validateSchema(validateUserSchema),
    signUp
);

export default authRouter;
