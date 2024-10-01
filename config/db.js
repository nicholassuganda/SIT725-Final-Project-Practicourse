import mongoose from 'mongoose';

const uri = "mongodb+srv://kcy96:DhEPU0pwqZSaaLVr@practicourse.r3ukg.mongodb.net/";

const connectDB = async () => {
    if (process.env.NODE_ENV !== 'test') { // Only connect if not in test environment
        try {
            await mongoose.connect(uri);
            console.log('Connected to MongoDB using Mongoose');
        } catch (err) {
            console.error('Failed to connect to MongoDB', err);
            process.exit(1); // Exit process with failure
        }
    } else {
        console.log('Skipping MongoDB connection in test environment');
    }
};

export default connectDB;
