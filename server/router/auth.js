const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// POST  /api/auth/register
router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    // Validation
    if(!username || !password) {
        return res.status(400, {
            success: false,
            message: 'Missing username or password',
        });
    };

    try {
        // Check user existing
        const user = await User.findOne({username});

        if (user) {
            return res.status(400, {
                success: false,
                message: 'User already exists',
            });
        };

        // Hash Password
        const hashpassword = await argon2.hash(password);
        const newuser = new User({
            username,
            password: hashpassword,
        });
        await newuser.save();

        // Return token
        const accessToken = jwt.sign({
            userId: newuser._id},
            process.env.ACCESS_TOKEN);

        res.json({
            Success: true,
            message:'User created successfully',
            accessToken
        });
    } 
    catch(err) {
        console.log(err);
        res.status(500).json({
            sussces: false,
            message: 'Interal server error'
        });
    }
}); 


// POST /api/auth/login
router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    // Validation
    if(!username || !password) {
        return res.status(400, {
            success: false,
            message: 'Missing username or password',
        });
    };

    try {
        const user = await User.findOne({username});
        
        //  Verify username
        if(!user) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect username or password!!!'
            });
        }

        //  Verify password
        const passwordValid = await argon2.verify(user.password, password);

        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect username or password!!!'
            });
        }

        // Return token
        const accessToken = jwt.sign({
            userId: user._id},
            process.env.ACCESS_TOKEN);

        res.json({
            Success: true,
            message:'Login successfully',
            accessToken
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            sussces: false,
            message: 'Interal server error'
        });
    }
})

module.exports = router;
