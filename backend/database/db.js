require('dotenv').config() 
const { configDotenv } = require('dotenv')
const mongoose = require('mongoose')
const URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.bbu7wg9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectToDatabase = async () => {
    try {
        await mongoose.connect(URI)
        console.log('connected to DB')
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = connectToDatabase