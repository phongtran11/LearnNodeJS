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
        const accessToken = jwt.sign({userId: newuser._id}, process.env.ACCESS_TOKEN);

        res.json({Success: true, message:'User created successfully', accessToken});
    } 
    catch(err) {
        console.log(err);
        res.status(500).json({sussces: false, message: 'Interal server error'});
    }
}); 


module.exports = router;
