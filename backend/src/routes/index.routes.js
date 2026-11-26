import { Router } from "express";
import authRoutes from "./auth.routes.js";
import conversationRoutes from "./conversation.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/conversations", conversationRoutes);

export default router;
