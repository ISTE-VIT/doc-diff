const mongoose = require('mongoose');

const childrenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    }
})

childrenSchema.add({ children: [childrenSchema] })

const projectSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: "Untitled",
    },
    children: [childrenSchema],
    shareable: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Project', projectSchema);