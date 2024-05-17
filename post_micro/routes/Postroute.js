import express from 'express'
import authMiddlware from '../middleware/authMiddlware.js'
import PostController from '../controllers/PostController.js'


const router = express.Router()

router.get('/post', authMiddlware, PostController.index)

router.post('/post', authMiddlware, PostController.store)

export default router