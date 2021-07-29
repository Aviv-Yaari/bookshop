const booksStorage = _getBooksFromStorage();
let gBooks = booksStorage && booksStorage.length ? booksStorage : createDummyBooks();
let gSortDirection = 1;
let gPage = 0;
const PAGE_SIZE = 12;

function getBook(id) {
  return gBooks.find((book) => book.id === id);
}

function createBook(title, price, imgUrl) {
  const fixedTitle = title.charAt(0).toUpperCase() + title.slice(1);
  gBooks.unshift({ id: utils.makeId(), title: fixedTitle, price, imgUrl });
  _saveBooksToStorage();
}

function deleteBook(id) {
  const bookIndex = _getBookIndex(id);
  gBooks.splice(bookIndex, 1);
  _saveBooksToStorage();
}

function getAllBooks() {
  return gBooks.slice(gPage * PAGE_SIZE, gPage * PAGE_SIZE + PAGE_SIZE);
}

function getPagesNum() {
  return Math.ceil(gBooks.length / PAGE_SIZE);
}

function getCurrentPage() {
  return gPage;
}

function changePage(pageNum) {
  gPage = pageNum;
}

function updateBook(id, cat, newVal) {
  const bookIndex = _getBookIndex(id);
  gBooks[bookIndex][cat] = newVal;
  _saveBooksToStorage();
}
function _getBookIndex(id) {
  return gBooks.findIndex((book) => book.id === id);
}

function sortByKey(key) {
  debugger;
  gBooks.sort((a, b) => (a[key] < b[key] ? gSortDirection : gSortDirection * -1));
  gSortDirection = gSortDirection * -1;
}

function _saveBooksToStorage() {
  storage.saveToStorage('books', gBooks);
}

function _getBooksFromStorage() {
  return storage.loadFromStorage('books');
}

const service = {
  createBook,
  getAllBooks,
  deleteBook,
  updateBook,
  getBook,
  sortByKey,
  getPagesNum,
  changePage,
  getCurrentPage,
};
