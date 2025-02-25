const mongoose = require('mongoose');

const connectDb = async function() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log("connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDb;