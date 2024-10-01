let isEditMode = false; // Variable to track edit mode status
let passwordVisible = false; // Variable to track password visibility status

// Function to toggle between edit and view modes
function toggleEditMode() {
    const editables = ['username', 'password', 'firstName', 'lastName', 'billingAddress', 'city', 'postalCode', 'state'];
    const bioParagraph = document.getElementById('bioText');
    isEditMode = !isEditMode;
    document.getElementById('editProfileButton').textContent = isEditMode ? 'Save' : 'Edit';

    // Handle the bio separately
    if (isEditMode) {
        const textarea = document.createElement('textarea');
        textarea.id = 'bioInput';
        textarea.className = 'form-control';
        textarea.value = bioParagraph.textContent.trim();
        bioParagraph.parentNode.replaceChild(textarea, bioParagraph);
    } else {
        const bioText = document.createElement('p');
        bioText.id = 'bioText';
        const input = document.getElementById('bioInput');
        bioText.textContent = input.value;
        input.parentNode.replaceChild(bioText, input);
    }

    // Toggle other fields
    editables.forEach(field => {
        const displaySpan = document.getElementById(field + 'Display');
        if (isEditMode) {
            const input = document.createElement('input');
            input.type = field === 'password' ? 'password' : 'text';
            input.className = 'form-control';
            input.id = field + 'Input';
            input.value = displaySpan.textContent.trim();
            displaySpan.parentNode.replaceChild(input, displaySpan);
        } else {
            const span = document.createElement('span');
            span.id = field + 'Display';
            const input = document.getElementById(field + 'Input');
            span.textContent = input.value;
            input.parentNode.replaceChild(span, input);
        }
    });

    if (!isEditMode) {
        console.log('Data saved!'); // Placeholder for saving data
    }
}

// Function to revert an input field back to a span element
function revertToSpan(field, isPassword = false) {
    const displaySpan = document.createElement('span');
    displaySpan.id = field + 'Display';
    const input = document.getElementById(field + 'Input');
    displaySpan.textContent = input.value;
    if (isPassword) {
        displaySpan.dataset.password = input.value; // Store the actual password
        displaySpan.textContent = '********'; // Mask password when not in edit mode
    }
    input.parentNode.replaceChild(displaySpan, input);
}

// Function to toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordDisplay = document.getElementById('passwordDisplay');

    if (isEditMode) {
        // Toggle password input type between 'password' and 'text' in edit mode
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordVisible = true;
        } else {
            passwordInput.type = 'password';
            passwordVisible = false;
        }
    } else {
        // Toggle password display text in view mode
        if (passwordVisible) {
            passwordDisplay.textContent = passwordDisplay.dataset.password;
        } else {
            passwordDisplay.textContent = '********';
        }
        passwordVisible = !passwordVisible;
    }
}

// Function to fetch user details and display them on the page
async function loadUserProfile(username) {
    try {
        const response = await fetch('/user/searchUsername', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }) // Send the username to the server
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const userData = await response.json();

        // Update the HTML elements with the user data
        document.getElementById('usernameDisplay').textContent = userData.username;
        document.getElementById('firstNameDisplay').textContent = userData.firstname;
        document.getElementById('lastNameDisplay').textContent = userData.lastname;
        document.getElementById('billingAddressDisplay').textContent = userData.billingAddress || 'N/A';
        document.getElementById('cityDisplay').textContent = userData.city || 'N/A';
        document.getElementById('postalCodeDisplay').textContent = userData.postalCode || 'N/A';
        document.getElementById('stateDisplay').textContent = userData.state || 'N/A';

        // Mask the password field
        document.getElementById('passwordDisplay').textContent = '********';

    } catch (err) {
        console.error('Error loading user profile:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem('username'); // Or however you're storing the username
    if (username) {
        loadUserProfile(username);  // Fetch the profile data and update the page
    } else {
        console.error('No username found in localStorage');
    }
});