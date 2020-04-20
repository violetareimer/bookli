const express = require('express')
const BookModel = require('../models/book')
const router = express.Router()


/**
 * Endpoint para obtener todos los libros.
 * Recibe el filtro para la búsqueda en req.query.query
 *
 */
router.get('/', function (req, res) {
	BookModel.getAll(req.query.query).then((books) =>
		res.status(200).send(books)
	).catch(_ => {
		console.log(_)
		res.status(500).send('Error al obtener los libros')
	})
})

/**
 * Endpoint para obtener un libro por id.
 * Recibe el id en req.params.id
 *
 */
router.get('/:id', function (req, res) {
	BookModel.get(req.params.id).then((book) => {
		if (book == null) {
			res.status(404).send('El libro ' + req.params.id + ' no fue encontrado')
		} else
			res.status(200).send(book)
	}).catch(_ => res.status(500).send('Error al obtener libro'))
})

/**
 * Endpoint para cambiar el estado de un libro a READING.
 * Recibe el id en req.params.id
 *
 */
router.put('/:id/start', function (req, res) {
	BookModel.start(req.params.id).then((book) => {
		if (book == null) {
			res.status(404).send('El libro ' + req.params.id + ' no fue encontrado')
		} else
			res.status(200).send(book)
	}).catch(_ => res.status(500).send('Error al obtener libro'))
})

module.exports = router
