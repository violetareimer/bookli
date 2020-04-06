const Sequelize = require('sequelize')

const db = require('../db.js')

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
	}
}, { tableName: 'Book' })

const getAllBooks = () => Book.findAll({
	attributes: {
	    exclude: ['createdAt', 'updatedAt']
	}
})

const createBook = (data) => Book.create(data)

const BookModel = {
	Book: Book,
	getAll: getAllBooks,
	create: createBook,
}

module.exports = BookModel
