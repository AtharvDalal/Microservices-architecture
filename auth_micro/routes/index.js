import express from "express";
import AuthRoutes from './authRoutes.js'
import UserRoutes from './userRoutes.js'


const router = express.Router()

router.use('/api',AuthRoutes )
router.use('/api', UserRoutes)

export default router