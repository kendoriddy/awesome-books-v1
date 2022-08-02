/* eslint-disable linebreak-style */
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

// Display books function
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

// Add new book

function addBook(title, author) {
  const id = Date.now();

  const bookEntry = {
    id,
    title,
    author,
  };

  if (title === '' || author === '') {
    errorMsg('All fields are required');
  } else {
    books.push(bookEntry);

    localStorage.setItem('books', JSON.stringify(books));

    showBooks(bookEntry.id, bookEntry.title, bookEntry.author);
  }
}

const myBook = JSON.parse(localStorage.getItem('books'));

if (myBook) {
  books = myBook;
}

books.forEach((book) => {
  showBooks(book.id, book.title, book.author);
});

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title');

    const author = document.getElementById('author');

    // if (title.value && author.value) {

    addBook(title.value, author.value);

    // clear input

    title.value = '';

    author.value = '';
  });
});
