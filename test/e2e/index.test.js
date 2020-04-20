const fixture = require('../../scripts/fixture.js');
const startServer = require('../../server/src/index.js')
const BookModels = require('../../server/src/models/book.js');

const BASE_URL = 'http://localhost:3000';
let server;

before(async (browser, done) => {
    server = await startServer();
    done();
});

beforeEach(async (browser, done) => {
    await BookModels.Book.sync({ force: true });
    await fixture.initBooks();
    done();
});

after((browser) => {
    server.close();
});


describe("Home Test", () => {
    test('Deberia tener de titulo Bookli', (browser) => {
        browser.url(BASE_URL)
            .waitForElementVisible('body')
            .assert.titleContains('Bookli')
    });

    test('Deberia mostrar el logo de Bookli', (browser) => {
        browser.url(BASE_URL)
            .waitForElementVisible('body')
            .waitForElementVisible('.brand__logo')
            .assert.attributeContains('.brand__logo', 'src', '/assets/logo.svg')
    });

    test('Deberia mostrar la lista de libros', (browser) => {
        browser.url(BASE_URL)
            .waitForElementVisible('body')
            .waitForElementVisible('.booklist .book')
            .assert.elementPresent('.booklist .book')
    });

    test('Deberia poder encontrar un libro por titulo', (browser) => {
        browser.url(BASE_URL)
            .waitForElementVisible('body')
            .waitForElementVisible('.booklist .book')
            .click('.search__input')
            .keys('Operaci')
            .pause(400)
            .expect.elements('.booklist .book').count.to.equal(1)
    });

    test('Deberia mostrar un mensaje cuando no se encuentra un libro', (browser) => {
        browser.url(BASE_URL)
            .waitForElementVisible('body')
            .waitForElementVisible('.booklist .book')
            .click('.search__input')
            .keys('No existe')
            .pause(400)

        browser.expect.elements('.booklist .book').count.to.equal(0)
        browser.expect.element('.booklist.booklist--empty p')
            .text.to.equal('Hmmm... Parece que no tenemos el libro que buscas.\nProba con otra busqueda.');
    });
})

describe('Detail view', () => {

    test('Deberia mostrar informacion extra en la vista de detalle', (browser) => {
        browser.url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('.book__extra-info')

        browser.expect.element('.book__extra-info p:nth-child(1)')
            .text.to.equal('Se publicó en el año 1949 por la editorial Editorial Losada.');

        browser.expect.element('.book__extra-info p:nth-child(2)')
            .text.to.equal('Es un libro perteneciente a los géneros Cuentos, Fantástico.');
    });

    test('Deberia mostrar boton para agregar a lista de lectura', (browser) => {
        browser.url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('.book__actions .btn.btn-primary')

        browser.expect.element('.book__actions .btn.btn-primary')
            .text.to.equal('Agregar a lista de lectura');
    });

    test('Deberia agregar libro a lista de lectura cuando se hace click en el boton para agregar a lista de lectura', (browser) => {
        browser.url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('.book__actions .btn.btn-primary')

        browser.click('.book__actions .btn.btn-primary')
            .pause(400)
            .waitForElementNotPresent('.book__actions .btn.btn-primary');
    });
})
