import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import noteSchema from "../schemas/noteSchema.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import { registerNote } from "../controller/noteController.js";

const noteRouter = Router();

noteRouter.post(
    "/register/notes",
    validateSchema(noteSchema),
    tokenValidation,
    registerNote
);

export default noteRouter;