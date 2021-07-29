function renderBookModal(id) {
  const book = service.getBook(id);
  const elBookName = document.querySelector('.modal-title');
  const elBookPrice = document.querySelector('.modal-price');
  const elBookImage = document.querySelector('.book-modal img');
  elBookName.textContent = book.title;
  elBookPrice.textContent = 'Price: ' + book.price;
  elBookImage.src = book.imgUrl;
  renderModalRating(book);
}

function renderModalRating(book) {
  const { rating, id } = book;
  const elRating = document.querySelector('.modal-rating');
  const isChecked = ['', '', '', '', ''];
  for (let i = 0; i < 5; i++) {
    if (rating > i) isChecked[i] = 'checked';
  }
  elRating.innerHTML = `<span onclick="onRate(1, '${id}')" data-star:1 class="fa fa-star ${isChecked[0]}"></span>
                <span onclick="onRate(2, '${id}')" data-star:2 class="fa fa-star ${isChecked[1]}"></span>
                <span onclick="onRate(3, '${id}')" data-star:3 class="fa fa-star ${isChecked[2]}"></span>
                <span onclick="onRate(4, '${id}')" data-star:4 class="fa fa-star ${isChecked[3]}"></span>
                <span onclick="onRate(5, '${id}')" data-star:5 class="fa fa-star ${isChecked[4]}"></span>`;
}

function onModalExit() {
  const elOverlay = document.querySelector('.overlay');
  elOverlay.classList.add('hidden');
}

function onBookModalClick(ev) {
  ev.stopPropagation();
}
