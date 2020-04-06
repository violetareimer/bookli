describe("Home Test", () => {
    test('Deberia tener de titulo Bookli', (browser) => {
        browser.url('http://localhost:3000/')
            .waitForElementVisible('body')
            .assert.titleContains('Bookli');
    })

    test('Deberia mostrar el logo de Bookli', (browser) => {
        browser.url('http://localhost:3000/')
            .waitForElementVisible('body')
            .waitForElementVisible('.brand__logo')
            .assert.attributeContains('.brand__logo', 'src', '/assets/logo.svg');
    })

    test('Deberia mostrar la lista de libros', (browser) => {
        browser.url('http://localhost:3000/')
            .waitForElementVisible('body')
            .waitForElementVisible('.booklist .book')
            .assert.elementPresent('.booklist .book');
    })
})
