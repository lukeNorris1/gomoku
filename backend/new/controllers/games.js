import bcrypt from "bcryptjs";
import gameSchema from '../schemas/games.js'
import dotenv from 'dotenv'
import { indexOfTile, checkWinBlock, gameFinishCheck } from "../utils/gameFunctions.js";

dotenv.config()


export const getAllGames = async (req, res) => {
    try {
        const allGames = await gameSchema.find({})
  
        return res.status(200).send(
            allGames
          );
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
}

export const getGameById = async (req, res) => {
    const gameId = req.params.id;
    try {
        const foundGame = await gameSchema.findById(gameId)
        res.status(200).json(foundGame)
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}



export const createGame = async (req, res) => {
    const game = req.body;

    const { body } = game.finishedGame


    const newGame = new gameSchema({ body });


    try {
        await newGame.save()
        res.status(201).json(newGame)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

export const editGame = async (req, res) => {
    let game = req.body;
    const gameId = req.params.id;

    game.winner = gameFinishCheck(game)

    // Update the user
    const updatedGame = await gameSchema.findByIdAndUpdate(gameId, game, { new: true });
        
    if (!updatedGame) return res.status(404).json({error: "Game not found"})

    try {
        res.status(201).json(updatedGame._id)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

export const checkForWinner = async (req, res) => {
    let game = req.body;

    game.winner = gameFinishCheck(game.state)
    try {
        res.status(201).json(game)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

export const deleteGameById = async (req, res) => {
    try {
        const gameId = req.params.id
        const deletedGame = await gameSchema.findByIdAndDelete(gameId);
    
        if (!deletedGame) {
          return res.status(404).json({ error: 'Game not found' });
        }
    
        

        res.status(200).json({ message: 'Game deleted successfully' });
 
      } catch (error) {
        if (error.name === 'CastError') {
          return res.status(400).json({ error: 'Invalid game ID' });
        }
        res.status(500).json({ error: 'An error occurred while deleting the user' });
      }
    }