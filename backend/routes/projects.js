const express = require('express');

const router = express.Router();

// Display all projects
router.get('/', (req, res) => {
    res.send('Hello world!');
})

// Create a new project
// router.post('/create', (req, res) => {
    
// })

module.exports = router;