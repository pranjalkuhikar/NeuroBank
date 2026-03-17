import express from "express";
import { createTransition } from "../controllers/transition.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/createTransition", authMiddleware, createTransition);

export default router;
