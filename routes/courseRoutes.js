import express from 'express';
import { upload } from '../public/middlewares/multer.js'; 
import { uploadCourse, getAllCourses, getCourseById } from '../controllers/CoursesController.js';

const router = express.Router();

// POST route to handle image and video uploads
router.post('/uploadCourse', upload.fields([
    { name: 'courseImage', maxCount: 1 },
    { name: 'courseVideo', maxCount: 1 }
]), uploadCourse);

// Route to fetch all courses
router.get('/getAllCourses', getAllCourses);

// Route to fetch course details by ID
router.get('/details', getCourseById);

export default router;
