import express from 'express';
import morgan from 'morgan';
import http from 'http';
import connectDB from './config/db.js'; // MongoDB connection
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.static(path.join(path.resolve(), 'view')));
app.use(express.json());
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.get('/login', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'view', 'login.html'));
});


// Routes
app.use('/user', userRoutes);       // Use user routes
app.use('/course', courseRoutes);   // Use course routes

// Redirect to homepage
app.get('/', (req, resp) => {
    resp.redirect('/home.html');
});

// Socket.io connection handler (only when the server is running)
if (process.env.NODE_ENV !== 'test') {
    const server = http.createServer(app); // Create the HTTP server
    const io = new Server(server); // Bind Socket.io to the server

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('loginStatus', (data) => {
            console.log(`Login status received from client:`, data);
            io.emit('userStatusUpdate', data);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    // MongoDB connection (only if not in test environment)
    connectDB();

    // Start the server only if not in test mode
    server.listen(port, () => {
        console.log(`Web server running at: http://localhost:${port}`);
        console.log('Type Ctrl+C to shut down the web server');
    });
}

// Export the `app` for testing purposes
export { app };
