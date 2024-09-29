const registerForm = document.getElementById('registerForm');

// Handle the cancel button click event
document.getElementById('cancelButton').addEventListener('click', function() {
    window.location.href = '/Login.html'; // Redirects to the login page
});

// Form validation
document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const role = document.getElementById('student').checked ? 'student' : 'educator';
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;

    const user = {
        username,
        password,
        firstname,
        lastname,
        dob,
        gender,
        email,
        role,
    };

    try {
        const response = await fetch('/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        // Check if the response is valid JSON
        let result;
        try {
            result = await response.json(); // Attempt to parse JSON
        } catch (err) {
            throw new Error('The server returned a non-JSON response: ' + err.message);
        }

        if (response.status === 201) {
            alert('User registered successfully!');
            window.location.href = '/Login.html';
        } else {
            // Display the specific error message from the server
            alert('Error: ' + result.message);
        }
    } catch (err) {
        // Log the error in the browser console and display the error message in the alert
        console.error('Failed to register user:', err);
        alert('Failed to register user: ' + err.message);
    }
});

