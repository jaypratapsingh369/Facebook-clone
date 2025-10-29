// Facebook Clone App Logic

// Global variables
let currentUser = null;
let currentPage = 'auth';

// DOM elements
const authPage = document.getElementById('auth-page');
const mainPage = document.getElementById('main-page');
const profilePage = document.getElementById('profile-page');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');
const logoutBtn = document.getElementById('logoutBtn');
const postInput = document.getElementById('postInput');
const postModal = document.getElementById('postModal');
const submitPostBtn = document.getElementById('submitPost');
const postsContainer = document.getElementById('postsContainer');
const commentsModal = document.getElementById('commentsModal');

// Initialize app
function initApp() {
    loadCurrentUser();
    setupEventListeners();
    renderApp();
}

// Load current user from localStorage
function loadCurrentUser() {
    const userId = localStorage.getItem('facebook_current_user');
    if (userId) {
        currentUser = getUserById(parseInt(userId));
        if (currentUser) {
            currentPage = 'feed';
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Auth forms
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    showRegisterBtn.addEventListener('click', () => switchAuthForm('register'));
    showLoginBtn.addEventListener('click', () => switchAuthForm('login'));

    // Navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => navigateToPage(btn.dataset.page));
    });

    // Logout
    logoutBtn.addEventListener('click', handleLogout);

    // Post creation
    postInput.addEventListener('click', openPostModal);
    document.querySelectorAll('.post-action').forEach(btn => {
        btn.addEventListener('click', () => openPostModal(btn.dataset.action));
    });

    // Post modal
    document.getElementById('addImageBtn').addEventListener('click', () => {
        document.getElementById('imageInput').click();
    });
    document.getElementById('imageInput').addEventListener('change', handleImageSelect);
    submitPostBtn.addEventListener('click', handlePostSubmit);
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    // Outside click to close modals
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });
}

// Render app based on current state
function renderApp() {
    // Hide all pages
    authPage.classList.remove('active');
    mainPage.classList.remove('active');
    profilePage.classList.remove('active');

    if (currentUser) {
        // Show main app
        mainPage.classList.add('active');
        updateHeader();
        renderFeed();
        renderSidebar();
    } else {
        // Show auth page
        authPage.classList.add('active');
    }
}

