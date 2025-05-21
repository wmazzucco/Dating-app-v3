// User profile management
const DEFAULT_PROFILE_IMAGE = "https://randomuser.me/api/portraits/men/33.jpg";
const INTEREST_OPTIONS = [
    "Technology", "Hiking", "Photography", "Coffee", "Traveling", "Reading",
    "Music", "Programming", "Board Games", "Rock Climbing", "Cooking", "Fitness",
    "Art", "Movies", "Gaming", "Dancing", "Writing", "Fashion", "Design", "Meditation",
    "Yoga", "Running", "Swimming", "Biking", "Camping", "Gardening", "Pets", "Food",
    "Wine", "Beer", "Theatre", "Opera", "Concerts", "Museums", "Volunteering", "Politics",
    "Science", "History", "Philosophy", "Languages", "Sports"
];

// Initialize profile when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load existing profile data
    loadProfileData();
    
    // Add profile.js to edit buttons
    setupProfileEditing();
    
    // Connect this script to auth.js
    updateProfileForCurrentUser();
});

// Load profile data from localStorage if available
function loadProfileData() {
    // Get user profile data
    const profileData = getUserProfile();
    
    // Set default interests if none exist
    if (!profileData.interests || profileData.interests.length === 0) {
        profileData.interests = ["Technology", "Hiking", "Photography", "Coffee", "Traveling"];
        saveUserProfile(profileData);
    }
    
    // Update chart colors
    updateChartColors();
}

// Get the current user profile
function getUserProfile() {
    let profileData = localStorage.getItem('userProfile');
    
    // Create default profile if none exists
    if (!profileData) {
        profileData = {
            name: localStorage.getItem('userName') || 'Demo User',
            age: 30,
            gender: "male",
            location: "San Francisco, CA",
            occupation: "Software Engineer",
            company: "Tech Innovations Inc.",
            bio: "Tech enthusiast with a passion for hiking, photography, and discovering new coffee shops. Looking for someone who appreciates both outdoor adventures and cozy evenings with good conversation.",
            education: "Computer Science",
            school: "University of California",
            lookingFor: "Long-term relationship",
            interests: ["Technology", "Hiking", "Photography", "Coffee", "Traveling", "Reading", "Music"],
            useInitials: true
        };
        
        // Save the default profile
        localStorage.setItem('userProfile', JSON.stringify(profileData));
    } else {
        profileData = JSON.parse(profileData);
    }
    
    return profileData;
}

// Save the user profile to localStorage
function saveUserProfile(profileData) {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
}

// Update chart colors to match the theme
function updateChartColors() {
    const charts = document.querySelectorAll('canvas');
    charts.forEach(chart => {
        if (chart.chart) {
            const datasets = chart.chart.data.datasets;
            datasets.forEach(dataset => {
                dataset.backgroundColor = 'rgba(196, 47, 124, 0.1)';
                dataset.borderColor = 'rgb(196, 47, 124)';
                dataset.pointBackgroundColor = 'rgb(196, 47, 124)';
                dataset.pointBorderColor = '#fff';
                dataset.pointHoverBackgroundColor = '#fff';
                dataset.pointHoverBorderColor = 'rgb(196, 47, 124)';
            });
            chart.chart.update();
        }
    });
}

// Set up profile editing functionality
function setupProfileEditing() {
    // Edit profile button
    const editProfileBtns = document.querySelectorAll('button.btn-primary');
    editProfileBtns.forEach(btn => {
        if (btn.textContent.includes('Edit Profile')) {
            btn.addEventListener('click', showProfileEditModal);
        }
    });
    
    // Edit interests button
    const editInterestsBtns = document.querySelectorAll('.card-header button.btn-outline');
    editInterestsBtns.forEach(btn => {
        if (btn.textContent.includes('Edit')) {
            btn.addEventListener('click', showInterestsEditModal);
        }
    });
    
    // Change avatar colors button
    const changeColorBtn = document.getElementById('change-color-btn');
    if (changeColorBtn) {
        changeColorBtn.addEventListener('click', changeAvatarColor);
    }
}

