const BASE_URL = 'http://localhost:3000/api/v1';

async function getAll() {
    const resp = await fetch(`${BASE_URL}/books`);
    return await resp.json();
}

async function search(query) {
    const resp = await fetch(`${BASE_URL}/books?query=${query}`);
    return await resp.json();
}

async function get(id) {
    const resp = await fetch(`${BASE_URL}/books/${id}`)
    return await resp.json();
}

async function startBook(id) {
    const resp = await fetch(`${BASE_URL}/books/${id}/start`, { method: 'PUT' });
    return resp;
}

export default {
    getAll,
    get,
    search,
    startBook
}
