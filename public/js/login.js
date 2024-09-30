// Listen for the login button click event
document.getElementById('btn_login').addEventListener('click', async function () {
    console.log("Login button clicked");

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = { username, password };

    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user), // Send JSON body with username and password
        });

        const result = await response.json();

        if (response.status === 200) {
            // Store the username in sessionStorage
            sessionStorage.setItem('username', username);
            
            // Emit the login status to the server using the socket instance from client.js
            //socket.emit('loginStatus', { username: username, status: 'logged_in' });
            
            // Show the login message and redirect to homepage
            console.log('Login successful!');
            alert('Login successful!');

            window.location.href = '/home.html';
        } else {
            console.error('Login failed:', result.message);
            alert('Error: ' + result.message); // Show the error message
        }
    } catch (err) {
        console.error('Login failed:', err);
        alert('Login failed: ' + err.message);
    }
});
