import { Router } from "express";
import authRouter from "./authRouter.js";
import credentialRoute from "./credentialRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialRoute);

export default router;