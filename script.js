// Book collection array
let books = [];

// Add or Update Book
document.getElementById('book-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('book-id').value.trim();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const status = document.getElementById('status').value;

    if (!id || !title || !author || !genre) {
        alert('All fields are required.');
        return;
    }

    const existingIndex = books.findIndex(book => book.id === id);

    if (existingIndex > -1) {
        // Update existing book
        books[existingIndex] = { id, title, author, genre, status };
        alert('Book details updated successfully!');
    } else {
        // Add new book
        books.push({ id, title, author, genre, status });
        alert('Book added successfully!');
    }

    displayBooks();
    this.reset();
});

// Display Books in Table
function displayBooks() {
    const tableBody = document.getElementById('book-table');
    tableBody.innerHTML = '';

    books.forEach((book, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.status}</td>
            <td>
                <button onclick="editBook(${index})">Edit</button>
                <button onclick="deleteBook(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Edit Book
function editBook(index) {
    const book = books[index];

    document.getElementById('book-id').value = book.id;
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('genre').value = book.genre;
    document.getElementById('status').value = book.status;
}

// Delete Book
function deleteBook(index) {
    if (confirm('Are you sure you want to delete this book?')) {
        books.splice(index, 1);
        displayBooks();
    }
}

// Search Book
function searchBook() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.id.toLowerCase().includes(query) || 
        book.title.toLowerCase().includes(query)
    );

    if (filteredBooks.length === 0) {
        alert('No book found.');
    } else {
        books = filteredBooks;
        displayBooks();
    }
}

// Exit System
function exitSystem() {
    if (confirm('Are you sure you want to exit the system?')) {
        window.close();
    }
}
