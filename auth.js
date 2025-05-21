// Auth functionality for DataDate app

// Check if user is logged in when page loads
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    setupLogoutButton();
});

// Function to check if user is logged in
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn) {
        // If not on login page, redirect to login
        if (!window.location.pathname.includes('index.html') && !window.location.pathname.endsWith('/')) {
            window.location.href = 'index.html';
        }
        showLoginForm();
    } else {
        updateUIForLoggedInUser();
    }
}

// Function to show login form on homepage
function showLoginForm() {
    // Only show if we're on the homepage
    if (!window.location.pathname.includes('index.html') && !window.location.pathname.endsWith('/')) {
        return;
    }
    
    // Check if login form already exists
    if (document.getElementById('login-signup-modal')) {
        return;
    }
    
    // Create login modal
    const modalDiv = document.createElement('div');
    modalDiv.id = 'login-signup-modal';
    modalDiv.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    modalContent.innerHTML = `
        <h2 style="font-size: 24px; margin-bottom: 20px; color: var(--primary-color); text-align: center;">Log in or Sign Up</h2>
        
        <div class="tabs" style="justify-content: center; margin-bottom: 25px;">
            <div class="tab active" id="login-tab">Log In</div>
            <div class="tab" id="signup-tab">Sign Up</div>
        </div>
        
        <div id="login-form">
            <div class="form-group">
                <label for="login-email">Email</label>
                <input type="email" id="login-email" placeholder="Your email">
            </div>
            <div class="form-group">
                <label for="login-password">Password</label>
                <input type="password" id="login-password" placeholder="Your password">
            </div>
            <button class="btn btn-primary btn-block" id="login-button">Log In</button>
            <p style="text-align: center; margin-top: 15px; font-size: 14px; color: var(--light-text);">
                Don't have an account? <a href="#" id="show-signup">Sign up</a>
            </p>
            <div style="text-align: center; margin-top: 20px;">
                <button class="btn btn-outline" id="demo-login">Try Demo Account</button>
            </div>
        </div>
        
        <div id="signup-form" style="display: none; max-height: 80vh; overflow-y: auto; padding-right: 10px;">
            <div class="form-group">
                <label for="signup-name">Full Name</label>
                <input type="text" id="signup-name" placeholder="Your name">
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
                <div class="form-group">
                    <label for="signup-age">Age</label>
                    <input type="number" id="signup-age" placeholder="Age" min="18" max="99">
                </div>
                <div class="form-group">
                    <label for="signup-gender">Gender</label>
                    <select id="signup-gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="nonbinary">Non-binary</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="signup-location">Location</label>
                    <input type="text" id="signup-location" placeholder="City, State">
                </div>
            </div>
            <div class="form-group">
                <label for="signup-email">Email</label>
                <input type="email" id="signup-email" placeholder="Your email">
            </div>
            <div class="form-group">
                <label for="signup-password">Password</label>
                <input type="password" id="signup-password" placeholder="Create a password">
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="form-group">
                    <label for="signup-occupation">Occupation</label>
                    <input type="text" id="signup-occupation" placeholder="Your job title">
                </div>
                <div class="form-group">
                    <label for="signup-company">Company</label>
                    <input type="text" id="signup-company" placeholder="Where you work">
                </div>
            </div>
            <div class="form-group">
                <label for="signup-bio">Bio</label>
                <textarea id="signup-bio" rows="2" placeholder="Tell us about yourself"></textarea>
            </div>
            <div class="form-group">
                <label>I'm interested in meeting:</label>
                <select id="signup-interest-type">
                    <option value="default">Everyone</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                </select>
            </div>
            <div class="form-group">
                <label>My top interests:</label>
                <div id="signup-interests" style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px; max-height: 100px; overflow-y: auto; padding: 5px; border: 1px solid var(--border-color); border-radius: 4px;">
                    <!-- Interest tags will be dynamically added here -->
                </div>
            </div>
            <button class="btn btn-primary btn-block" id="signup-button">Sign Up</button>
            <p style="text-align: center; margin-top: 10px; font-size: 14px; color: var(--light-text);">
                Already have an account? <a href="#" id="show-login">Log in</a>
            </p>
        </div>
    `;
    
    modalDiv.appendChild(modalContent);
    document.body.appendChild(modalDiv);
    
    // Populate interest options
    populateInterestOptions();
    
    // Set up tab switching
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    });
    
    signupTab.addEventListener('click', function() {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    });
    
    // Link between forms
    document.getElementById('show-signup').addEventListener('click', function(e) {
        e.preventDefault();
        signupTab.click();
    });
    
    document.getElementById('show-login').addEventListener('click', function(e) {
        e.preventDefault();
        loginTab.click();
    });
    
    // Demo account login
    document.getElementById('demo-login').addEventListener('click', function() {
        loginUser('demo@datadate.com', 'password', 'default');
    });
    
    // Login button
    document.getElementById('login-button').addEventListener('click', function() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        
        // In a real app, you would validate against a server
        // Here we just simulate a successful login
        loginUser(email, password, 'default');
    });
    
    // Signup button
    document.getElementById('signup-button').addEventListener('click', function() {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const interestType = document.getElementById('signup-interest-type').value;
        const age = document.getElementById('signup-age').value;
        const gender = document.getElementById('signup-gender').value;
        const location = document.getElementById('signup-location').value;
        const occupation = document.getElementById('signup-occupation').value;
        const company = document.getElementById('signup-company').value;
        const bio = document.getElementById('signup-bio').value;
        
        // Get selected interests
        const selectedInterests = [];
        document.querySelectorAll('#signup-interests .tag.selected').forEach(tag => {
            selectedInterests.push(tag.textContent);
        });
        
        if (!name || !email || !password) {
            alert('Please fill out all required fields (name, email, password)');
            return;
        }
        
        if (selectedInterests.length === 0) {
            alert('Please select at least one interest');
            return;
        }
        
        // Create user profile
        const profileData = {
            name: name,
            age: parseInt(age, 10) || 30,
            gender: gender || "male",
            location: location || "San Francisco, CA",
            occupation: occupation || "Software Engineer",
            company: company || "Tech Company",
            bio: bio || "Looking for meaningful connections.",
            education: "Computer Science",
            school: "University",
            lookingFor: "Long-term relationship",
            interests: selectedInterests,
            useInitials: true
        };
        
        // Save profile data
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        
        // In a real app, you would send this to a server
        // Here we just simulate a successful signup
        loginUser(email, password, interestType, name);
    });
}

