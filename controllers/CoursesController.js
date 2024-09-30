const Course = require('../models/Course');

// Controller function to handle course upload
exports.uploadCourse = async (req, res) => {
    try {
        const courseImage = req.files.courseImage ? req.files.courseImage[0].path : null;
        const courseVideo = req.files.courseVideo ? req.files.courseVideo[0].path : null;

        const { courseName, coursePrice, courseDescription } = req.body;

        // Create a new course object and save to the database
        const newCourse = new Course({
            courseName,
            coursePrice,
            courseDescription,
            courseImage,
            courseVideo
        });

        await newCourse.save();

        // Return success response
        res.status(200).json({
            message: 'Course uploaded successfully!',
            course: newCourse
        });
    } catch (err) {
        console.error('Error uploading course:', err);
        res.status(500).json({ message: 'Error uploading course' });
    }
};
