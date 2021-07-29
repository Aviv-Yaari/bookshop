function onPageLoad() {
  renderBooks();
}

function onCreateClick() {
  const elCreateForm = document.querySelector('.create-form');
  elCreateForm.classList.toggle('hidden');
}

function onBookAdd(ev, elForm) {
  ev.preventDefault();
  const title = ev.target.title.value;
  const price = ev.target.price.value;
  service.createBook(title, price);
  renderBooks();
  elForm.reset();
  elForm.classList.add('hidden');
}

function onBookDelete(id) {
  service.deleteBook(id);
  renderBooks();
}

function onBookTitleKeypress(ev, id, newTitle) {
  if (ev.key === 'Enter') {
    ev.preventDefault();
    onBookTitleEdit(id, newTitle);
    ev.target.blur();
  }
}

function onBookTitleEdit(id, newTitle) {
  service.updateBookTitle(id, newTitle);
}

function onBookPriceKeypress(ev, id, newPrice) {
  if (ev.key === 'Enter') {
    ev.preventDefault();
    onBookPriceEdit(id, newPrice);
    ev.target.blur();
  }
}

function onBookPriceEdit(id, newPrice) {
  service.updateBookPrice(id, newPrice);
}

function renderBooks() {
  const elContainer = document.querySelector('.books-container');
  let strHTML = `<div class="book-header">Id</div>
                 <div class="book-header">Title</div>
                 <div class="book-header">Price</div>
                 <div class="book-header">Actions</div>`;

  const books = service.getAllBooks();
  const booksHTML = books.map((book) => {
    return `<div class="book-row">
      <div class="book-info">${book.id}</div>
      <div contenteditable="true" onkeypress="onBookTitleKeypress(event, '${book.id}', this.textContent)" 
           onfocusout="onBookTitleEdit('${book.id}', this.textContent)" class="book-info">${book.title}</div>
      <div contenteditable="true" onkeypress="onBookPriceKeypress(event, '${book.id}', this.textContent)" 
           onfocusout="onBookPriceEdit('${book.id}', this.textContent)" class="book-info">${book.price}</div>
      <div class="book-actions">
      <button onClick="onBookDelete('${book.id}')">Delete</button>
      </div>
      </div>
    `;
  });
  strHTML += booksHTML.join('');
  elContainer.innerHTML = strHTML;
}
