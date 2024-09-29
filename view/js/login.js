document.getElementById('btn_login').addEventListener('click', async function () {
    // Prevent default form behavior is no longer needed since it's a button click now
    console.log("Login button clicked");

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = {
        username,
        password
    };

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
            console.log('Login successful!');
            alert('Login successful! Welcome ' + username); // Show the error message
            window.location.href = '/HomePage.html'; // Redirect after successful login
        } else {
            console.error('Login failed:', result.message);
            alert('Error: ' + result.message); // Show the error message
        }
    } catch (err) {
        console.error('Login failed:', err);
        alert('Login failed: ' + err.message);
    }
});
