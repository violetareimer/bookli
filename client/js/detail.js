import { getRefs, render } from './utils.js';
import bookService from './book-service.js';

const refs = getRefs();

const state = {
    book: null
};

/**
 * Obtiene el id de un libro a partir de un path
 **/
function getBookId(str) {
    const result = /detail\/(\d+)/.exec(str);

    if (result) {
        return result[1]
    }
}

/**
 * Agrega un libro a la lista de lectura
 *
 * Actualiza el libro y la UI
 **/
async function addToReaddingList() {
    await bookService.startBook(state.book.id);
    state.book = await bookService.get(state.book.id);

    renderBook(state.book);
}

/**
 * Actualiza la UI
 **/
function renderBook(book) {
    const bookRefs = render('book.html', {
        book: book,
        detail: true
    }, refs.main);

    if (bookRefs.addToList) {
        bookRefs.addToList.addEventListener('click', addToReaddingList);
    }
}

/**
 * Inicializa la vista
 **/
async function init() {
    const bookId = getBookId(window.location.pathname);
    state.book = await bookService.get(bookId);

    renderBook(state.book);
}

init();
