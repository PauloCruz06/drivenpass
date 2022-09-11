import { Router } from "express";
import authRouter from "./authRouter.js";
import credentialRoute from "./credentialRouter.js";
import noteRouter from "./noteRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialRoute);
router.use(noteRouter);

export default router;