// Change avatar color to a random color
function changeAvatarColor() {
    const avatarPlaceholder = document.getElementById('profile-avatar-placeholder');
    if (!avatarPlaceholder) return;
    
    // Array of vibrant colors suitable for avatars
    const colors = [
        '#e57373', // Red
        '#f06292', // Pink
        '#ba68c8', // Purple
        '#9575cd', // Deep Purple
        '#7986cb', // Indigo
        '#64b5f6', // Blue
        '#4fc3f7', // Light Blue
        '#4dd0e1', // Cyan
        '#4db6ac', // Teal
        '#81c784', // Green
        '#aed581', // Light Green
        '#dce775', // Lime
        '#fff176', // Yellow
        '#ffd54f', // Amber
        '#ffb74d', // Orange
        '#ff8a65', // Deep Orange
        '#a1887f', // Brown
        '#90a4ae'  // Blue Grey
    ];
    
    // Choose a random color
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Apply the color
    avatarPlaceholder.style.backgroundColor = randomColor;
    
    // Get user profile and update it
    const profileData = getUserProfile();
    profileData.avatarColor = randomColor;
    saveUserProfile(profileData);
}

// Show the profile edit modal
function showProfileEditModal() {
    const profileData = getUserProfile();
    
    // Create modal element
    const modalDiv = document.createElement('div');
    modalDiv.id = 'profile-edit-modal';
    modalDiv.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.maxWidth = '600px';
    
    modalContent.innerHTML = `
        <h2 style="font-size: 24px; margin-bottom: 20px; color: var(--primary-color); text-align: center;">Edit Your Profile</h2>
        
        <div class="form-group">
            <label for="edit-name">Full Name</label>
            <input type="text" id="edit-name" value="${profileData.name || ''}">
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
            <div class="form-group">
                <label for="edit-age">Age</label>
                <input type="number" id="edit-age" value="${profileData.age || ''}">
            </div>
            <div class="form-group">
                <label for="edit-gender">Gender</label>
                <select id="edit-gender">
                    <option value="male" ${profileData.gender === 'male' ? 'selected' : ''}>Male</option>
                    <option value="female" ${profileData.gender === 'female' ? 'selected' : ''}>Female</option>
                    <option value="nonbinary" ${profileData.gender === 'nonbinary' ? 'selected' : ''}>Non-binary</option>
                </select>
            </div>
            <div class="form-group">
                <label for="edit-location">Location</label>
                <input type="text" id="edit-location" value="${profileData.location || ''}">
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div class="form-group">
                <label for="edit-occupation">Occupation</label>
                <input type="text" id="edit-occupation" value="${profileData.occupation || ''}">
            </div>
            <div class="form-group">
                <label for="edit-company">Company/Organization</label>
                <input type="text" id="edit-company" value="${profileData.company || ''}">
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div class="form-group">
                <label for="edit-education">Education</label>
                <input type="text" id="edit-education" value="${profileData.education || ''}">
            </div>
            <div class="form-group">
                <label for="edit-school">School/University</label>
                <input type="text" id="edit-school" value="${profileData.school || ''}">
            </div>
        </div>
        
        <div class="form-group">
            <label for="edit-looking-for">Looking For</label>
            <select id="edit-looking-for">
                <option value="Long-term relationship" ${profileData.lookingFor === 'Long-term relationship' ? 'selected' : ''}>Long-term relationship</option>
                <option value="Short-term relationship" ${profileData.lookingFor === 'Short-term relationship' ? 'selected' : ''}>Short-term relationship</option>
                <option value="Friendship" ${profileData.lookingFor === 'Friendship' ? 'selected' : ''}>Friendship</option>
                <option value="Casual dating" ${profileData.lookingFor === 'Casual dating' ? 'selected' : ''}>Casual dating</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="edit-bio">Bio</label>
            <textarea id="edit-bio" rows="4">${profileData.bio || ''}</textarea>
        </div>
        
        <div style="display: flex; gap: 15px; margin-top: 20px;">
            <button class="btn btn-outline" id="cancel-profile-edit" style="flex: 1;">Cancel</button>
            <button class="btn btn-primary" id="save-profile-edit" style="flex: 1;">Save Changes</button>
        </div>
    `;
    
    modalDiv.appendChild(modalContent);
    document.body.appendChild(modalDiv);
    
    // Setup event listeners
    document.getElementById('cancel-profile-edit').addEventListener('click', function() {
        modalDiv.remove();
    });
    
    document.getElementById('save-profile-edit').addEventListener('click', function() {
        // Get all form values
        const updatedProfile = {
            ...profileData,
            name: document.getElementById('edit-name').value,
            age: parseInt(document.getElementById('edit-age').value, 10) || 30,
            gender: document.getElementById('edit-gender').value,
            location: document.getElementById('edit-location').value,
            occupation: document.getElementById('edit-occupation').value,
            company: document.getElementById('edit-company').value,
            education: document.getElementById('edit-education').value,
            school: document.getElementById('edit-school').value,
            lookingFor: document.getElementById('edit-looking-for').value,
            bio: document.getElementById('edit-bio').value,
            useInitials: true
        };
        
        // Save updated profile
        saveUserProfile(updatedProfile);
        
        // Update localStorage username to match profile
        localStorage.setItem('userName', updatedProfile.name);
        
        // Refresh the page to show changes
        window.location.reload();
    });
}

