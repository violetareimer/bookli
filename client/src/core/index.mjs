import { registComponent } from './components.mjs';

export async function initComponents() {
    const book = await registComponent('book');
    const authors = await registComponent('authors');

    return {
        book,
        authors
    }
}

// Inicializa los componentes y los hace global en Bookli
export async function initCore() {
    const Bookli = {
        components: {},
        state: {
            books: []
        }
    };

    Bookli.components = await initComponents();
    return Bookli;
}

export default { initCore }
