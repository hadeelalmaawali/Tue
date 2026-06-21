
const button = document.getElementById('load-btn');
const container = document.getElementById('user-container');
const searchInput = document.getElementById('search-input');
const status = document.getElementById('status');
 
let allPosts = [];

async function fetchPosts() {
    try {
        status.innerText = 'Loading...';
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        allPosts = await response.json();
      
        renderCards(allPosts);
        
        searchInput.style.display = 'inline-block';
        status.innerText = 'Posts loaded successfully!'; 
        
    } catch (error) {
        console.error('Failed to acquire post data:', error);
        status.innerText = 'An error occurred while fetching posts.';
    }
}

button.addEventListener('click', fetchPosts);
 
searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    const filtered = allPosts.filter(post =>
        post.title.toLowerCase().includes(query)
    );
    renderCards(filtered);
});
 
function renderCards(posts) {
    container.innerHTML = '';

    if (posts.length === 0) {
        container.innerHTML = '<p class="no-results">No posts found.</p>';
        return;
    }
 
    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'user-card'; 
 

        let shortBody = post.body;
        if (shortBody.length > 100) {
            shortBody = shortBody.substring(0, 100) + "...";
        }
 
        card.innerHTML = `
            <p><strong>Post ID:</strong> ${post.id}</p>
            <h3>${post.title}</h3>
            <p>${shortBody}</p>
        `;
        
        container.appendChild(card);
    });
}
