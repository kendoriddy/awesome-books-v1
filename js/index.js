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

function showBooks(id, title, author) {
    const items = document.createElement('div');
    items.innerHTML = `
      <p>${title}</p>
      <p>${author}</p>
      `;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.id = id;
    const itemLine = document.createElement('hr');
    items.append(removeBtn, itemLine);
    removeBtn.addEventListener('click', () => {
      books = books.filter((book) => {
        if (book.id === id) {
          return false;
        }
        return true;
      });
      localStorage.setItem('books', JSON.stringify(books));
      items.remove();
    });
    list.appendChild(items);
  }