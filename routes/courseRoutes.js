const express = require('express');
const { upload } = require('../public/middlewares/multer'); 
const { uploadCourse } = require('../controllers/CoursesController');

const router = express.Router();

// POST route to handle image and video uploads
router.post('/uploadCourse', upload.fields([
    { name: 'courseImage', maxCount: 1 },
    { name: 'courseVideo', maxCount: 1 }
]), uploadCourse);

module.exports = router;
