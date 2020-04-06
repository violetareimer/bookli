import { initComponents } from './core/index.mjs';
import { debounce } from './core/utils.mjs';
import BookServices from './services/book.mjs';

let $bookList;
let $searchBox;
let components;
let books;

async function main() {
    $bookList = document.querySelector('.booklist');
    $searchBox = document.querySelector('.search__input');
    components = await initComponents();
    books = await BookServices.getAll();

    renderBookList($bookList, components.book, books);

    $searchBox.addEventListener('input', debounce(handleSearch, 300));
}

async function handleSearch() {
    books = await BookServices.search($searchBox.value);
    $bookList.innerHTML = "";
    renderBookList($bookList, components.book, books);
}

// TODO: refactor a componente
function renderBookList($container, BookComponent, books) {
    $container.classList.remove('booklist--empty');

    if (books.length) {
        const fragment = document.createDocumentFragment();
        books.forEach(function (book) {
            const bookComponent = new BookComponent(book);
            fragment.appendChild(bookComponent);
        });

        $container.appendChild(fragment);
    } else {
        $container.classList.add('booklist--empty');
        $container.innerHTML = `
            <img src="/assets/empty.svg" alt="">
            <p>Hmmm... Parece que no tenemos el libro que buscas.<br>Proba con otra busqueda.</p>
        `;
    }
}

main();
