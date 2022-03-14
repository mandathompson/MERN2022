const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const protect = asyncHandler(async(req, res, next) => {
    let token 

    // Checking header for authorization object 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from bearer header 
            token = req.headers.authorization.split(' ')[1] // turns bearer into an array where bearer is 0 and token is 1

            // Verify token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from token and assign so we can use in any protected route
            req.user = await User.findById(decoded.id).select('-password') // don't include password 
            
            next()  // call next piece of middleware
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not Authorized, no token found')
    }
})

module.exports = { protect }