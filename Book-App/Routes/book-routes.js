const express = require('express');
const router = express.Router();
const {addBooks, getBooks,getBook, updateBook} = require('../Controllers/book-controller');
const protection = require('../Controllers/user-controller')



router.post('/', protection.protectPath, protection.restriction('admin'),addBooks);
router.put('/:id', protection.protectPath, protection.restriction('admin'),updateBook);
router.get('/:id', protection.protectPath, getBook);
router.get('/', protection.protectPath, getBooks);



module.exports = router;