require('dotenv').config();
const  mongoose = require('mongoose');

async function connectDB()  {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.buvhz.mongodb.net/Cluster0?retryWrites=true&w=majority`)
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = {connectDB};