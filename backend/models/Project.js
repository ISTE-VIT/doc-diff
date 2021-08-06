const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    fid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    }
})

module.exports = mongoose.model('Project', projectSchema);