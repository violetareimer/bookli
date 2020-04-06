import { initCore } from './core/index.mjs';
import { debounce } from './core/utils.mjs';
import BookServices from './services/book.mjs';

let $bookList;
let $searchBox;
let Bookli;

initCore().then(function (_Bookli) {
    $bookList = document.querySelector('.booklist');
    $searchBox = document.querySelector('.search__input');

    Bookli = _Bookli;
    main();
});

async function main() {
    Bookli.books = await BookServices.getAll();

    renderBookList($bookList, Bookli.components.book, Bookli.books);
    $searchBox.addEventListener('input', debounce(handleSearch, 300));
    $bookList.addEventListener('click', onSelectBook);
}

function onSelectBook(e) {
    const $book = e.target.closest('b-book');

    if ($book) {
        $bookList.innerHTML = "";
        $book.classList.add('book--full');
        $bookList.appendChild($book);
    }
}

async function handleSearch() {
    Bookli.books = await BookServices.search($searchBox.value);

    $bookList.innerHTML = "";
    renderBookList($bookList, Bookli.components.book, Bookli.books);
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
