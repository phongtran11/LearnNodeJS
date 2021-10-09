const express = require('express');
const app = express();
const db = require('./config/db/index');

db.connectDB();

app.get('/', (req,res) => res.send('hello'));

app.listen(3000,()=> console.log('Server Running at http://localhost:3000'));