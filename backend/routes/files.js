const express = require('express')
const router = express.Router()
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')

const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.bbu7wg9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const  storage = new GridFsStorage({
    url : url,
    file: (req, file)=>{
        const match = ['image/png', 'image/jpg']
        if(match.indexOf(file.mimetype)===-1){
            return `${Date.now()}-file-${file.originalname}`
        }
        return {
            bucketName : 'photos',
            fileName : `${Date.now()}-file-${file.originalname}`
        }
    }
})
const upload = multer({storage})

router.post('/fileupload', upload.single('file'), (req, res)=>{
    try {
        if(!req.file){
            return res.status(404).json({error:"file not found"})
        }
        const imageUrl = `https://chatbudd-3rqh.onrender.com/api/file/getfile/${req.file.filename}`
        res.json(imageUrl)
    } catch (error) {
        res.status(404).json({error})
        console.error(error)
    }
})
let gfs, gridFsBucket
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const conn = mongoose.connection
conn.once('open', ()=>{
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName : 'fs',
    })
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('fs')
})

router.get('/getfile/:filename', async (req, res)=>{
    try {
        const file = await gfs.files.findOne({filename:req.params.filename})
        const readStream = gridFsBucket.openDownloadStream(file._id)
        readStream.pipe(res)
    } catch (error) {
        res.status(404).json(error.message)
        console.error(error)
    }
})

module.exports = router