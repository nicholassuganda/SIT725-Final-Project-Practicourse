
// Function to check user role and update UI accordingly
async function checkUserRole() {
    const username = sessionStorage.getItem('username'); // Get the username from sessionStorage

    if (!username) {
        alert('User is not logged in!');
        window.location.href = '/Login.html'; // Redirect to login if user is not logged in
        return;
    }

    try {
        // Make an API call to fetch user details by username
        const response = await fetch('/user/searchUsername', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username }), // Send the username to the backend
        });

        const result = await response.json();

        if (response.status === 200) {
            console.log('User role:', result.role);
            if (result.role === 'student') {
                // Hide the Upload Course button if the user is a student
                document.querySelector('.btn-primary').style.display = 'none';
            }
        } else {
            alert(result.message || 'Failed to fetch user details');
        }
    } catch (error) {
        console.error('Error fetching user role:', error);
        alert('Error fetching user role');
    }
}

function submitCourse() {
    const courseName = document.getElementById('courseName').value;
    const coursePrice = document.getElementById('coursePrice').value;
    const courseDescription = document.getElementById('courseDescription').value;
    const courseImage = document.getElementById('courseImage').files[0];  // Image file
    const courseVideo = document.getElementById('courseVideo').files[0];  // Video file (optional)

    // Create FormData to send the files
    const formData = new FormData();
    formData.append('courseName', courseName);
    formData.append('coursePrice', coursePrice);
    formData.append('courseDescription', courseDescription);
    formData.append('courseImage', courseImage);  // Append course image
    formData.append('courseVideo', courseVideo);  // Append course video (if any)

    // Send the data using fetch
    fetch('/course/uploadCourse', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(result => {
        if (result.message) {
            alert('Course uploaded successfully!');
        } else {
            alert('Error uploading course');
        }
    })
    .catch(error => {
        console.error('Error uploading course:', error);
        alert('Error uploading course');
    });
}


// Call the function when the settings page is loaded
document.addEventListener('DOMContentLoaded', function () {
    checkUserRole();
});

