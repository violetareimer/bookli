const startServer = require('../../server/src/index.js')
const fetch = require('node-fetch');

let server, baseURL;

beforeAll(async () => {
    server = await startServer();
    baseURL = `http://localhost:${server.address().port}/api/v1`
})

afterAll(() => {
    server.close()
})

test('Se debería iniciar la aplicación sin libros', async () => {
    const URL = `${baseURL}/books`;
    const req = await fetch(URL)
    const books = await req.json()

    expect(books.length).toBe(0)
});
