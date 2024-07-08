const express = require('express')
const router = express.Router()
const User = require('../database/models/User')
const multer = require('multer')

//ROUTE 1: fetch all users' details after authentication except for password '/getusers'
router.get('/getusers', async (req, res) => {
    try {
        const users = await User.find({}).select('-password')
        return res.json(users)
    } catch (error) {
        console.error(error.message)
        res.status(404).json({ error: "Internal Server Error" })
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now()
        cb(null, uniquePrefix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('profile_picture')
//ROUTE 2: Edit user details. the logged in users can edit only their details '/updatedetails'
router.put('/updatedetails/profilepic/:id', upload, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(404).json({ error: 'File not found' })
        }
        const updatedUser = await User.findOneAndUpdate(
            { email: req.params.id },
            { $set: { profile_picture: req.file.filename } },
            { new: true })
        return res.json({ message: 'Profile pic updated successfully' })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

router.put('/updatedetails/username/:id', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { email: req.params.id },
            { $set: { name: req.body.name } },
            { new: true }
        )
        if(user){
            return res.json({ message: 'Username updated successfully!' })
        }
        return res.status(404).json({message:'User doesnt exist'})
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

module.exports = router