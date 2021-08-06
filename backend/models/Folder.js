const mongoose = require('mongoose');

const filesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true
    },
    content: {
        type: Array,
        default: [],
        required: true
    },
})

const folderSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true, 
    },
    files: [filesSchema]
})

module.exports = mongoose.model('Folder', folderSchema);