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
<<<<<<< HEAD
    children: [childrenSchema]
=======
    children: [childrenSchema],
    shareable: {
        type: Boolean,
        default: false,
    }
>>>>>>> 48793095b67aa06702fa20deb02fed1fa31afe19
});

module.exports = mongoose.model('Project', projectSchema);