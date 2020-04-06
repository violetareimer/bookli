const BASE_URL = 'http://localhost:3000/api/v1';

async function getAll() {
    const resp = await fetch(`${BASE_URL}/books`)
    return await resp.json();
}

export default {
    getAll
}
