const courses = [
    {
        name: "First Aid Bootcamp",
        description: "Learn the fundamentals of First Aid to help those in needs.",
        thumbnail: "./images/image.jpg",
        price: "$99.99",
        detailsLink: "./xxxxx.html"
    },
    {
        name: " Adobe Photoshop Mastery Class",
        description: "Master Adobe Photoshop skill with practical examples.",
        thumbnail: "./images/image2.jpg",
        price: "$149.99",
        detailsLink: "./xxxxx.html"
    },
    {
        name: "Introduction to AI",
        description: "Understand the basics of artificial intelligence, neural networks, and deep learning.",
        thumbnail: "./images/image3.jpg",
        price: "$199.99",
        detailsLink: "./xxxxx.html"
    }
];

// Function to display courses
function displayCourses(courseData) {
    const courseListContainer = document.querySelector('.game-list');
    courseListContainer.innerHTML = ''; // Clear any existing content

    // Loop through each course and create its HTML structure
    courseData.forEach(course => {
        const courseEntry = `
            <div class="game-entry m-3 p-2 border">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${course.thumbnail}" alt="Course Thumbnail" class="img-fluid">
                    </div>
                    <div class="col-md-6">
                        <h5>${course.name}</h5>
                        <p>${course.description}</p>
                    </div>
                    <div class="col-md-3 text-end">
                        <p class="game-price">${course.price}</p>
                        <a href="${course.detailsLink}" class="btn btn-primary">View</a>
                    </div>
                </div>
            </div>
        `;
        // Append the course entry to the list container
        courseListContainer.insertAdjacentHTML('beforeend', courseEntry);
    });
}

// Call the function to display courses when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayCourses(courses);
});