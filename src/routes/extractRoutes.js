import { getExtract, addEntry, addOutgo } from '../controllers/userController.js';
import { Router } from "express";

const router = Router();

router.get("/extract", getExtract);

router.post("/new-entry", addEntry);

router.post("/new-outgo", addOutgo);

export default router;