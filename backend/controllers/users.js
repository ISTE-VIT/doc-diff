const dotenv = require('dotenv').config();
const bcrypt = require("bcryptjs");
const User = require('../models/User.js');

const signUp = async (req, res) => {
    const { email, password } = req.body
    console.log(email);
    console.log(password);
    try {
        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({
            email,
            password: hashedPassword
        })

        res.status(201).send(result)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const google = async (req, res) => {
    const { email, tokenId } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
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
    } else {
        res.status(200).json({ message: "Signed in with already registered Google account" })
    }
}

module.exports = { signUp, google };