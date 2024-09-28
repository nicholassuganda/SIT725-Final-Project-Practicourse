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
});

const courses = [
    {
        name: "Introduction to Python",
        description: "Learn the basics of Python programming.",
        date: "2024-05-01",
        imageUrl: "images/image.jpg"
    },
    {
        name: "Advanced Machine Learning",
        description: "Dive deeper into the world of machine learning.",
        date: "2024-06-15",
        imageUrl: "images/image2.jpg"
    }
];

// Load courses dynamically
$(document).ready(function() {
    let coursesContainer = $('#coursesContainer');

    courses.forEach(course => {
        let courseCard = `
            <div class="col-md-6 mb-3">
                <div class="card">
                    <img src="${course.imageUrl}" class="card-img-top" alt="${course.name}">
                    <div class="card-body">
                        <h5 class="card-title">${course.name}</h5>
                        <p class="card-text">${course.description}</p>
                        <p class="card-text"><small class="text-muted">Start Date: ${course.date}</small></p>
                        <a href="courseDetail.html" class="btn btn-dark">Go to Course</a>
                    </div>
                </div>
            </div>
        `;
        coursesContainer.append(courseCard);
    });
});
