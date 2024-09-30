const express = require('express');
const morgan = require('morgan');
const http = require('http'); // To create the HTTP server
const connectDB = require('./config/db'); // MongoDB connection
const userRoutes = require('./routes/userRoutes'); // User routes
const courseRoutes = require('./routes/courseRoutes'); // User routes
const { Server } = require('socket.io');
const path = require('path'); // To handle file paths

const app = express();
const port = 3000;
const server = http.createServer(app); // Create the HTTP server
const io = new Server(server); // Bind Socket.io to the server

// Middleware
//app.use(morgan('common'));
// Serve static files like JS, CSS, images from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
// Serve HTML files from 'views' folder
app.use(express.static(path.join(__dirname, 'view')));
// Parse incoming requests with JSON payloads
app.use(express.json());


// MongoDB connection
connectDB();

// Routes
app.use('/user', userRoutes);       // Use user routes
app.use('/course', courseRoutes);   // Use course routes

// Redirect to homepage
app.get('/', (req, resp) => {
    resp.redirect('/HomePage.html'); // Ensure HomePage.html is in your 'views' directory
});

// Socket.io connection handler
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for login status from the client
    socket.on('loginStatus', (data) => {
        console.log(`Login status received from client:`, data);
        // Broadcast the login status to other users if needed
        io.emit('userStatusUpdate', data); // Emits the login status to all connected clients
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Error handling middleware
app.use((error, request, response, next) => {
    let errorStatus = error.status || 500;
    response.status(errorStatus);
    response.send('ERROR(' + errorStatus + '): ' + error.toString());
});

// Start the server using 'server.listen', not 'app.listen'
server.listen(port, () => {
    console.log(`Web server running at: http://localhost:${port}`);
    console.log('Type Ctrl+C to shut down the web server');
});
