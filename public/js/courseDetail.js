import {course} from './js/course.js';

// Retrieve the course ID from the URL
const params = new URLSearchParams(window.location.search);
const courseId = params.get('id');

// Find the course that matches the ID
const course = courses.find(c => c.id == courseId);

// Get the course detail container element
const courseDetail = document.getElementById('course-detail');

// Render the course details dynamically
if (course) {
    courseDetail.innerHTML = `
        <div class="section">
            <h4 class="center-align">${course.name}</h4>
            <div class="card">
                <div class="card-image">
                    <img src="${course.banner}" alt="Hero Banner">
                    <span class="card-title">${course.name}</span>
                </div>
            </div>
            <p>${course.description}</p>
            <p><strong>Price:</strong> $${course.price.toFixed(2)}</p>

            <!-- Video -->
            <div class="section">
                <div class="video-container">
                    <iframe src="${course.video}" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    `;
} else {
    courseDetail.innerHTML = `<p>Course not found.</p>`;
}