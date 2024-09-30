const express = require('express');
const { upload } = require('../public/middlewares/multer'); 
const { uploadCourse, getCourses } = require('../controllers/CoursesController');

const router = express.Router();

// POST route to handle image and video uploads
router.post('/uploadCourse', upload.fields([
    { name: 'courseImage', maxCount: 1 },
    { name: 'courseVideo', maxCount: 1 }
]), uploadCourse);

// GET route to fetch all courses
router.get('/allCourses', getCourses); // Use the getCourses function here

module.exports = router;