// Show the interests edit modal
function showInterestsEditModal() {
    const profileData = getUserProfile();
    
    // Create modal element
    const modalDiv = document.createElement('div');
    modalDiv.id = 'interests-edit-modal';
    modalDiv.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.maxWidth = '600px';
    
    // Generate HTML for interest checkboxes
    let interestsHTML = '';
    
    INTEREST_OPTIONS.forEach(interest => {
        const isSelected = profileData.interests && profileData.interests.includes(interest);
        
        interestsHTML += `
            <div style="display: inline-block; margin: 5px; padding: 8px 15px; border-radius: 20px; border: 1px solid var(--border-color); background-color: ${isSelected ? 'var(--primary-color)' : 'white'}; color: ${isSelected ? 'white' : 'var(--text-color)'}; cursor: pointer;" 
                data-interest="${interest}" class="interest-option ${isSelected ? 'selected' : ''}">
                ${interest}
            </div>
        `;
    });
    
    modalContent.innerHTML = `
        <h2 style="font-size: 24px; margin-bottom: 20px; color: var(--primary-color); text-align: center;">Edit Your Interests</h2>
        
        <p style="margin-bottom: 15px; text-align: center;">Select interests that describe you and what you enjoy</p>
        
        <div style="max-height: 300px; overflow-y: auto; padding: 10px; margin-bottom: 20px; border: 1px solid var(--border-color); border-radius: 8px;">
            ${interestsHTML}
        </div>
        
        <div style="display: flex; gap: 15px; margin-top: 20px;">
            <button class="btn btn-outline" id="cancel-interests-edit" style="flex: 1;">Cancel</button>
            <button class="btn btn-primary" id="save-interests-edit" style="flex: 1;">Save Changes</button>
        </div>
    `;
    
    modalDiv.appendChild(modalContent);
    document.body.appendChild(modalDiv);
    
    // Toggle interest selection
    const interestOptions = document.querySelectorAll('.interest-option');
    interestOptions.forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('selected');
            
            if (this.classList.contains('selected')) {
                this.style.backgroundColor = 'var(--primary-color)';
                this.style.color = 'white';
            } else {
                this.style.backgroundColor = 'white';
                this.style.color = 'var(--text-color)';
            }
        });
    });
    
    // Setup cancel button
    document.getElementById('cancel-interests-edit').addEventListener('click', function() {
        modalDiv.remove();
    });
    
    // Setup save button
    document.getElementById('save-interests-edit').addEventListener('click', function() {
        // Get all selected interests
        const selectedInterests = [];
        document.querySelectorAll('.interest-option.selected').forEach(option => {
            selectedInterests.push(option.getAttribute('data-interest'));
        });
        
        // Update profile with new interests
        const updatedProfile = {
            ...profileData,
            interests: selectedInterests
        };
        
        // Save updated profile
        saveUserProfile(updatedProfile);
        
        // Refresh the page to show changes
        window.location.reload();
    });
}

