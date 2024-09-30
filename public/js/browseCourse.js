document.addEventListener('DOMContentLoaded', () => {
    fetchCourses(); // Fetch courses from the server on page load
});

// Function to fetch courses from the backend
async function fetchCourses() {
    try {
        const response = await fetch('/course/getAllCourses');
        const courses = await response.json();
        console.log('Fetched courses:', courses); // Log the courses to ensure it's an array
        displayCourses(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}


// Function to display courses dynamically
function displayCourses(courseData) {
    if (!Array.isArray(courseData)) {
        console.error('Expected an array of courses, but got:', courseData);
        return;  // Early return if courseData is not an array
    }

    const courseList = document.querySelector('.course-list');
    courseList.innerHTML = '';  // Clear existing content

    // Iterate over the course data and generate HTML for each course
    courseData.forEach(course => {
        const courseEntry = document.createElement('div');
        courseEntry.classList.add('course-entry', 'm-3', 'p-2', 'border');

        // Construct the HTML for each course
        courseEntry.innerHTML = `
            <div class="row">
                <div class="col-md-3">
                    <img src="${course.courseImage}" alt="${course.courseName} Thumbnail" class="img-fluid">
                </div>
                <div class="col-md-6">
                    <h5>${course.courseName}</h5>
                    <p>${course.courseDescription}</p>
                </div>
                <div class="col-md-3 text-end">
                    <p class="course-price">$${course.coursePrice.toFixed(2)}</p>
                    <a href="courseDetail.html?id=${course._id}" class="btn btn-dark">View</a>
                </div>
            </div>
        `;
        courseList.appendChild(courseEntry);
    });
}


// Optional: Handle sorting and filtering (if you need it)
// document.getElementById('sortingForm').addEventListener('submit', (e) => {
//     e.preventDefault();
//     const searchQuery = document.getElementById('searchName').value.toLowerCase();
//     const sortOption = document.getElementById('sortByName').value;

//     // Filter courses based on search query
//     let filteredCourses = courses.filter(course => 
//         course.courseName.toLowerCase().includes(searchQuery)
//     );

//     // Sort courses based on selected option
//     if (sortOption === 'aToZ') {
//         filteredCourses.sort((a, b) => a.courseName.localeCompare(b.courseName));
//     } else if (sortOption === 'zToA') {
//         filteredCourses.sort((a, b) => b.courseName.localeCompare(a.courseName));
//     }

//     // Re-render the course list
//     displayCourses(filteredCourses);
// });
