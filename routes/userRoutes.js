const express = require('express');
const userController = require('../controllers/userController'); // Import the controller

const router = express.Router();

// Define routes and forward to the controller
router.post('/register', userController.registerUser); // Forward to the registerUser function
// Login route
router.post('/login', userController.loginUser);



module.exports = router;
