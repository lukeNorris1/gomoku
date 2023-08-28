import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, minlength  : 8, required: true},
    },
    { timestamps: true },
    { collection: 'users' }
)

const User = mongoose.model('User', userSchema)

export default User