// Populate interest options for signup
function populateInterestOptions() {
    // List of common interests
    const interests = [
        "Technology", "Hiking", "Photography", "Travel", "Reading",
        "Music", "Cooking", "Fitness", "Art", "Movies", "Gaming",
        "Fashion", "Dancing", "Yoga", "Coffee", "Wine", "Food",
        "Pets", "Sports", "Outdoors", "Nature", "Science", "History"
    ];
    
    const interestsContainer = document.getElementById('signup-interests');
    if (!interestsContainer) return;
    
    interests.forEach(interest => {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.textContent = interest;
        tag.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
        interestsContainer.appendChild(tag);
    });
}

// Function to log in a user
function loginUser(email, password, userType, name) {
    // In a real app, we would validate with a server
    // For this demo, we'll just set local storage values
    
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userType', userType);
    
    if (name) {
        localStorage.setItem('userName', name);
    } else {
        localStorage.setItem('userName', 'Demo User');
    }
    
    // Remove modal if it exists
    const modal = document.getElementById('login-signup-modal');
    if (modal) {
        modal.remove();
    }
    
    // Update UI
    updateUIForLoggedInUser();
    
    // Reload the page to refresh match data
    window.location.reload();
}

// Function to update UI for logged in users
function updateUIForLoggedInUser() {
    // You could personalize the UI here
    // For example, show the user's name in the header
    const userName = localStorage.getItem('userName');
    
    // Update UI elements as needed
    // For this demo, we'll just show a welcome message
    const headerContainer = document.querySelector('header .container .logo');
    if (headerContainer) {
        const welcomeSpan = document.createElement('span');
        welcomeSpan.textContent = `Welcome, ${userName}`;
        welcomeSpan.style.fontSize = '14px';
        welcomeSpan.style.display = 'block';
        welcomeSpan.style.color = 'var(--light-text)';
        welcomeSpan.id = 'welcome-message';
        
        // Only add if it doesn't already exist
        if (!document.getElementById('welcome-message')) {
            headerContainer.appendChild(welcomeSpan);
        }
    }
}

// Function to set up logout button
function setupLogoutButton() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear local storage
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            localStorage.removeItem('userType');
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
}