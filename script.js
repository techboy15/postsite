const postsContainer = document.getElementById('posts');
const newPostForm = document.getElementById('new-post-form');
const postTitleInput = document.getElementById('post-title');
const postBodyInput = document.getElementById('post-body');

const posts = [];

function createPost(title, body) {
  posts.unshift({
    id: String(Date.now()),
    title: title.trim(),
    body: body.trim(),
    likes: 0,
    comments: []
  });
  renderPosts();
}

function addComment(postId, commentText) {
  const post = posts.find(item => item.id === postId);
  if (!post) return;
  const trimmed = commentText.trim();
  if (!trimmed) return;
  post.comments.push({ id: String(Date.now()), text: trimmed });
  renderPosts();
}

function toggleLike(postId) {
  const post = posts.find(item => item.id === postId);
  if (!post) return;
  post.likes += 1;
  renderPosts();
}

function renderPosts() {
  postsContainer.innerHTML = '';

  if (posts.length === 0) {
    postsContainer.innerHTML = `
      <div class="card empty-state">
        <p>No posts yet. Create a post to get started.</p>
      </div>
    `;
    return;
  }

  posts.forEach(post => {
    const postCard = document.createElement('article');
    postCard.className = 'post-card';

    const postHeader = document.createElement('div');
    postHeader.className = 'post-header';
    postHeader.innerHTML = `
      <div>
        <h3 class="post-title">${escapeHtml(post.title)}</h3>
        <p class="post-meta">${post.comments.length} comment(s) • ${post.likes} like(s)</p>
      </div>
      <button class="action-button" data-action="like" data-id="${post.id}">❤️ Like</button>
    `;

    const postBody = document.createElement('p');
    postBody.className = 'post-body';
    postBody.textContent = post.body;

    const commentsSection = document.createElement('section');
    commentsSection.className = 'comments';
    commentsSection.innerHTML = `
      <h4>${post.comments.length} Comment${post.comments.length === 1 ? '' : 's'}</h4>
      ${post.comments.length === 0 ? '<p class="comment">No comments yet. Be the first.</p>' : ''}
    `;

    post.comments.forEach(comment => {
      const commentItem = document.createElement('div');
      commentItem.className = 'comment';
      commentItem.innerHTML = `<p class="comment-text">${escapeHtml(comment.text)}</p>`;
      commentsSection.appendChild(commentItem);
    });

    const commentForm = document.createElement('form');
    commentForm.className = 'comment-form';
    commentForm.dataset.postId = post.id;
    commentForm.innerHTML = `
      <label>
        Add a comment
        <textarea name="comment" rows="3" placeholder="Write a comment..." required maxlength="240"></textarea>
      </label>
      <button type="submit">Post comment</button>
    `;

    postCard.append(postHeader, postBody, commentsSection, commentForm);
    postsContainer.appendChild(postCard);
  });
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

newPostForm.addEventListener('submit', event => {
  event.preventDefault();
  createPost(postTitleInput.value, postBodyInput.value);
  postTitleInput.value = '';
  postBodyInput.value = '';
  postTitleInput.focus();
});

postsContainer.addEventListener('click', event => {
  const button = event.target.closest('button[data-action="like"]');
  if (!button) return;
  const id = button.dataset.id;
  toggleLike(id);
});

postsContainer.addEventListener('submit', event => {
  if (!event.target.classList.contains('comment-form')) return;
  event.preventDefault();
  const form = event.target;
  const textarea = form.querySelector('textarea[name="comment"]');
  const postId = form.dataset.postId;
  if (!textarea || !postId) return;
  addComment(postId, textarea.value);
  textarea.value = '';
});

renderPosts();
