const express = require('express')
const router = express.Router()
const User = require('../database/models/User')
const multer = require('multer')
const bcryptjs = require('bcryptjs')
const { validationResult, body } = require('express-validator')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './backend/uploads/')
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now()
        cb(null, uniquePrefix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('profile_picture')

//ROUTER 1: when user fills the sign up form- New user should be created----'api/auth/createuser'
router.post('/createuser', upload, [
    body('name', 'Invalid name! Minimum 3 characters are required').isLength({ min: 3 }),
    body('email', 'Invalid email! Please provide email in user@example.com format').isEmail(),
    body('password', 'Invalid password! Minimum 5 characters are required').isLength({ min: 5 }),
],
    async (req, res) => {
        let success = false
        //validating user-inputs
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        let user = await User.findOne({ email: req.body.email })
        //validating if the given email id exist or not
        try {
            if (user) {
                return res.status(404).json({ error: "User with this email already exists. Please provide a unique email ID" })
            }
            //encrypting password
            const salt = await bcryptjs.genSalt(10)
            if (req.file) {
                const securedPassword = await bcryptjs.hash(req.body.password, salt)
                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: securedPassword,
                    date_of_birth: req.body.date_of_birth,
                    gender: req.body.gender,
                    profile_picture: req.file.filename
                })
            } else {
                const securedPassword = await bcryptjs.hash(req.body.password, salt)
                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: securedPassword,
                    date_of_birth: req.body.date_of_birth,
                    gender: req.body.gender,
                })
            }
            success = true
            res.json({success, message: "User Created!"})
        } catch (error) {
            console.error(error.message)
            res.status(404).json({ error: "Internal Server Error" })
        }
    })

//ROUTER 2 : when user tries to login ---'api/auth/login'
router.post('/login', [
    body('email', 'Invalid email! Please provide email in user@example.com format').isEmail(),
    body('password', 'Invalid password! Minimum 5 characters are required').isLength({ min: 5 })
],
    async (req, res) => {
        let success = false
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        //authenticating users details
        try {
            let user = await User.findOne({ email: req.body.email })
            if (!user) {
                success = false 
                return res.status(404).json({ success, error: "Invalid Credentials! Please try again" })
            }
            const comparePassword = await bcryptjs.compare(req.body.password, user.password)
            if (!comparePassword) {
                success = false
                return res.status(404).json({success, error: "Invalid Credentials! Please try again" })
            }
            success = true
            res.json({success, message: "Logged in successfully!"})
        } catch (error) {
            console.error(error.message)
            res.status(404).json({ error: "Internal Server Error" })
        }
    })

module.exports = router