document.addEventListener('DOMContentLoaded', function() {
    const courses = [
        { Course_ID: 1, Title: 'First Aid', ImagePath: 'image.jpg' },
        { Course_ID: 2, Title: 'Adobe Photoshop', ImagePath: 'image2.jpg' },
        { Course_ID: 3, Title: 'Artificial Intelligence', ImagePath: 'image3.jpg' },
    ];

    console.log('Ads Courses loaded');
    if (courses && courses.length) {
        const carouselIndicators = document.querySelector('#AdsCarousel .carousel-indicators');
        const carouselInner = document.querySelector('#AdsCarousel .carousel-inner');

        // Create carousel indicators and items for each course
        courses.forEach((course, index) => {
            // Create carousel indicator for each course
            const indicator = document.createElement('button');
            indicator.setAttribute('type', 'button');
            indicator.setAttribute('data-bs-target', '#AdsCarousel');
            indicator.setAttribute('data-bs-slide-to', index);
            indicator.className = index === 0 ? 'active' : '';
            indicator.setAttribute('aria-current', index === 0 ? 'true' : 'false');
            indicator.setAttribute('aria-label', `Slide ${index + 1}`);
            carouselIndicators.appendChild(indicator);

            // Create carousel item for each course
            const item = document.createElement('div');
            item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            item.innerHTML = `
                <a href="/Details.html?courseId=${course.Course_ID}">
                    <img src="images/${course.ImagePath}" alt="${course.Title}" class="d-block w-100">
                    <div class="carousel-caption d-none d-md-block">
                        <h3>${course.Title}</h3>
                    </div>
                </a>
            `;
            carouselInner.appendChild(item);
        });
    }
});


const featuredCourses = [
    { Course_ID: 5, Title: 'First Aid', ImagePath: 'image.jpg' },
    { Course_ID: 6, Title: 'Adobe Photoshop', ImagePath: 'image2.jpg' },
    { Course_ID: 7, Title: 'Artificial Intelligence', ImagePath: 'image3.jpg' },

];

// Create featured courses carousel items
if (featuredCourses && featuredCourses.length) {
    const featuredCarouselIndicators = document.querySelector('#featuredCoursesCarousel .carousel-indicators');
    const featuredCarouselInner = document.querySelector('#featuredCoursesCarousel .carousel-inner');

    featuredCourses.forEach((course, index) => {
        const indicator = document.createElement('button');
        indicator.setAttribute('type', 'button');
        indicator.setAttribute('data-bs-target', '#featuredCoursesCarousel');
        indicator.setAttribute('data-bs-slide-to', index);
        indicator.className = index === 0 ? 'active' : '';
        indicator.setAttribute('aria-current', index === 0 ? 'true' : 'false');
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        featuredCarouselIndicators.appendChild(indicator);

        const item = document.createElement('div');
        item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        item.innerHTML = `
            <a href="/Details.html?courseId=${course.Course_ID}">
                <img src="images/${course.ImagePath}" alt="${course.Title}" class="d-block w-100">
                <div class="carousel-caption d-none d-md-block">
                    <h3>${course.Title}</h3>
                </div>
            </a>
        `;
        featuredCarouselInner.appendChild(item);
    });
}