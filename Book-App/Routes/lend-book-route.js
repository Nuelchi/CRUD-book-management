const express = require('express');
const router = express.Router();
const {borrowBook, returnBook, allBorrowedBooks, userBorrowedBooks} = require('../Controllers/lend-book-controller');
const protection = require('../Controllers/user-controller')


router.post('/',protection.protectPath, borrowBook);
router.post('/',protection.protectPath, returnBook);
router.get('/', protection.protectPath, userBorrowedBooks);
router.get('/', protection.protectPath, protection.restriction('admin'),allBorrowedBooks);


module.exports = router;