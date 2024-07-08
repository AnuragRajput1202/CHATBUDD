require('dotenv').config() 
const { configDotenv } = require('dotenv')
const mongoose = require('mongoose')
const URI = process.env.MONGODB_URL

const connectToDatabase = async () => {
    try {
        await mongoose.connect(URI)
        console.log('connected to DB')
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = connectToDatabase