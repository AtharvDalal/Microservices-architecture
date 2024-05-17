import express from "express";
import Postroutes from '../routes/Postroute.js'

const router = express.Router();


router.use("/api",Postroutes)


export default router