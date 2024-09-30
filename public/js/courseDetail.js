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
            document.getElementById('course-detail').innerHTML = `<div class="alert alert-warning">Course not found.</div>`;
        }
    } catch (error) {
        console.error('Error fetching course details:', error);
        document.getElementById('course-detail').innerHTML = `<div class="alert alert-danger">Failed to load course details.</div>`;
    }
}

// Function to render the course details dynamically
function renderCourseDetails(course) {
    const courseDetail = document.getElementById('course-detail');

    courseDetail.innerHTML = `
        <div class="col-lg-7">
            <div class="card mb-4 shadow-sm">
                <img src="/${course.courseImage}" class="card-img-top" alt="${course.courseName}">
                <div class="card-body">
                    <h3 class="card-title">${course.courseName}</h3>
                    <p class="card-text">${course.courseDescription}</p>
                    <h4 class="text-success">Price: $${course.coursePrice.toFixed(2)}</h4>
                </div>
            </div>
        </div>

        <div class="col-lg-5">
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">Course Preview</h5>
                    <div class="video-container mb-4">
                        <video width="100%" controls>
                            <source src="/${course.courseVideo}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>

            <!-- Static Star Rating Section (Mock-up) -->
            <div class="card mt-4 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">Course Rating</h5>
                    <div class="mb-3">
                        <!-- Static star symbols -->
                        <span style="font-size: 1.5rem; color: gold;">★★★★★</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fetch and render course details when the page loads
fetchCourseDetails();