import express from "express";
import transitionRoute from "./transition.route.js";

const router = express.Router();

router.use("/transition", transitionRoute);

export default router;
