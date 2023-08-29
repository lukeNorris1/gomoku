import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose'
import corsOptions from './config/corsOptions.js'
import userRoutes from './new/routes/users.js'
import gameRoutes from './new/routes/games.js'



const app = express();
dotenv.config();

// Enable CORS
app.use(cors(corsOptions))
// app.use(cors())
app.use(express.json());



app.get("/", (req, res) => {
  res.status(201).json({ message: "Backend Root Dir" });
});

//Routes
app.use("/api/games", gameRoutes);
app.use("/api/auth", userRoutes);



const DB_URL = process.env.SERVER_URL
const PORT = process.env.SERVER_PORT || 5000
 
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message))
 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
})
 

