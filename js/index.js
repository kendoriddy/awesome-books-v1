const list = document.querySelector('.book-list');
const form = document.getElementById('form');

// Initializing books

let books = [];

// Error Message
function errorMsg(message) {
  document.querySelector('.warning').textContent = message;
  setTimeout(() => {
    document.querySelector('.warning').textContent = '';
  }, 2000);
}
