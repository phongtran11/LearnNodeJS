const express = require('express');
const app = express();
const db = require('./config/db/index');
const router = require('./router/index');
const cors = require('cors');
const port = process.env.PORT || 5000;

// Connect To DB
db.connectDB();
app.use(express.json());
app.use(cors());

// init Router
router(app);

// Server Listen
app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
});
