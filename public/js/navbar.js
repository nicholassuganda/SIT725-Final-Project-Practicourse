$(function() {
    // Load the navbar from an external HTML file
    $("#navbar-placeholder").load("navbar.html", function() {
        console.log("Navbar loaded successfully.");

        // Once the navbar is loaded, update the navbar content
        updateNavbar();
    });
});

// Function to update the navbar based on the user's login status
function updateNavbar() {
    // Check if the user is logged in
    const storedUsername = sessionStorage.getItem('username');
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page name
    
    if (storedUsername) {
        // Change the navbar to show the user's name and a logout option
        $('#userControl').html(`
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ${storedUsername}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="./myProfile.html">Profile</a></li>
                <li><a class="dropdown-item" href="./settings.html">Settings</a></li>
                <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
            </ul>
        `);
    } else {
        // Show a login button if not logged in
        $('#userControl').html('<a class="nav-link" href="./Login.html">Login</a>');

        // Redirect to login page if the current page is Profile.html and the user is not logged in
        if (currentPage === 'Profile.html') {
            window.location.href = './Login.html';
        }
    }
}

// Function to log the user out
function logout() {
    

    sessionStorage.removeItem('username'); // Remove username from session storage
    location.reload(); // Reload the page to update the navbar
}
