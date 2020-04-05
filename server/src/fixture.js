const BookModel = require('./models/book.js')

const initBooks = () => {
    BookModel.Book.sync({ force: true })
        .then(() =>
            BookModel.Book.create({
                title: 'El Aleph',
                synopsis: 'Este volumen reúne dieciocho relatos de Jorge Luis Borges, entre ellos quizá los más elogiados y repetidamente citados. Tanto «El inmortal» como «Los teólogos», «Deutsches Requiem» y «La espera» muestran las posibilidades expresivas de la «estética de la inteligencia» borgiana, inimitable fusión de mentalidad matemática, profundidad metafísica y captación poética del mundo.',
                year: 1949,
                publisher: 'Editorial Losada',
                isbn: '9788499089515',
                genres: ['Cuentos', 'Fantástico'],
                authors: ['Jorge Luis Borges'],
                cover: '/server/assets/el-aleph.jpg'
            })
        )
        .then(() =>
            BookModel.Book.create({
                title: 'Operación Masacre',
                synopsis: 'En el contexto del fallido intento de la Revolución de Valle de 1956 contra el régimen militar argentino se produjo una masacre clandestina de opositores. Tras escuchar el testimonio de uno de los supervivientes, Rodolfo Walsh se lanzó a una febril investigación que le obligó a adoptar una identidad falsa.',
                year: 1958,
                publisher: 'Ediciones Sigla',
                isbn: '9789505153527',
                genres: ['No ficción'],
                authors: ['Rodolfo Walsh'],
                cover: '/server/assets/operacion-masacre.jpg'
            })
        )
        .then(() =>
            BookModel.Book.create({
                title: 'The Pragmatic Programmer',
                synopsis: 'Straight from the programming trenches, The Pragmatic Programmer cuts through the increasing specialization and technicalities of modern software development to examine the core process--taking a requirement and producing working, maintainable code that delights its users. It covers topics ranging from personal responsibility and career development to architectural techniques for keeping your code flexible and easy to adapt and reuse.',
                year: 1999,
                publisher: 'Addison-Wesley Professional',
                isbn: '9780201616224',
                genres: ['Educación', 'Tecnología', 'Programación'],
                authors: ['David Thomas', 'Andrew Hunt'],
                cover: '/server/assets/pragmatic-programmer.jpg'
            })
        )
        .then(() =>
            BookModel.Book.create({
                title: 'Code Complete: A Practical Handbook of Software Construction',
                synopsis: 'Widely considered one of the best practical guides to programming, Steve McConnell’s original CODE COMPLETE has been helping developers write better software for more than a decade. Now this classic book has been fully updated and revised with leading-edge practices—and hundreds of new code samples—illustrating the art and science of software construction. Capturing the body of knowledge available from research, academia, and everyday commercial practice, McConnell synthesizes the most effective',
                year: 2004,
                publisher: 'Microsoft Press',
                isbn: '9780735619678',
                genres: ['Educación', 'Tecnología', 'Programación'],
                authors: ['Steve McConnell'],
                cover: '/server/assets/code-complete.jpg'
            })
        )
}

initBooks()