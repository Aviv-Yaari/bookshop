// Create:
function onBookAdd(ev, elForm) {
  ev.preventDefault();
  const title = ev.target.title.value;
  const price = ev.target.price.value;
  const imgUrl = ev.target.imgUrl.value;
  if (!title || !price) return;
  service.createBook(title, price, imgUrl);
  renderBooks();
  elForm.reset();
  elForm.classList.add('hidden');
}

// Read:
function onBookClick(id) {
  const elOverlay = document.querySelector('.overlay');
  elOverlay.classList.remove('hidden');
  renderBookModal(id);
}

// Update:
function onBookEdit(id, cat, newValue) {
  service.updateBook(id, cat, newValue);
}

function onRate(rate, id) {
  service.updateBook(id, 'rating', rate);
  const book = service.getBook(id);
  renderModalRating(book);
}

// Delete:
function onBookDelete(id, ev) {
  ev.stopPropagation();
  service.deleteBook(id);
  renderBooks();
}
