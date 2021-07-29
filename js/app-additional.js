function onPageLoad() {
  renderBooks();
}

function onCreateClick() {
  const elCreateForm = document.querySelector('.create-form');
  elCreateForm.classList.toggle('hidden');
}

function onBookKeypress(ev, id, cat, newVal) {
  if (ev.key === 'Enter') {
    ev.preventDefault();
    onBookEdit(id, cat, newVal);
    ev.target.blur();
  }
}

function onEditClick(ev) {
  ev.stopPropagation();
}

function onSort(key) {
  service.sortByKey(key);
  renderBooks();
}

function renderBooks() {
  const elContainer = document.querySelector('.books-container');
  let strHTML = `<div class="book-header" onclick="onSort('id')">Id</div>
                 <div class="book-header" onclick="onSort('title')">Title</div>
                 <div class="book-header" onclick="onSort('price')">Price</div>
                 <div class="book-header">Actions</div>`;

  const books = service.getAllBooks();
  const booksHTML = books.map((book) => {
    return `<div class="book-row" onclick="onBookClick('${book.id}')">
      <div class="book-info">${book.id}</div>
      <div onclick="onEditClick(event)" contenteditable="true" onkeypress="onBookKeypress(event, '${book.id}', 'title', this.textContent)" 
           onfocusout="onBookEdit('${book.id}', 'title', this.textContent)" class="book-info">${book.title}</div>
      <div onclick="onEditClick(event)" contenteditable="true" onkeypress="onBookKeypress(event, '${book.id}', 'price', this.textContent)" 
           onfocusout="onBookEdit('${book.id}', 'price', this.textContent)" class="book-info">${book.price}</div>
      <div class="book-actions">
      <button onClick="onBookDelete('${book.id}', event)">Delete</button>
      </div>
      </div>
    `;
  });
  strHTML += booksHTML.join('');
  elContainer.innerHTML = strHTML;
}

function onPageChange(diff) {
  service.changePage(diff);
  renderBooks();
}

function renderPages() {
  // const elPagesContainer = document.querySelector('.pages-container');
  // const pages = new Array(service.getPagesNum());
  // let strHTML = pages.map(page, index => {
  //   return '<button></button>'
  // } )
  // pages.map()
  // elPagesContainer.innerHTML;
}
