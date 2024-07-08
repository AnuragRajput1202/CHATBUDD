const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = new Schema({
    conversationId:{
        type:String
    },
    senderId:{
        type: String
    },
    receiverId:{
        type:String
    },
    value:{
        type:String
    },
    type:{
        type:String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('message', messageSchema)