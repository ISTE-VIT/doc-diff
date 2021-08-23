const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: "Untitled",
    },
    files: Object,
    shareable: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Project', projectSchema);