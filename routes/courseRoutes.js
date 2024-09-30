const express = require('express');
const { upload } = require('../public/middlewares/multer'); 
const Course = require('../controllers/CoursesController');

const router = express.Router();

// POST route to handle image and video uploads
router.post('/uploadCourse', upload.fields([
    { name: 'courseImage', maxCount: 1 },
    { name: 'courseVideo', maxCount: 1 }
]), Course.uploadCourse);

// Route to fetch all courses
router.get('/getAllCourses', Course.getAllCourses);

// Route to fetch course details by ID
router.get('/details', Course.getCourseById);

module.exports = router;
