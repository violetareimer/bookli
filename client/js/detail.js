import { getRefs, render } from './utils.js';
import bookService from './book-service.js';

const refs = getRefs();

function getBookId(str) {
    const result = /detail\/(\d+)/.exec(str);

    if (result) {
        return result[1]
    }
}

function renderBook(book) {
    render('book.html', {
        book: book,
        detail: true
    }, refs.main);
}

function init() {
    const bookId = getBookId(window.location.pathname);
    bookService.get(bookId).then(renderBook);
}

init();
