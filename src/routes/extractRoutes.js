import { getExtract, addEntry, addOutgo } from '../controllers/userController.js';
import { Router } from "express";
import { getUser } from "../middlewares/userMiddleware.js"

const router = Router();

router.use(getUser);

router.get("/extract", getExtract);

router.post("/new-entry", addEntry);

router.post("/new-outgo", addOutgo);

export default router;