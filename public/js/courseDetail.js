// Retrieve the course ID from the URL
const params = new URLSearchParams(window.location.search);
const courseId = params.get('id');

// Fetch course details from the server
async function fetchCourseDetails() {
    try {
        const response = await fetch(`/course/details?id=${courseId}`);
        const course = await response.json();

        if (response.ok && course) {
            renderCourseDetails(course);
        } else {
            document.getElementById('course-detail').innerHTML = `<p>Course not found.</p>`;
        }
    } catch (error) {
        console.error('Error fetching course details:', error);
        document.getElementById('course-detail').innerHTML = `<p>Failed to load course details.</p>`;
    }
}

// Function to render the course details dynamically
function renderCourseDetails(course) {
    const courseDetail = document.getElementById('course-detail');

    courseDetail.innerHTML = `
        <div class="section">
            <h4 class="center-align">${course.courseName}</h4>
            <div class="card">
                <div class="card-image">
                    <img src="/${course.courseImage}" alt="Hero Banner">
                    <span class="card-title">${course.courseName}</span>
                </div>
            </div>
            <p>${course.courseDescription}</p>
            <p><strong>Price:</strong> $${course.coursePrice.toFixed(2)}</p>

            <!-- Video -->
            <div class="section">
                <div class="video-container">
                    <video width="100%" controls>
                        <source src="/${course.courseVideo}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    `;
}

// Fetch and render course details when the page loads
fetchCourseDetails();
