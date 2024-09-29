const mongoose = require('mongoose');

// MongoDB URI
const uri = "mongodb+srv://kcy96:DhEPU0pwqZSaaLVr@practicourse.r3ukg.mongodb.net/";

// Function to connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB using Mongoose');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
