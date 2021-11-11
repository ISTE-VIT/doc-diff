require('dotenv').config();

const Folder = require('../models/folder');

const uploadFiles = async (req, res) => {
    const { uid, files } = req.body

    const folder = new Folder({
        uid,
        files,
    })

    await folder.save()

    return res.status(201).send("Successful upload")
}

module.exports = { uploadFiles }