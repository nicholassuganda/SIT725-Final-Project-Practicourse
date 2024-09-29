const User = require('../models/user');

// Controller function to handle user registration
exports.registerUser = async (req, res) => {
    try {
        const { username, password, firstname, lastname, dob, gender, email, role } = req.body;

        // Create a new user
        const newUser = new User({
            username,
            password,
            firstname,
            lastname,
            dob,
            gender,
            email,
            role
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });

    } catch (err) {
        console.error('Error registering user:', err);

        // Handle duplicate email error
        if (err.code === 11000) {
            res.status(400).json({ message: 'Email already exists.' });
        } else {
            res.status(500).json({ message: 'Failed to register user' });
        }
    }
};
