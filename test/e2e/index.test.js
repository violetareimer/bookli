const fixture = require('../../scripts/fixture.js');
const startServer = require('../../server/src/index.js');
const BookModels = require('../../server/src/models/book.js');

let BASE_URL;
let server;

before(async (browser, done) => {
    server = await startServer();

    BASE_URL = `http://localhost:${server.address().port}`;
    done();
});

beforeEach(async (browser, done) => {
    await BookModels.Book.sync({ force: true });
    await fixture.initBooks();
    done();
});

after(() => {
    server.close();
});

describe('Home Test', () => {
    test('Deberia tener de titulo Bookli', browser => {
        browser
            .url(BASE_URL)
            .waitForElementVisible('body')
            .assert.titleContains('Bookli');
    });

    test('Deberia mostrar el logo de Bookli', browser => {
        browser
            .url(BASE_URL)
            .waitForElementVisible('body')
            .waitForElementVisible('.brand__logo')
            .assert.attributeContains(
                '.brand__logo',
                'src',
                '/assets/logo.svg'
            );
    });

    test('Deberia mostrar la lista de libros', browser => {
        browser
            .url(BASE_URL)
            .waitForElementVisible('body')
            .waitForElementVisible('.booklist .book')
            .assert.elementPresent('.booklist .book');
    });

    test('Deberia poder encontrar un libro por titulo', browser => {
        browser
            .url(BASE_URL)
            .waitForElementVisible('body')
            .waitForElementVisible('.booklist .book')
            .click('.search__input')
            .keys('Operaci')
            .pause(400)
            .expect.elements('.booklist .book')
            .count.to.equal(1);
    });

    test('Deberia mostrar un mensaje cuando no se encuentra un libro', browser => {
        browser
            .url(BASE_URL)
            .waitForElementVisible('body')
            .waitForElementVisible('.booklist .book')
            .click('.search__input')
            .keys('No existe')
            .pause(400);

        browser.expect.elements('.booklist .book').count.to.equal(0);
        browser.expect
            .element('.booklist.booklist--empty p')
            .text.to.equal(
                'Hmmm... Parece que no tenemos el libro que buscas.\nProba con otra busqueda.'
            );
    });


    test('El botón debería redireccionar a Amazon', browser => {
        browser
            .url(BASE_URL)
            .waitForElementVisible('body')
            .waitForElementVisible('#btncomprar')

            .assert.attributeContains(
                '#btncomprar',
                'href',
                'https://www.amazon.es/comprar-libros-espa%C3%B1ol/b?ie=UTF8&node=599364031'
            );
    });
/* TESTEO FEATURE #1 */

    test('El logo de la pagina deberia redireccionar a la pagina principal', browser => {
        browser
            .url(BASE_URL)
            .waitForElementVisible('body')
            .waitForElementVisible('.brand__name')

            .assert.attributeContains(
                '.brand__name a',
                'href',
                '/'
            );
    });
/* FIN TEST FEATURE #1 */
/* TESTEO FEATURE #2 */

test('El opacity de las cards al pasar el mouse por encima (hover) debe ser de 0,5', browser => {
    browser
        .url(BASE_URL)
        .waitForElementVisible('body')
        .waitForElementVisible('a.book-link')

        browser.moveToElement('a.book-link:first-child',10,10).perform();
        browser.expect.element('a.book-link').to.have.css('opacity').which.equals('0.5');
});
/* FIN TEST FEATURE #2 */
    
/*TESTEO COLOR BORDER BOOK*/
test('El color del borde de las cards debe ser purpura, (255, 0, 255) en RGB', browser => {
    browser
        .url(BASE_URL)
        .waitForElementVisible('body')
        .waitForElementVisible('.booklist')

        browser.expect.element('.book').to.have.css('border-color').which.equals('rgb(255, 0, 255)');
});

/*FIN TESTEO COLOR BORDER BOOK*/
});

describe('Detail view', () => {
    test('Deberia mostrar boton para agregar a lista de lectura', browser => {
        browser
            .url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('.book__actions [data-ref=addToList]');

        browser.expect
            .element('.book__actions [data-ref=addToList]')
            .text.to.equal('Empezar a leer');
    });

    test('Deberia mostrar boton para remover libro de la lista de lectura si el libro es parte de la lista de lectura', browser => {
        browser
            .url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('.book__actions [data-ref=addToList]');

        browser
            .click('.book__actions [data-ref=addToList]')
            .pause(1000)
            .waitForElementVisible('.book__actions [data-ref=removeFromList]');

        browser.expect
            .element('.book__actions [data-ref=removeFromList]')
            .text.to.equal('Dejar de leer');
    });

    test('Deberia poder remover libro de la lista de lectura', browser => {
        browser
            .url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('.book__actions [data-ref=addToList]');

        browser
            .click('.book__actions [data-ref=addToList]')
            .pause(400)
            .waitForElementVisible('.book__actions [data-ref=removeFromList]');

        browser.expect
            .element('.book__actions [data-ref=removeFromList]')
            .text.to.equal('Dejar de leer');

        browser
            .click('.book__actions [data-ref=removeFromList]')
            .pause(400)
            .waitForElementVisible('.book__actions [data-ref=addToList]');

        browser.expect
            .element('.book__actions [data-ref=addToList]')
            .text.to.equal('Empezar a leer');
    });

    test('Deberia poder finalizar un libro de la lista de lectura', browser => {
        browser
            .url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('.book__actions [data-ref=addToList]');

        browser
            .click('.book__actions [data-ref=addToList]')
            .pause(400)
            .waitForElementVisible('.book__actions [data-ref=removeFromList]');

        browser.expect
            .element('.book__actions [data-ref=addToFinish]')
            .text.to.equal('Lo termine!');

        browser
            .click('.book__actions [data-ref=addToFinish]')
            .pause(400)
            .waitForElementVisible(
                '.book__actions [data-ref=removeFromFinish]'
            );

        browser.expect
            .element('.book__actions [data-ref=removeFromFinish]')
            .text.to.equal('Volver a leer');
    });

    test('Deberian aparecer los botones "Dejar de leer" y "Lo termine!" al hacer click en el boton "Volver a leer"', browser => {
        browser
            .url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('.book__actions [data-ref=addToList]');

        browser
            .click('.book__actions [data-ref=addToList]')
            .pause(400)
            .waitForElementVisible('.book__actions [data-ref=addToFinish]');

        browser
            .click('.book__actions [data-ref=addToFinish]')
            .pause(400)
            .waitForElementVisible('.book__actions [data-ref=removeFromFinish]')
            .click('.book__actions [data-ref=removeFromFinish]')
            .pause(400);
            
        browser.expect.element('.book__actions [data-ref=removeFromList]').text.to.equal('Dejar de leer');
        browser.expect.element('.book__actions [data-ref=addToFinish]').text.to.equal('Lo termine!');
    });

//test violeta 
test('volver a la pagina principal', browser => {
    browser
    .url(BASE_URL + '/detail/1')
    .waitForElementVisible('body')
    .waitForElementVisible('#volverinicio > a:nth-child(1)')
    .click('#volverinicio > a:nth-child(1)')
    .pause(400);

browser.expect.url().to.equal(BASE_URL + '/');
    

});
});
