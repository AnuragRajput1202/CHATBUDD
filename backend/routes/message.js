const express = require('express')
const router = express.Router()
const Message = require('../database/models/Message')
const Conversation = require('../database/models/Conversation')

router.post('/add', async (req, res) => {
    try {
        const newMessage = new Message(req.body)
        await newMessage.save()
        await Conversation.findByIdAndUpdate(req.body.conversationId, { last_message: req.body.value })
        res.json({ message: "message saved successfully!" })
    } catch (error) {
        console.error(error)
        return res.json({ error: `${error}` })
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.id })
        return res.json(messages)
    } catch (error) {
        console.error(error)
        return res.json({ error: `${error}` })
    }
})

router.delete('/delete/:c_id', async (req, res)=>{
    try {
        const messages = await Message.deleteMany(
            {conversationId : req.params.c_id}
        )
        if(messages){
            return res.json(messages)
        } else{
            return res.json({message:'No messages to delete'})
        }
    } catch (error) {
        console.error(error)
        return res.status(404).json({ error: `${error}` })
    }
})

module.exports = router