require('dotenv').config() 
const express = require('express')
const connectToDatabase = require('./database/db')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('uploads'))


app.use('/api/auth', require('./routes/auth'))
app.use('/api/userdetails', require('./routes/userdetails'))
app.use('/api/conversation', require('./routes/conversation'))
app.use('/api/message', require('./routes/message'))
app.use('/api/file', require('./routes/files'))

connectToDatabase()
app.listen(PORT, ()=>console.log("server started"))