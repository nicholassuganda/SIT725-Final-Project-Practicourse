const express = require('express');
const { upload } = require('../public/middlewares/multer'); 
const Course = require('../controllers/CoursesController');

const router = express.Router();

// POST route to handle image and video uploads
router.post('/uploadCourse', upload.fields([
    { name: 'courseImage', maxCount: 1 },
    { name: 'courseVideo', maxCount: 1 }
]), Course.uploadCourse);

// GET route to fetch all courses
router.get('/allCourses', getCourses); // Use the getCourses function here

// Route to fetch all courses
router.get('/getAllCourses', Course.getAllCourses);

// Route to fetch course details by ID
router.get('/details', Course.getCourseById);

// Route to get the list of courses
router.get('/list', Course.getAllCourses);


module.exports = router;