// Update profile for the current user
function updateProfileForCurrentUser() {
    const userName = localStorage.getItem('userName');
    const profileData = getUserProfile();
    
    // Update profile name if it doesn't match
    if (userName && profileData.name !== userName) {
        profileData.name = userName;
        saveUserProfile(profileData);
    }
    
    // Update profile elements on page
    updateProfileElements(profileData);
}

// Update all profile elements on the page
function updateProfileElements(profileData) {
    // Update name
    const nameElements = document.querySelectorAll('h1');
    nameElements.forEach(el => {
        if (el.textContent.includes('Johnson') || el.textContent.trim() === 'Alex Johnson') {
            el.textContent = profileData.name;
        }
    });
    
    // Update basic info text
    const basicInfoElements = document.querySelectorAll('p');
    basicInfoElements.forEach(el => {
        if (el.textContent.includes('Software Engineer') && el.textContent.includes('Male') && el.textContent.includes('San Francisco')) {
            // Format gender display with first letter capitalized
            const genderDisplay = profileData.gender.charAt(0).toUpperCase() + profileData.gender.slice(1);
            el.textContent = `${profileData.occupation} • ${profileData.age} • ${genderDisplay} • ${profileData.location}`;
        }
    });
    
    // Update bio
    const bioElements = document.querySelectorAll('p');
    bioElements.forEach(el => {
        if (el.textContent.includes('Tech enthusiast with a passion for hiking')) {
            el.textContent = profileData.bio;
        }
    });
    
    // Update profile avatar placeholder with initials
    const avatarPlaceholder = document.getElementById('profile-avatar-placeholder');
    if (avatarPlaceholder) {
        // Get initials from name (up to 2 characters)
        const nameParts = profileData.name.split(' ');
        let initials = '';
        
        if (nameParts.length >= 2) {
            // Get first letter of first and last name
            initials = nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0);
        } else if (nameParts.length === 1) {
            // If there's only one name, use first two letters
            initials = nameParts[0].substring(0, 2);
        } else {
            initials = "??";
        }
        
        avatarPlaceholder.textContent = initials.toUpperCase();
        
        // Apply saved color if available
        if (profileData.avatarColor) {
            avatarPlaceholder.style.backgroundColor = profileData.avatarColor;
        }
    }
    
    // Update occupation
    const occupationElements = document.querySelectorAll('div[style*="font-weight: 600"]');
    occupationElements.forEach(el => {
        if (el.textContent === 'Software Engineer') {
            el.textContent = profileData.occupation;
        }
    });
    
    // Update company
    const companyElements = document.querySelectorAll('div[style*="color: var(--light-text)"]');
    companyElements.forEach(el => {
        if (el.textContent === 'at Tech Innovations Inc.') {
            el.textContent = `at ${profileData.company}`;
        }
    });
    
    // Update education
    occupationElements.forEach(el => {
        if (el.textContent === 'Computer Science') {
            el.textContent = profileData.education;
        }
    });
    
    // Update school
    companyElements.forEach(el => {
        if (el.textContent === 'University of California') {
            el.textContent = profileData.school;
        }
    });
    
    // Update location
    occupationElements.forEach(el => {
        if (el.textContent === 'San Francisco, CA') {
            el.textContent = profileData.location;
        }
    });
    
    // Update looking for
    occupationElements.forEach(el => {
        if (el.textContent === 'Looking for') {
            const nextElement = el.nextElementSibling;
            if (nextElement && nextElement.textContent === 'Long-term relationship') {
                nextElement.textContent = profileData.lookingFor;
            }
        }
    });
    
    // Update interests
    const interestsContainer = document.querySelector('.card-body .tag, .card-body div[style*="display: flex; flex-wrap: wrap"]');
    if (interestsContainer && interestsContainer.parentElement) {
        const container = interestsContainer.parentElement;
        container.innerHTML = '';
        
        profileData.interests.forEach(interest => {
            const interestTag = document.createElement('span');
            interestTag.className = 'tag';
            interestTag.textContent = interest;
            container.appendChild(interestTag);
        });
    }
}