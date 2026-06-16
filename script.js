const button = document.getElementById('load-btn');
const container = document.getElementById('user-container');
const searchInput = document.getElementById('search-input');
const status = document.getElementById('status');
 
let allUsers = [];
 
button.addEventListener('click', () => {
    status.innerText = 'Loading...';
 
    fetch('users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load users.json');
            }
            return response.json();
        })
        .then(users => {
            allUsers = users;
            status.innerText = 'Loaded ' + users.length + ' users!';
            searchInput.style.display = 'inline';
            renderCards(users);
        })
        .catch(error => {
            status.innerText = 'Error: ' + error.message;
        });
});
 
searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(query)
    );
    renderCards(filtered);
});
 
function renderCards(users) {
    container.innerHTML = '';
 
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
        `; // Note: Removed <hr> since the card border handles separation perfectly now!
        
        container.appendChild(card);
    });
}