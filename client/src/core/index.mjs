import { registComponent } from './components.mjs';

export async function initComponents() {
    const book = await registComponent('book');
    const authors = await registComponent('authors');

    return {
        book,
        authors
    }
}

export default { initComponents }
