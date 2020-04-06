import { initComponents } from './core/index.mjs';
import BookServices from './services/book.mjs';

async function initApp() {
    const $bookList = document.querySelector('.booklist');
    const components = await initComponents();

    const BookComponent = components.book;
    const books = await BookServices.getAll();

    // TODO: refactor a componente
    if (books.length) {
        books.forEach(function (book) {
            const comp = new BookComponent(book);
            $bookList.appendChild(comp);
        });
    } else {
        $bookList.classList.add('booklist--empty');
        $bookList.innerText = "Hmmm... Parece que nuestra libreria esta vacia.";
    }
}

initApp();
