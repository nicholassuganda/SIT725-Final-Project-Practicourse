import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure necessary directories exist
if (!fs.existsSync('uploads/images')) {
    fs.mkdirSync('uploads/images', { recursive: true });
}

if (!fs.existsSync('uploads/videos')) {
    fs.mkdirSync('uploads/videos', { recursive: true });
}

// Set up multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.fieldname === 'courseImage' ? 'uploads/images/' : 'uploads/videos/';
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// File filter to accept only image and video files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('File format should be an image or video'), false);
    }
};

// Initialize multer with storage and file filter
const upload = multer({ storage, fileFilter });

export { upload };
