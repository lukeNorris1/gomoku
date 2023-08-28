import bcrypt from "bcryptjs";
import userSchema from '../schemas/users.js'
import dotenv from 'dotenv'

dotenv.config()


export const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
  
        // check if user already exist
        // Validate if user exist in our database
        const existingUser = await userSchema.findOne({ username }).exec();
  
        if (existingUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
  
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
  
        // Create user in our database
        const newUser = new userSchema({
            username,
            password: encryptedPassword,
          });
    
        try {
            await newUser.save()
            res.status(201).json(newUser._id)
        } catch (error) {
            res.status(409).json(error.message)
        }
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
}

export const loginUser = async (req, res) => {
    try {
        // Get user input
        const { username, password } = req.body;
  
        // Validate if user exist in our database
        const user = await userSchema.findOne({ username }).exec();
  
        if (user && (await bcrypt.compare(password, user.password))) {
          return res.status(200).json({ _id: user._id});
        }
        return res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(`error: ${err}`);
        return res.status(500).send(err);
      }
}

export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const specificUser = await userSchema.findById(userId)
        res.status(200).json(specificUser)
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}
