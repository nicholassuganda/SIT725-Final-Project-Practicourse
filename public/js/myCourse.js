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
                document.querySelector('.btn-dark').style.display = 'none';
            }
        } else {
            alert(result.message || 'Failed to fetch user details');
        }
    } catch (error) {
        console.error('Error fetching user role:', error);
        alert('Error fetching user role');
    }
}

$(document).ready(function() {
    // Handle tab switching
    $('.list-group-item').click(function(e) {
        e.preventDefault();
        
        // Remove active class from all tabs and hide them
        $('.tab-content').hide().removeClass('active');
        $('.list-group-item').removeClass('active');
        
        // Add active class to the clicked tab and show corresponding content
        $(this).addClass('active');
        const target = $(this).attr('href');
        $(target).show().addClass('active');
    });

    // Show the first tab by default
    $('.list-group-item.active').trigger('click');

    // Load courses dynamically from the backend
    $.ajax({
        url: '/course/allCourses',
        method: 'GET',
        success: function(courses) {
            console.log('Fetched courses:', courses); // Log the response
            let coursesContainer = $('#coursesContainer');
            coursesContainer.empty(); // Clear existing courses

            courses.courses.forEach(course => {
                let courseCard = `
                    <div class="col-md-6 mb-3">
                        <div class="card">
                            <img src="${course.courseImage}" class="card-img-top" alt="${course.courseName}">
                            <div class="card-body">
                                <h5 class="card-title">${course.courseName}</h5>
                                <p class="card-text">${course.courseDescription}</p>
                                <p class="card-text"><small class="text-muted">Price: $${course.coursePrice}</small></p>
                                <a href="courseDetail.html?id=${course._id}" class="btn btn-dark">Go to Course</a>
                            </div>
                        </div>
                    </div>
                `;
                coursesContainer.append(courseCard);
            });
        },
        error: function(err) {
            console.error('Error fetching courses:', err);
            alert('Failed to load courses. Please try again later.');
        }
    });
});

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

            // Close the modal (assuming your modal has the ID 'courseModal')
            $('#uploadCourseModal').modal('hide'); // For jQuery + Bootstrap modal

            // Reset the form fields
            document.getElementById('uploadCourseForm').reset(); // Assuming your form has the ID 'courseForm'
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
