const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isRegAuth = token.length < 500;

        let decodedData;

        if (token && isRegAuth) {
            decodedData = jwt.verify(token, process.env.SECRET);

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        res.status(400).json({message: "Invalid auth"})
    }
}

module.exports = auth;