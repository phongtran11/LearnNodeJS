const express = require("express");
const app = express();
const db = require("./config/db/index");
const router = require("./router/index");

// Connect To DB
db.connectDB();
app.use(express.json());

// init Router
router(app);

// Server Listen
app.listen(5000, () => {
    console.log("Server Running at http://localhost:5000");
});
