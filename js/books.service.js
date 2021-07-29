const booksStorage = _getBooksFromStorage();
let gBooks = booksStorage && booksStorage.length ? booksStorage : _createDummyBooks();

function createBook(title, price) {
  gBooks.unshift({ id: utils.makeId(), title, price });
  _saveBooksToStorage();
}

function deleteBook(id) {
  const bookIndex = _getBookIndex(id);
  gBooks.splice(bookIndex, 1);
  _saveBooksToStorage();
}

function getAllBooks() {
  return gBooks;
}

function updateBookTitle(id, newTitle) {
  const bookIndex = _getBookIndex(id);
  gBooks[bookIndex].title = newTitle;
  _saveBooksToStorage();
}

function updateBookPrice(id, newPrice) {
  const bookIndex = _getBookIndex(id);
  gBooks[bookIndex].price = newPrice;
  _saveBooksToStorage();
}

function _getBookIndex(id) {
  return gBooks.findIndex((book) => book.id === id);
}

function _createDummyBooks() {
  return [
    { id: utils.makeId(), title: 'Harry Potter', price: 25.2 },
    { id: utils.makeId(), title: 'The Book Thief', price: 21.21 },
    { id: utils.makeId(), title: 'The Secret', price: 54.87 },
    { id: utils.makeId(), title: 'Percy Jackson', price: 10.02 },
    { id: utils.makeId(), title: 'Lord of the Rings', price: 8.55 },
  ];
}

function _saveBooksToStorage() {
  storage.saveToStorage('books', gBooks);
}

function _getBooksFromStorage() {
  return storage.loadFromStorage('books');
}

const service = { createBook, getAllBooks, deleteBook, updateBookTitle, updateBookPrice };
