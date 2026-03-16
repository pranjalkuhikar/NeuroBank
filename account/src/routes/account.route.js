import express from "express";
import {
  createAccount,
  getAccount,
  user,
} from "../controllers/account.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/createAccount", authMiddleware, createAccount);
router.get("/getBalance", authMiddleware, getAccount);
router.get("/user", authMiddleware, user);

export default router;
