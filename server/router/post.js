const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Post /api/posts
router.post('/', (req, res) => {
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
            user: '6161852d759f497e782341c2',
        });
        newPost.save();

        res.json({
            sussces: true,
            message: 'Post was successfully created',
            post: newPost
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
