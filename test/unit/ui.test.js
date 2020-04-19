/**
 * @jest-environment jest-environment-jsdom-sixteen
 */

import bookServices from '../../client/js/book-service.js'

function makeFakeJSONFetch({ success, result }) {
    return function () {
        return new Promise((resolve, reject) => {
            const fakeJSON = {
                json: () => new Promise(resolve => {
                    setTimeout(() => {
                        resolve(result)

                    }, 10);
                })
            };

            setTimeout(
                () => success ? resolve(fakeJSON) : reject(result),
                30
            )
        });
    }
}

// app
test('Fetch all books', async () => {
    // fetch mock
    window.fetch = makeFakeJSONFetch({ success: true, result: [{ id: 1 }] })

    const books = await bookServices.getAll();

    expect(Array.isArray(books)).toBe(true);
    expect(books[0].id).toBe(1);
})

test('Find books', async () => {
    // fetch mock
    window.fetch = makeFakeJSONFetch({ success: true, result: [{ id: 1 }] })

    const books = await bookServices.search();

    expect(Array.isArray(books)).toBe(true);
    expect(books[0].id).toBe(1);
})
