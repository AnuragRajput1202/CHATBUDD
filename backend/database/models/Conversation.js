const mongoose = require('mongoose')
const { Schema } = mongoose

const ConversationSchema = new Schema({
    members: {
        type: Array
    },
    last_message: {
        type: String
    }
},
    {
        timestamps: true
    }

)
module.exports = mongoose.model('Conversation', ConversationSchema)