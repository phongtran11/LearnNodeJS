const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

// GET /api/post
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate({
            path: 'user',
            model: User,
            select: 'username',
        });
        res.json({
            success: true,
            posts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Interal server error',
        });
    }
});

// Post /api/post
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    // Validate
    if (!title) {
        return res.status(400).json({
            success: false,
            message: 'Title is required',
        });
    }

    try {
        // Set New Post
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('http://') ? url : `http://${url}`,
            status: status || 'TO LEARN',
            user: req.userId,
        });

        await newPost.save();

        res.json({
            success: true,
            message: 'Post was successfully created',
            posts: newPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Interal server error',
        });
    }
});

// PUT /api/post/:id
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    // Validate
    if (!title) {
        return res.status(400).json({
            success: false,
            message: 'Title is required',
        });
    }

    try {
        // Set Update Post
        let updatedPost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
        };

        const conditionUpdate = { _id: req.params.id, user: req.userId };

        updatedPost = await Post.findOneAndUpdate(
            conditionUpdate,
            updatedPost,
            {
                new: true,
            }
        );

        if (!updatedPost) {
            res.status(401).json({
                success: false,
                message: 'Post not found or user not Authorised',
            });
        }

        res.json({
            success: true,
            message: 'Excellent progress!',
            post: updatedPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Interal server error',
        });
    }
});

// DELETE api/post/:id
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const conditionDelete = { _id: req.params.id, user: req.userId };
        const deletedPost = await Post.findOneAndDelete(conditionDelete);

        if (!deletedPost) {
            res.status(401).json({
                success: false,
                message: 'Post not found or user not Authorised',
            });
        }

        res.json({ success: true, message: 'Delete Complete', deletedPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Interal server error',
        });
    }
});
module.exports = router;
