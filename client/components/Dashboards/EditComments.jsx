const comments = [];

function replaceEmojis(comment) {
//EMOJIS
  const emojiMap = {
    ':)': '😊',
    ':D': '😃',
    ':(': '😞',
    '<3': '❤️',
    ':thumbsup:': '👍',
    ':thumbsdown:': '👎',
    ':chef:': '👩‍🍳',
    ':cook:': '👨‍🍳',
    ':pizza:': '🍕',
    ':hamburger:': '🍔',
    ':spaghetti:': '🍝',
    ':cake:': '🍰'
  };

  for (const [emojiKey, emojiValue] of Object.entries(emojiMap)) {
    comment = comment.replace(new RegExp(escapeRegExp(emojiKey), 'g'), emojiValue);
  }

  return comment;
}

//ALLOW CHARACTERS
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function postComment(commentInput) {
 //IF COMMENT SECTION IS EMPTHY
  if (commentInput.trim() === '') {
    alert('Please enter a comment.');
    return;
  }
//COMMENT CHARACTER LIMIT
  const maxCharacters = 100;
  if (commentInput.length > maxCharacters) {
    alert(`Comment exceeds the ${maxCharacters}-character limit.`);
    return;
  }

//CURRENT TIMESTAMP
  const timestamp = new Date().toLocaleString();

//EMOJI SUPPORT
  const processedComment = replaceEmojis(commentInput);

//COMMENT AND TIMESTAMP ADDED
  comments.push({
    timestamp,
    comment: processedComment
  });

  displayComments();
}

function displayComments() {
  const commentsContainer = document.getElementById('comments-container');

  //CLEARING PREVIOUS COMMENTS
  commentsContainer.innerHTML = '';


  comments.forEach((comment, index) => {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
      <p>${comment.comment}</p>
      <small>Posted at ${comment.timestamp}</small>
      <button onclick="editComment(${index})">Edit</button>
      <button onclick="deleteComment(${index})">Delete</button>
    `;
    commentsContainer.appendChild(commentDiv);
  });
}

function editComment(index) {
  const updatedComment = prompt('Edit your comment:', comments[index].comment);

  if (updatedComment !== null) {
    comments[index].comment = replaceEmojis(updatedComment);

    displayComments();
  }
}

function deleteComment(index) {
  const confirmDelete = confirm('Are you sure you want to delete this comment?');

//REMOVING COMMENT
  if (confirmDelete) {
    comments.splice(index, 1);

    displayComments();
  }
}

displayComments();