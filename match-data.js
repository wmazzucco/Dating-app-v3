// Alternate match datasets for different accounts
const matchDatasets = {
    default: [
        {
            name: "Sarah P.",
            age: 29,
            distance: "3 miles away",
            occupation: "Product Manager",
            bio: "Product Manager passionate about creating user-friendly tech solutions. Love travel, photography, and discovering new restaurants.",
            interests: ["Technology", "Travel", "Photography", "Food"],
            matchScore: 95,
            image: "https://randomuser.me/api/portraits/women/33.jpg"
        },
        {
            name: "Rebecca L.",
            age: 31,
            distance: "5 miles away",
            occupation: "UX Designer",
            bio: "UX Designer who loves yoga, hiking and indie music. Looking for someone to explore the city with.",
            interests: ["Design", "Yoga", "Hiking", "Music"],
            matchScore: 88,
            image: "https://randomuser.me/api/portraits/women/65.jpg"
        },
        {
            name: "Michael T.",
            age: 32,
            distance: "4 miles away",
            occupation: "Software Developer",
            bio: "Tech enthusiast with a passion for AI and machine learning. Enjoys hiking, photography, and craft beer.",
            interests: ["Technology", "Hiking", "Photography", "Beer"],
            matchScore: 91,
            image: "https://randomuser.me/api/portraits/men/42.jpg"
        },
        {
            name: "Emma W.",
            age: 27,
            distance: "7 miles away",
            occupation: "Software Developer",
            bio: "Software developer and coffee enthusiast. Enjoys rock climbing, reading sci-fi novels, and playing board games.",
            interests: ["Technology", "Coffee", "Climbing", "Books"],
            matchScore: 85,
            image: "https://randomuser.me/api/portraits/women/68.jpg"
        }
    ],
    women: [
        {
            name: "Olivia R.",
            age: 28,
            distance: "2 miles away",
            occupation: "Graphic Artist",
            bio: "Creative soul with a passion for visual storytelling. Love art galleries, photography, and exploring new coffee shops.",
            interests: ["Art", "Design", "Photography", "Coffee"],
            matchScore: 94,
            image: "https://randomuser.me/api/portraits/women/17.jpg"
        },
        {
            name: "Maya T.",
            age: 32,
            distance: "4 miles away",
            occupation: "Fashion Designer",
            bio: "Fashion enthusiast with an eye for beauty. Enjoys cultural events, vintage markets, and creating new designs.",
            interests: ["Fashion", "Art", "Culture", "Design"],
            matchScore: 91,
            image: "https://randomuser.me/api/portraits/women/23.jpg"
        },
        {
            name: "Zoe A.",
            age: 27,
            distance: "5 miles away",
            occupation: "Musician",
            bio: "Indie musician with a love for creating melodies. Enjoys performing at local venues, hiking, and film festivals.",
            interests: ["Music", "Performing", "Hiking", "Film"],
            matchScore: 88,
            image: "https://randomuser.me/api/portraits/women/79.jpg"
        },
        {
            name: "Chloe S.",
            age: 30,
            distance: "8 miles away",
            occupation: "Interior Designer",
            bio: "Design enthusiast who transforms spaces. Passionate about architecture, plant care, and flea market hunting.",
            interests: ["Design", "Architecture", "Plants", "Antiques"],
            matchScore: 85,
            image: "https://randomuser.me/api/portraits/women/57.jpg"
        }
    ],
    men: [
        {
            name: "David R.",
            age: 31,
            distance: "2 miles away",
            occupation: "Software Architect",
            bio: "Tech enthusiast who loves solving complex problems. Enjoys traveling, hiking, and exploring new cuisines.",
            interests: ["Technology", "Travel", "Hiking", "Food"],
            matchScore: 96,
            image: "https://randomuser.me/api/portraits/men/47.jpg"
        },
        {
            name: "Jason K.",
            age: 29,
            distance: "3 miles away",
            occupation: "Marketing Director",
            bio: "Creative thinker with a passion for brand storytelling. Enjoys photography, jazz music, and wine tasting.",
            interests: ["Marketing", "Photography", "Music", "Wine"],
            matchScore: 92,
            image: "https://randomuser.me/api/portraits/men/37.jpg"
        },
        {
            name: "Chris B.",
            age: 35,
            distance: "4 miles away",
            occupation: "Doctor",
            bio: "Healthcare professional who enjoys staying active. Loves running, tennis, and exploring local cafes.",
            interests: ["Fitness", "Tennis", "Coffee", "Medicine"],
            matchScore: 89,
            image: "https://randomuser.me/api/portraits/men/63.jpg"
        },
        {
            name: "Alex W.",
            age: 28,
            distance: "6 miles away",
            occupation: "Architect",
            bio: "Design-focused professional who loves urban exploration. Passionate about sustainable building and art galleries.",
            interests: ["Architecture", "Art", "Sustainability", "Design"],
            matchScore: 87,
            image: "https://randomuser.me/api/portraits/men/75.jpg"
        }
    ]
};

