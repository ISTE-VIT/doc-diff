require('dotenv').config();

const Folder = require('../models/folder');

const uploadFiles = (req, res) => {
    const { uid, files} = req.body  
    console.log(files);

    Folder.create({
        uid,
        files, 
    })

    return res.status(201).send("Successful upload")
}

module.exports = { uploadFiles }