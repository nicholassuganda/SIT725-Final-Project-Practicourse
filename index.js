const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db'); // MongoDB connection
const userRoutes = require('./routes/userRoutes'); // User routes

const app = express();
const port = 3000;

// Middleware
app.use(morgan('common'));
app.use(express.static('view'));
app.use(express.json());

// MongoDB connection
connectDB();

// Routes
app.use('/user', userRoutes);

// Redirect to homepage
app.get('/', (req, resp) => {
    resp.redirect('/HomePage.html');
});

// Error handling middleware
app.use((error, request, response, next) => {
    let errorStatus = error.status || 500;
    response.status(errorStatus);
    response.send('ERROR(' + errorStatus + '): ' + error.toString());
});

// Start the server
app.listen(port, () => {
    console.log(`Web server running at: http://localhost:${port}`);
    console.log('Type Ctrl+C to shut down the web server');
});
