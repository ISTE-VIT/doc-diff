const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    files: Object,
    shareable: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Project', projectSchema);