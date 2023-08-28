import express from 'express'
import { getAllGames, getGameById, createGame, editGame, deleteGameById, checkForWinner } from '../controllers/games.js'

const router = express.Router();



router.get('/all', getAllGames)
router.get('/:id', getGameById)
router.post('/create', createGame)
router.post('/check', checkForWinner)
router.put('/edit/:id', editGame)
router.delete('/delete/:id', deleteGameById)

export default router
