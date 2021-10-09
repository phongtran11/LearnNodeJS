const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verifyToken = require('../middleware/auth');

// Post /api/post
router.post('/', verifyToken, async (req, res) => {
    const {title, description, url, status} = req.body;

    // Validate 
    if (!title) {
        return res.status(400).json({
            sussces: false,
            message: 'Title is required',
        })
    }

    try {
        const newPost = new Post ({
            title,
            description,
            url: url.startsWith('http://') ? url : `http://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        });

        await newPost.save();

        res.json({
            sussces: true,
            message: 'Post was successfully created',
            post: newPost,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            sussces: false,
            message: 'Interal server error'
        });
    }
});


module.exports = router;
