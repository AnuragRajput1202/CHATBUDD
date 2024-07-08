const express = require('express')
const router = express.Router()
const Conversation = require('../database/models/Conversation')


router.post('/add', async (req, res) => {
    try {
        const { senderId, receiverId } = req.body
        const convExist = await Conversation.findOne({ members: { $all: [senderId, receiverId] } })
        if (convExist) {
            return res.json({ message: 'Conversation already exists' })
        }
        const newConversation = new Conversation({
            members: [senderId, receiverId]
        })
        await newConversation.save()
        return res.json({ message: 'Conversation saved successfully' })
    } catch (error) {
        console.error(error)
        return res.json({ error: 'Internal Server error' })
    }

})

router.post('/get', async (req, res) => {
    try {
        const { senderId, receiverId } = req.body
        const data = await Conversation.findOne({ members: { $all: [senderId, receiverId] } })
        if (!data) {
            return res.json({message:"Conversation does not exist"})
        }
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.json({ error: 'Internal Server error' })
    }

})
module.exports = router