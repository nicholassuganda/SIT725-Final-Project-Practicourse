const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true }
});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
