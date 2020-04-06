describe("Home Test", () => {
    const BASE_URL = 'http://localhost:3000/';

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
