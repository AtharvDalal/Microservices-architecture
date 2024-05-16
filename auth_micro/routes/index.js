import express from "express";
import AuthRoutes from './authRoutes.js'


const router = express.Router()

router.use('/api',AuthRoutes )

export default router