import express from "express";
import AuthController from "../controllers/AuthController.js";
import authMiddlware from "../middleware/AuthMiddleware.js";

const router = express.Router()


router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)

//
router.get("/auth/user", authMiddlware, AuthController.user)

export default router