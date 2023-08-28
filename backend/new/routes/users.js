import express from 'express'
import { loginUser, createUser, getUserById } from '../controllers/users.js'

const router = express.Router();



router.post('/signin', loginUser)
router.post('/signup', createUser)
router.get('/:id', getUserById)

export default router
