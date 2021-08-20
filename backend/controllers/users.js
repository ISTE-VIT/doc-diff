const dotenv = require('dotenv').config();
const bcrypt = require("bcryptjs");
const User = require('../models/User.js');

const signUp = async (req, res) => {
    const { email, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({
            email,
            password: hashedPassword
        })

        res.status(201).json({ message: "Successful signup" })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const google = async (req, res) => {
    const { email, tokenId } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(tokenId, 12)
    
        const result = await User.create({
            email,
            password: hashedPassword
        })
    
        res.status(201).json({ message: "Successfully registered with Google" })
    } catch (error) {
        res.status(404).json({ message: "Invalid credentials" })
    }
}

module.exports = { signUp, google };