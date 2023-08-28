import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
  body: {
    size: { type: Number, required: true },
    winner: { type: String },
    moves: { type: [Number], required: true },
  },
}, 
{ 
  timestamps: true,
  collection: 'games'
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
