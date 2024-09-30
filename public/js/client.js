// Establish the Socket.io connection
const socket = io();

// Handle connection event
socket.on('connect', () => {
    console.log('Connected to server with socket ID:', socket.id);

    // After reconnecting, re-emit login status if the user is logged in
    const username = sessionStorage.getItem('username');
    if (username) {
        emitLoginStatus(username);  // Emit the stored username and status
    }
});

// Handle disconnection event
socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});

// Listen for real-time messages from the server (example event)
socket.on('message', (data) => {
    console.log('Message received from server:', data);
    // You can show this message in your UI, e.g., as a notification
});

// Emit login status (call this function after successful login)
function emitLoginStatus(username) {
    socket.emit('loginStatus', { username, status: 'logged_in' });
    console.log('Emitted login status for:', username);
}

// Function to log out the user and notify the server
function logout() {
    const username = sessionStorage.getItem('username');

    if (username) {
        // Emit log out status before clearing sessionStorage
        socket.emit('loginStatus', { username, status: 'logged_out' });
    }

    // Clear session storage and redirect to login page
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userID'); // If you have a userID stored
    window.location.href = '/Login.html';
}

// Update the navbar based on user's login status
function updateNavbar() {
    const storedUsername = sessionStorage.getItem('username');
    const currentPage = window.location.pathname.split('/').pop();

    if (storedUsername) {
        // Show the username and log out dropdown in the navbar
        document.getElementById('userControl').innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ${storedUsername}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="./myProfile.html">Profile</a></li>
                <li><a class="dropdown-item" href="./myCourse.html">My Course</a></li>
                <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
            </ul>
        `;
    } else {
        // Show the login button if not logged in
        document.getElementById('userControl').innerHTML = '<a class="nav-link" href="./Login.html">Login</a>';

        // Redirect to login page if the current page is Profile.html and the user is not logged in
        if (currentPage === 'myProfile.html') {

            window.location.href = './Login.html';
        }
    }
}

// Listen for login events on specific pages (example: login.js may call this)
document.getElementById('btn_login')?.addEventListener('click', async function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = {
        username,
        password,
    };

    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const result = await response.json();

        if (response.status === 200) {
            // Store the username in sessionStorage
            sessionStorage.setItem('username', username);

            // Emit login status
            emitLoginStatus(username);

            // Redirect to the home page
            window.location.href = '/HomePage.html';
        } else {
            alert('Login failed: ' + result.message);
        }
    } catch (err) {
        alert('Error: ' + err.message);
    }
});

// Call this function after the page loads to update the navbar based on login status
document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
});
