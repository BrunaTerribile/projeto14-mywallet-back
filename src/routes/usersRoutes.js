import { signIn, signUp } from '../controllers/authController.js';
import { Router } from "express";

const router = Router();

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

export default router;