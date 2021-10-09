const authRouter = require('./auth')
const postRouter = require('./post');

function router (app) {
    app.use('/api/auth', authRouter);
    app.use('/api/post', postRouter);
};

module.exports = router;