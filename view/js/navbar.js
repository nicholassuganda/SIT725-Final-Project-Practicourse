$(function() {
    // Load the navbar from an external HTML file
    $("#navbar-placeholder").load("navbar.html", function() {
        console.log("Navbar loaded successfully.");
    });
});        