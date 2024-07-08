const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,    
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date_of_birth:{
        type: Date,
    },
    gender:{
        type: String,
    },
    profile_picture:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users', UserSchema)