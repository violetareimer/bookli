import { initComponents } from './core/index.mjs';
import BookServices from './services/book.mjs';

const $bookList = document.querySelector('.booklist');

async function initApp() {
    const components = await initComponents();

    const BookComponent = components.book;
    const books = await BookServices.getAll();

    books.forEach(function (book) {
        const comp = new BookComponent(book);
        $bookList.appendChild(comp);
    });
}

initApp();
