const express = require('express')
const BookModel = require('../models/book')
const router = express.Router()

router.get('/', function (req, res) {
	BookModel.getAll().then((books) =>
		res.status(200).send(books)
	).catch(_ => res.status(500).send('Error al obtener los libros'))
})

router.get('/:id', function (req, res) {
	BookModel.get(req.params.id).then((book) => {
		if (book == null) {
			res.status(404).send('El libro ' + req.params.id + ' no fue encontrado')
		} else
			res.status(200).send(book)
	}).catch(_ => res.status(500).send('Error al obtener libro'))
})

module.exports = router
