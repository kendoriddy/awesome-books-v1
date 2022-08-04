let books = JSON.parse(localStorage.getItem('books'));

//  Error Message
function errorMsg(message) {
  document.querySelector('.warning').textContent = message;
  setTimeout(() => {
    document.querySelector('.warning').textContent = '';
  }, 2000);
}

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  addBook() {
    const { title, author, id } = this;
    const bookList = { title, author, id };
    books = JSON.parse(localStorage.getItem('books'));
    if (title === '' || author === '') {
      errorMsg('All fields are required');
    } else if (books !== null) {
      books.push(bookList);
      localStorage.setItem('books', JSON.stringify(books));
      books = JSON.parse(localStorage.getItem('books'));
    } else {
      books = [];
      books.push(bookList);
      localStorage.setItem('books', JSON.stringify(books));
      books = JSON.parse(localStorage.getItem('books'));
    }
  }

  remove() {
    const { id } = this;
    books = books.filter((book) => {
      if (book.id === id) {
        return false;
      }
      return true;
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Display books
function showBooks(title, author, id) {
  const bookList = document.querySelector('.book-list');
  const items = document.createElement('li');
  items.innerHTML = `
      <div class="item-list"><h3><q>${title}</q> by ${author}</h3></div>
      `;
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove-btn';
  items.append(removeBtn);
  bookList.appendChild(items);

  removeBtn.addEventListener('click', () => {
    const book = new Book(title, author, id);
    id = removeBtn.id;
    book.remove();
    items.remove();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 100);
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    const book = new Book(title, author, id);
    book.addBook();
    if (title && author) {
      showBooks(book.title, book.author, book.id);
    }
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  });
});

// Appending book to empty object
if (books !== null) {
  books.forEach((book) => {
    showBooks(book.title, book.author, book.id);
  });
}

// Handle page navigation

function handlePageChange(e) {
  const navLinks = document.getElementsByClassName('nav-link');
  for (let i = 0; i < navLinks.length; i += 1) {
    navLinks[i].style.color = '';
  }

  if (e.target.classList.contains('list')) {
    document.querySelector('#book-display').style.display = 'block';
    document.querySelector('#add-book').style.display = 'none';
    document.querySelector('#contact').style.display = 'none';
  }
  if (e.target.classList.contains('addBook')) {
    document.querySelector('#book-display').style.display = 'none';
    document.querySelector('#add-book').style.display = 'block';
    document.querySelector('#contact').style.display = 'none';
  }
  if (e.target.classList.contains('contactInfo')) {
    document.querySelector('#book-display').style.display = 'none';
    document.querySelector('#add-book').style.display = 'none';
    document.querySelector('#contact').style.display = 'block';
  }
}

document.addEventListener('click', (e) => {
  handlePageChange(e);
});