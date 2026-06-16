const button = document.getElementById('load-btn');
const container = document.getElementById('user-container');
const searchInput = document.getElementById('search-input');
const status = document.getElementById('status');
 
let allUsers = [];
 
// Extracted the async function outside the listener to keep code clean and readable
async function fetchUsers() {
    try {
        status.innerText = 'Loading...';
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Save the parsed data to your global variable
        allUsers = await response.json();
        
        // Render the freshly fetched users to the DOM
        renderCards(allUsers);
        
        // Clear the status text upon success
        status.innerText = ''; 
        
    } catch (error) {
        console.error('Failed to acquire user data:', error);
        status.innerText = 'Failed to load users. Please try again.';
    }
}

// Trigger the network fetch on click
button.addEventListener('click', fetchUsers);
 
searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(query)
    );
    renderCards(filtered);
});
 
function renderCards(users) {
    container.innerHTML = '';
    
    // Fallback if no users match the filter query
    if (users.length === 0) {
        container.innerHTML = '<p class="no-results">No users found</p>';
        return;
    }
 
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card'; 
 
        const email = user.email || 'No email';
        const company = (user.company && user.company.name) ? user.company.name : 'No company';
        const phone = user.phone || 'No phone';
        const city = (user.address && user.address.city) ? user.address.city : 'No city';
 
        card.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>City:</strong> ${city}</p>
        `;
        
        container.appendChild(card);
    });
}