// Authentication handlers
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = getUserByEmail(email);
    if (user && user.password === password) {
        currentUser = user;
        setCurrentUser(user.id);
        currentPage = 'feed';
        renderApp();
    } else {
        alert('Invalid credentials');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const firstName = document.getElementById('registerFirstName').value;
    const lastName = document.getElementById('registerLastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const birthday = document.getElementById('registerBirthday').value;
    const gender = document.getElementById('registerGender').value;

    if (getUserByEmail(email)) {
        alert('User already exists');
        return;
    }

    const newUser = createUser({
        firstName,
        lastName,
        email,
        password,
        birthday,
        gender
    });

    currentUser = newUser;
    setCurrentUser(newUser.id);
    currentPage = 'feed';
    renderApp();
}

function handleLogout() {
    currentUser = null;
    logout();
    currentPage = 'auth';
    renderApp();
}

function switchAuthForm(form) {
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.getElementById(`${form}-form`).classList.add('active');
}

// Navigation
function navigateToPage(page) {
    currentPage = page;
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`).classList.add('active');

    if (page === 'profile') {
        renderProfile();
        mainPage.classList.remove('active');
        profilePage.classList.add('active');
    } else {
        profilePage.classList.remove('active');
        mainPage.classList.add('active');
        if (page === 'feed') {
            renderFeed();
        } else if (page === 'friends') {
            renderFriends();
        }
    }
}

// Update header with user info
function updateHeader() {
    document.getElementById('headerAvatar').src = currentUser.avatar;
    document.getElementById('headerUsername').textContent = getFullName(currentUser);
    document.getElementById('postAvatar').src = currentUser.avatar;
    document.getElementById('modalAvatar').src = currentUser.avatar;
    document.getElementById('commentAvatar').src = currentUser.avatar;
}

// Render feed
function renderFeed() {
    const feedPosts = getFeedPosts(currentUser.id);
    postsContainer.innerHTML = '';

    feedPosts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });
}

// Create post element
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.dataset.postId = post.id;

    const author = getUserById(post.authorId);
    const isLiked = post.likes.includes(currentUser.id);

    postDiv.innerHTML = `
        <div class="post-header">
            <img src="${author.avatar}" alt="Avatar" class="avatar-small">
            <div class="post-author-info">
                <h4>${getFullName(author)}</h4>
                <span>${formatDate(post.createdAt)}</span>
            </div>
        </div>
        <div class="post-content">
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post image">` : ''}
        </div>
        <div class="post-stats">
            <span>${post.likes.length} likes</span>
            <span>${post.comments.length} comments</span>
        </div>
        <div class="post-actions">
            <button class="post-action-btn like-btn ${isLiked ? 'liked' : ''}" data-action="like">
                <i class="fas fa-thumbs-up"></i> Like
            </button>
            <button class="post-action-btn" data-action="comment">
                <i class="fas fa-comment"></i> Comment
            </button>
        </div>
    `;

    // Add event listeners
    postDiv.querySelector('.like-btn').addEventListener('click', () => toggleLikePost(post.id));
    postDiv.querySelector('[data-action="comment"]').addEventListener('click', () => openCommentsModal(post.id));

    return postDiv;
}

// Toggle like on post
function toggleLikePost(postId) {
    const likes = toggleLike(postId, currentUser.id);
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    const likeBtn = postElement.querySelector('.like-btn');
    const likeCount = postElement.querySelector('.post-stats span:first-child');

    likeBtn.classList.toggle('liked');
    likeCount.textContent = `${likes.length} likes`;
}

// Open post modal
function openPostModal(type = 'text') {
    document.getElementById('postText').value = '';
    document.getElementById('imagePreview').classList.add('hidden');
    document.getElementById('previewImg').src = '';
    postModal.classList.add('active');
}

// Handle image selection
function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('previewImg').src = e.target.result;
            document.getElementById('imagePreview').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

// Handle post submission
function handlePostSubmit() {
    const content = document.getElementById('postText').value.trim();
    const imageInput = document.getElementById('imageInput');
    const imageFile = imageInput.files[0];

    if (!content && !imageFile) return;

    let imageData = null;
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageData = e.target.result;
            createPost(content, imageData);
        };
        reader.readAsDataURL(imageFile);
    } else {
        createPost(content, imageData);
    }

    closeModals();
}

function createPost(content, image) {
    const newPost = createPostData({
        authorId: currentUser.id,
        content,
        image
    });

    renderFeed();
}

// Open comments modal
function openCommentsModal(postId) {
    const post = getPostById(postId);
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';

    post.comments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsList.appendChild(commentElement);
    });

    document.getElementById('commentInput').value = '';
    document.getElementById('submitComment').onclick = () => submitComment(postId);

    commentsModal.classList.add('active');
}

// Create comment element
function createCommentElement(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';

    const author = getUserById(comment.authorId);

    commentDiv.innerHTML = `
        <img src="${author.avatar}" alt="Avatar" class="avatar-small">
        <div class="comment-content">
            <div class="comment-author">${getFullName(author)}</div>
            <div class="comment-text">${comment.content}</div>
        </div>
    `;

    return commentDiv;
}

// Submit comment
function submitComment(postId) {
    const content = document.getElementById('commentInput').value.trim();
    if (!content) return;

    addComment(postId, {
        authorId: currentUser.id,
        content
    });

    // Re-open comments modal to show new comment
    openCommentsModal(postId);
    document.getElementById('commentInput').value = '';
}

// Render sidebar
function renderSidebar() {
    const sidebarFriends = document.getElementById('sidebarFriends');
    const contactsList = document.getElementById('contactsList');

    sidebarFriends.innerHTML = '';
    contactsList.innerHTML = '';

    currentUser.friends.slice(0, 6).forEach(friendId => {
        const friend = getUserById(friendId);
        const friendElement = document.createElement('div');
        friendElement.className = 'friend-item';
        friendElement.innerHTML = `
            <img src="${friend.avatar}" alt="Avatar">
            <span>${friend.firstName}</span>
        `;
        sidebarFriends.appendChild(friendElement);

        const contactElement = friendElement.cloneNode(true);
        contactsList.appendChild(contactElement);
    });
}

// Render profile page
function renderProfile() {
    const userPosts = getPosts().filter(post => post.authorId === currentUser.id);

    document.getElementById('profileCover').src = currentUser.coverPhoto;
    document.getElementById('profileAvatar').src = currentUser.avatar;
    document.getElementById('profileName').textContent = getFullName(currentUser);
    document.getElementById('profileFriends').textContent = `${currentUser.friends.length} friends`;
    document.getElementById('profileBio').textContent = currentUser.bio || 'No bio available.';

    const profilePostsContainer = document.getElementById('profile-posts');
    profilePostsContainer.innerHTML = '';

    userPosts.forEach(post => {
        const postElement = createPostElement(post);
        profilePostsContainer.appendChild(postElement);
    });

    const profileFriendsList = document.getElementById('profileFriendsList');
    profileFriendsList.innerHTML = '';

    currentUser.friends.forEach(friendId => {
        const friend = getUserById(friendId);
        const friendCard = document.createElement('div');
        friendCard.className = 'friend-card';
        friendCard.innerHTML = `
            <img src="${friend.avatar}" alt="Avatar">
            <h4>${getFullName(friend)}</h4>
        `;
        profileFriendsList.appendChild(friendCard);
    });
}

// Render friends page
function renderFriends() {
    // For now, just show friends list in feed area
    postsContainer.innerHTML = '<h2>Your Friends</h2>';
    currentUser.friends.forEach(friendId => {
        const friend = getUserById(friendId);
        const friendElement = document.createElement('div');
        friendElement.className = 'friend-item';
        friendElement.style.padding = '10px';
        friendElement.innerHTML = `
            <img src="${friend.avatar}" alt="Avatar">
            <span>${getFullName(friend)}</span>
        `;
        postsContainer.appendChild(friendElement);
    });
}

// Close modals
function closeModals() {
    postModal.classList.remove('active');
    commentsModal.classList.remove('active');
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
