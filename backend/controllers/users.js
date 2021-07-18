const dotenv = require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(`${CLIENT_ID}`)

const User = require('../models/User.js');

const signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({email})
        if (!existingUser) return res.status(404).json({message: "User doesn't exist"})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"})

        const token = jwt.sign({
            id: existingUser._id,
            email: existingUser.email
        }, process.env.SECRET, {expiresIn: "1h"})

        // console.log(token);
        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}

const signUp = async (req, res) => {
    const { email, password, confirmPassword } = req.body
    try {
        const existingUser = await User.findOne({email})
        if (existingUser) return res.status(404).json({message: "User already exists"})

        if (password !== confirmPassword) return res.status(404).json({message: "Passwords do not match"})

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: result._id,
            email: result.email
        }, process.env.SECRET, {expiresIn: "1h"})

        // res.status(200).json({result: existingUser, token})
        res.status(200).json({status: 200})
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}

const google = (req, res) => {
    const { tokenId } = req.body;

    client.verifyIdToken({idToken: tokenId, audience: `${CLIENT_ID}`}).then(async (response) => {
        const { email_verified, email, sub } = response.payload;

        if (email_verified) {
            const existingUser = await User.findOne({email})
            if (existingUser) {
                const token = jwt.sign({
                    id: existingUser._id,
                    email: existingUser.email
                }, process.env.SECRET, {expiresIn: "1h"})
        
                // console.log(token);
                return res.status(200).json({result: existingUser, token})
            }

            const hashedPassword = await bcrypt.hash(sub, 12)

            const result = await User.create({
                email,
                password: hashedPassword
            })

            const token = jwt.sign({
                id: result._id,
                email: result.email
            }, process.env.SECRET, {expiresIn: "1h"})

            res.status(200).json({status: 200})
        } else {
            res.status(404).json({message: "Invalid credentials"})
        }
    })
}

module.exports = {signIn, signUp, google};