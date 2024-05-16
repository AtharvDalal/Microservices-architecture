import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router()

router.get("/getuser/:id", UserController.getUser)

export default router