// Function to get and update match data based on user type
function getMatchData() {
    // Get user type from localStorage or use default if not set
    const userType = localStorage.getItem('userType') || 'default';
    
    // Check if user type exists in datasets, fallback to default if not
    if (!matchDatasets[userType]) {
        return matchDatasets['default'];
    }
    
    // Return appropriate match data
    return matchDatasets[userType];
}

// Set current match data based on user type
let matchData = getMatchData();

// Add event listener to update matches if localStorage changes
window.addEventListener('storage', function(e) {
    if (e.key === 'userType') {
        matchData = getMatchData();
        const container = document.getElementById('matches-container');
        if (container) {
            renderMatches('matches-container');
        }
    }
});

// Function to render matches in the common format
function renderMatches(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear any existing content
    container.innerHTML = '';
    
    // Create a grid container
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    grid.style.gap = '30px';
    grid.style.marginBottom = '60px';
    
    // Determine if we're on the compatibility page
    const isCompatibilityPage = window.location.pathname.includes('compatibility.html');
    
    // Add each match card
    matchData.forEach(match => {
        const card = document.createElement('div');
        
        // Style the card differently based on the page
        if (isCompatibilityPage) {
            card.className = 'match-card';
            card.innerHTML = `
                <div style="background: linear-gradient(to right, var(--primary-color), var(--secondary-color)); color: white; padding: 20px; position: relative;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                        <i class="fas fa-user" style="font-size: 36px; color: var(--primary-light);"></i>
                    </div>
                    <div style="position: absolute; top: 20px; right: 20px; background: white; color: var(--primary-color); font-weight: bold; padding: 5px 10px; border-radius: 20px;">${match.matchScore}%</div>
                </div>
                <div style="padding: 20px;">
                    <h3 style="font-size: 18px; margin-bottom: 5px;">${match.name}</h3>
                    <p style="color: var(--light-text); font-size: 14px; margin-bottom: 10px;">${match.occupation}</p>
                    <p style="font-size: 14px; margin-bottom: 15px;">${match.bio}</p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 15px;">
                        <div style="text-align: center;">
                            <div style="font-size: 12px; color: var(--light-text);">Interests</div>
                            <div style="font-weight: 600; color: var(--primary-color);">92%</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 12px; color: var(--light-text);">Music Taste</div>
                            <div style="font-weight: 600; color: var(--primary-color);">88%</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 12px; color: var(--light-text);">Communication</div>
                            <div style="font-weight: 600; color: var(--primary-color);">95%</div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button class="btn btn-primary" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px;">
                            <i class="fas fa-heart"></i>
                            Like
                        </button>
                        <button class="btn btn-outline" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px;">
                            <i class="fas fa-comment"></i>
                            Message
                        </button>
                    </div>
                </div>
            `;
        } else {
            card.className = 'card';
            card.style.overflow = 'hidden';
            card.innerHTML = `
                <div style="position: relative;">
                    <img src="${match.image}" alt="${match.name}" style="width: 100%; height: 300px; object-fit: cover;">
                    <div style="position: absolute; top: 15px; right: 15px; background: white; color: var(--primary-color); font-weight: bold; padding: 5px 10px; border-radius: 20px;">
                        ${match.matchScore}% Match
                    </div>
                </div>
                <div style="padding: 20px;">
                    <h3 style="font-size: 20px; margin-bottom: 5px;">${match.name}, ${match.age}</h3>
                    <p style="color: var(--light-text); margin-bottom: 15px;">${match.distance}</p>
                    <p style="margin-bottom: 15px;">${match.bio}</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
                        ${match.interests.map(interest => `<span class="interest-tag">${interest}</span>`).join('')}
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button class="btn btn-primary" style="flex: 1;">View Profile</button>
                        <button class="btn btn-outline" style="width: 48px; display: flex; align-items: center; justify-content: center;">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;
        }
        
        grid.appendChild(card);
    });
    
    container.appendChild(grid);
    
    // Heart toggle functionality
    const heartButtons = container.querySelectorAll('.btn-outline');
    heartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const heart = this.querySelector('i');
            if (heart.classList.contains('far')) {
                heart.classList.remove('far');
                heart.classList.add('fas');
                heart.style.color = '#e53e3e';
            } else {
                heart.classList.remove('fas');
                heart.classList.add('far');
                heart.style.color = '';
            }
        });
    });
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // This will apply to any page that includes this script
    matchData = getMatchData(); // Refresh match data on page load
    renderMatches('matches-container');
});