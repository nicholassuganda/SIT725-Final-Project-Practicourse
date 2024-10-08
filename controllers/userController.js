import User from '../models/user.js'; // Import User model
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

// Controller function to handle user registration
export const registerUser = async (req, res) => {
    try {
        const { username, password, firstname, lastname, dob, gender, email, role } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }
        
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,  // Store hashed password
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

        // Handle duplicate email or username error
        if (err.code === 11000) {
            res.status(400).json({ message: 'Username or Email already exists.' });
        } else {
            res.status(500).json({ message: 'Failed to register user' });
        }
    }
};

// Controller function to handle user login using username instead of email
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check for missing fields
        if (!username) return res.status(400).json({ message: 'Username is required' });
        if (!password) return res.status(400).json({ message: 'Password is required' });

        // Check if user exists with the given username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If login is successful, respond with success
        res.status(200).json({ message: 'Login successful!' });

    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to search for a user by username
export const searchUserByUsername = async (req, res) => {
    try {
        const { username } = req.body;  // Use req.body for POST requests

        // Find the user by username
        const user = await User.findOne({ username });

        // If user not found, return a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If user is found, return the user's details (without the password)
        res.status(200).json({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            dob: user.dob,
            gender: user.gender,
            email: user.email,
            role: user.role
        });

    } catch (err) {
        console.error('Error searching for user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
