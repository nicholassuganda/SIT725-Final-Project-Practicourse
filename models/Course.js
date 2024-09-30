const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    coursePrice: { type: Number, required: true },
    courseDescription: { type: String, required: true },
    courseImage: { type: String, required: true }, // File path to the image
    courseVideo: { type: String, required: true }, // File path to the video
    createdAt: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
