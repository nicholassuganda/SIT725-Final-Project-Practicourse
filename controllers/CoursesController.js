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

// Controller function to fetch all courses
exports.getCourses = async (req, res) => {
    try {
        // Fetch all courses from the database
        const courses = await Course.find();

        // Return success response with the fetched courses
        res.status(200).json({
            message: 'Courses retrieved successfully!',
            courses: courses
        });
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).json({ message: 'Error fetching courses' });
    }
};