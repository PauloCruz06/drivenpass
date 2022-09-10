import { Request, Response } from "express";

import * as authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
   const { email, password } = req.body;
   await authService.signUp({ email, password });
   
   res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
   const { email, password } = req.body;
   const token = await authService.login({ email, password });

   res.status(200).send(token);
}