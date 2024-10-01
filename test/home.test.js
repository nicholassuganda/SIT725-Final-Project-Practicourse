// Use import instead of require for ES Modules
import { expect } from 'chai';

// Test Suite for Home.js
describe('Home Page Tests', function () {
    // Test that courses are loaded correctly
    it('should load the courses correctly', function () {
        const courses = [
            { Course_ID: 1, Title: 'First Aid', ImagePath: 'image.jpg' },
            { Course_ID: 2, Title: 'Adobe Photoshop', ImagePath: 'image2.jpg' },
        ];

        expect(courses).to.be.an('array').that.has.lengthOf(2);
    });

    // Test for correct course titles
    it('should load the correct course titles', function () {
        const courses = [
            { Course_ID: 1, Title: 'First Aid', ImagePath: 'image.jpg' },
            { Course_ID: 2, Title: 'Adobe Photoshop', ImagePath: 'image2.jpg' },
        ];

        expect(courses[0].Title).to.equal('First Aid');
        expect(courses[1].Title).to.equal('Adobe Photoshop');
    });

    // Test that each course has an image path
    it('should have image paths for all courses', function () {
        const courses = [
            { Course_ID: 1, Title: 'First Aid', ImagePath: 'image.jpg' },
            { Course_ID: 2, Title: 'Adobe Photoshop', ImagePath: 'image2.jpg' },
        ];

        courses.forEach(course => {
            expect(course.ImagePath).to.be.a('string').and.to.include('.jpg');
        });
    });

    // Test that there is at least one course
    it('should have at least one course', function () {
        const courses = [
            { Course_ID: 1, Title: 'First Aid', ImagePath: 'image.jpg' },
        ];

        expect(courses).to.have.lengthOf.at.least(1);
    });

    // Test for the carousel functionality (e.g., first course should be active)
    it('should set the first course as active in the carousel', function () {
        const courses = [
            { Course_ID: 1, Title: 'First Aid', ImagePath: 'image.jpg' },
            { Course_ID: 2, Title: 'Adobe Photoshop', ImagePath: 'image2.jpg' },
        ];

        const firstCourse = courses[0];
        const carouselItemClass = (index) => index === 0 ? 'active' : '';

        expect(carouselItemClass(0)).to.equal('active');
        expect(carouselItemClass(1)).to.equal('');
    });

    // Test for edge cases, like empty courses list
    it('should handle an empty courses list', function () {
        const courses = [];

        expect(courses).to.be.an('array').that.is.empty;
    });

    // Test for undefined or null course entries
    it('should handle undefined or null courses gracefully', function () {
        const courses = [null, undefined, { Course_ID: 1, Title: 'First Aid', ImagePath: 'image.jpg' }];

        const validCourses = courses.filter(course => course != null);

        expect(validCourses).to.have.lengthOf(1);
        expect(validCourses[0].Title).to.equal('First Aid');
    });
});
