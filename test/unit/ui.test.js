/**
 * @jest-environment jest-environment-jsdom-sixteen
 */

import { loadChunk, render, makeComponent } from '../../client/src/core/components.mjs';
import bookServices from '../../client/src/services/book.mjs'

// --- Core
test('Simple render template ', () => {
    const result = render({ template: 'hola' });
    expect(result).toBe('hola');
})

test('Props render template ', () => {
    const result = render({ template: '{{props.name}}' }, { name: 'Rodrigo' });
    expect(result).toBe('Rodrigo');
})

test('Make component with template and without props', () => {
    const Comp = makeComponent('my-comp', {
        template: 'Hola'
    });

    const comp = new Comp();
    document.body.appendChild(comp);

    expect(comp.innerHTML).toBe('Hola');
});

test('Make component with template and with props', () => {
    const Comp = makeComponent('my-comp-with-props', {
        props: { name: String },
        template: '{{props.name}}'
    });

    const comp = new Comp({ name: 'Rodrigo' });
    document.body.appendChild(comp);

    expect(comp.getAttribute('name')).toBe('Rodrigo');
    expect(comp.innerHTML).toBe('Rodrigo');
})

test('Make component with render function', () => {
    const Comp = makeComponent('my-comp-render', {
        render: (props) => 'name'
    });

    const comp = new Comp();
    document.body.appendChild(comp);

    expect(comp.innerHTML).toBe('name');
})

test('Make component with render function and props', () => {
    const Comp = makeComponent('my-comp-render-props', {
        props: { name: String },
        render: (props) => props.name
    });

    const comp = new Comp({ name: 'Rodrigo' });
    document.body.appendChild(comp);

    expect(comp.innerHTML).toBe('Rodrigo');
});

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
