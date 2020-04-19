const Sequelize = require('sequelize')

const Op = Sequelize.Op

const db = require('../db.js')

const AVAILABLE = 'AVAILABLE'

const READING = 'READING'

const FINISHED = 'FINISHED'

const Book = db.define('Book', {
	// attributes
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	synopsis: {
		type: Sequelize.STRING
	},
	year: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	publisher: {
		type: Sequelize.STRING,
		allowNull: false
	},
	isbn: {
		type: Sequelize.STRING,
		allowNull: false
	},
	genres: {
		type: Sequelize.JSON
	},
	authors: {
		type: Sequelize.JSON,
		allowNull: false
	},
	cover: {
		type: Sequelize.STRING
	},
	status: {
		type: Sequelize.ENUM,
		allowNull: false,
		values: [AVAILABLE, READING, FINISHED]
	}
}, { tableName: 'Book' })

const getAllBooks = (filter) => {
	let where = {}

	if (filter) {
		const like = {
			[Op.like]: '%' + filter + '%'
		}

		where = {
			[Op.or]: [
				{
					title: like
				},
				{
					isbn: like
				},
				{
					publisher: like
				}
			]
		}
	}

	return Book.findAll({
		attributes: {
		    exclude: ['createdAt', 'updatedAt']
		},
		where: where
	})
}

const createBook = (data) => {
	if (!data.hasOwnProperty('status')) {
		data = {...data, status: AVAILABLE}
	}

	return Book.create(data)
}

const getBook = (id) => Book.findOne({where: {id: id}})

const startBook = (id) => {
	return Book.findOne({where: {id: id}}).then(book => {
		if (book != null) {
			return book.update({status: READING})
		}
		return null
	})	
}

const BookModel = {
	Book: Book,
	statusAvailable: AVAILABLE,
	statusReading: READING,
	statusFinished: FINISHED,
	getAll: getAllBooks,
	create: createBook,
	get: getBook,
	start: startBook
}

module.exports = BookModel
