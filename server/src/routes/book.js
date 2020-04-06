const express = require('express')
const BookModel = require('../models/book')
const router = express.Router()

router.get('/', function (req, res) {
	BookModel.getAll(req.query.query).then((books) =>
		res.status(200).send(books)
	).catch(_ => {
		console.log(_)
		res.status(500).send('Error al obtener los libros')
	})
})

module.exports = router
