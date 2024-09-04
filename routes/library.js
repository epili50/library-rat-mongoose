var express = require('express');
var router = express.Router();

const Book = require('../models/book');
const Author = require('../models/author')

/* GET users listing. */
router.get('/add-author', function (req, res, next) {
  res.render('add-author')
});

router.post('/add-author', async function (req, res) {
  // Iteración 1
  const { firstName, familyName, dateBirth, dateDeath} = req.body;

  await Author.create({
    firstName, 
    familyName, 
    dateBirth, 
    dateDeath
  })

})


router.get('/add-book', async (req, res) => {
  // Recuperar todos los autores de la coleccion Authors
  const authors = {} // TODO: Iteración 2
  res.render('add-book', {
    authors
  })
})

router.post('/add-book', async (req, res) => {

  // ES6. Dentro del objeto req.body existe un campo de nombre 'title', otro 'summary', etc.

  // Iteración 3: NO hay que hacer nada, solo contestar a la pregunta del README.md
  const { title, summary, isbn, author } = req.body;

  const book = new Book({
    title,
    summary,
    isbn,
    author
  })

  const resultado = await book.save();
  res.send(resultado);

})

router.get('/books', async (req, res) => {
  const books = await Book.find(); // Iteración 4

  console.log("Libros a enviar a la vista: ", books);

  res.render('books', {
    books
  })
})

module.exports = router;
