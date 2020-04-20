import { getRefs, debounce, render } from './utils.js';
import bookService from './book-service.js';

const refs = getRefs();

async function searchBook(e) {
    const searchTerm = e.target.value;
    const books = await bookService.search(searchTerm);
    renderBooks(books);
}

function renderBooks(books) {
    render('booklist.html', { books: books }, refs.main);
}

function init() {
    bookService.getAll().then(renderBooks);

    const debounceSearch = debounce(searchBook, 400);

    refs.search.addEventListener('input', debounceSearch);
}

init();
