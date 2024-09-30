// browseCourse.js
import { courses } from './js/course.js'; // Ensure this points to your course data correctly

document.addEventListener('DOMContentLoaded', () => {
    displayCourses(courses); // Display courses on page load
});

// Function to display courses
function displayCourses(courseData) {
    const courseList = document.querySelector('.course-list'); // Make sure this matches the HTML
    courseList.innerHTML = ''; // Clear existing content

    // Iterate over the course data and generate HTML for each course
    courseData.forEach(course => {
        const courseEntry = document.createElement('div');
        courseEntry.classList.add('course-entry', 'm-3', 'p-2', 'border');
        
        // Construct the HTML for each course
        courseEntry.innerHTML = `
            <div class="row">
                <div class="col-md-3">
                    <img src="${course.thumbnail}" alt="${course.name} Thumbnail" class="img-fluid">
                </div>
                <div class="col-md-6">
                    <h5>${course.name}</h5>
                    <p>${course.description}</p>
                </div>
                <div class="col-md-3 text-end">
                    <p class="course-price">$${course.price.toFixed(2)}</p>
                    <a href="${course.detailsLink}" class="btn btn-dark">View</a>
                </div>
            </div>
        `;
        courseList.appendChild(courseEntry);
    });
}

// Optional: Handle sorting and filtering (if you need it)
document.getElementById('sortingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const searchQuery = document.getElementById('searchName').value.toLowerCase();
    const sortOption = document.getElementById('sortByName').value; // Ensure correct ID

    // Filter courses based on search query
    let filteredCourses = courses.filter(course => 
        course.name.toLowerCase().includes(searchQuery)
    );

    // Sort courses based on selected option
    if (sortOption === 'aToZ') {
        filteredCourses.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'zToA') {
        filteredCourses.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Re-render the course list
    displayCourses(filteredCourses);
});