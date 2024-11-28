const bookLib = require('../models/borrowedbook-model');
const lendBook = require('../models/books-model');
jwt = require('jsonwebtoken');


const borrowBook = async (req, res) => {
    try {
        // Validate the request
        if (!req.body.bookName) {
            return res.status(400).json({ message: 'Book name is required' });
        }

        // Find the book by name
        const borrowBook = await lendBook.findOne({ name: req.body.bookName });
        if (!borrowBook) {
            return res.status(404).json({ message: `Book with name "${req.body.bookName}" not found` });
        }

        // Check availability
        if (borrowBook.quantity < 1) {
            return res.status(400).json({ message: 'Book not available for borrowing' });
        }

        // Decrease the book quantity
        borrowBook.quantity -= 1;
        await borrowBook.save();

        // Register the borrowed book
        const borrowedBook = await bookLib.create(req.body);

        res.status(200).json({ message: 'Book borrowed successfully', borrowedBook });
    } catch (error) {
        res.status(500).json({ message: 'Failed to borrow the book', error: error.message });
    }
};





const returnBook = async (req, res) => {
    try {
        // Validate Authorization Header
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.toLowerCase().startsWith('bearer')) {
            return res.status(401).json({ message: 'Please provide a valid Access token' });
        }

        const token = authorizationHeader.split(' ')[1]; // Extract the token part

        // Decode the token
        const decoded = jwt.verify(token, process.env.SECRET_STRING);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // Validate the request
        if (!req.body.bookName) {
            return res.status(400).json({ message: 'Book name is required' });
        }

        // Find and delete the borrowed book
        const deletedBorrowedBook = await bookLib.findOneAndDelete({
            bookName: req.body.bookName,
            userId: decoded.id,
        });
        deletedBorrowedBook.status = 'returned';
        deletedBorrowedBook.returnedAt = Date.now();

        if (!deletedBorrowedBook && !req.body.bookName) {
            return res.status(404).json({ message: `Book "${req.body.bookName}" was not borrowed by you` });
        }

        // Find the original book and increment its quantity
        const book = await lendBook.findOne({ name: req.body.bookName });
        if (book) {
            book.quantity += 1;
            await book.save();
        }

        // Return success response
        res.status(200).json({ message: 'Book returned successfully', returnedBook: deletedBorrowedBook });
    } catch (error) {
        console.error('Error returning book:', error.message);
        res.status(500).json({ message: 'Failed to return the book cause book was not found with the datails you have supplied', error: error.message });
    }
};



const userBorrowedBooks = async (req, res) => {
    try {
        // Validate Authorization Header
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.toLowerCase().startsWith('bearer')) {
            return res.status(401).json({ message: 'Please provide a valid Access token' });
        }

        const token = authorizationHeader.split(' ')[1]; // Extract the token part

        // Decode the token
        const decoded = jwt.verify(token, process.env.SECRET_STRING);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // Fetch books borrowed by the user
        const borrowedBooks = await bookLib.find({ userId: decoded.id });

        if (!borrowedBooks.length) {
            return res.status(404).json({ message: 'No borrowed books found for this user' });
        }

        // Return the borrowed books
        res.status(200).json({ message: 'Borrowed books retrieved successfully', books: borrowedBooks });
    } catch (error) {
        console.error('Error fetching borrowed books:', error.message);
        res.status(500).json({ message: 'Failed to fetch borrowed books', error: error.message });
    }
};




const allBorrowedBooks = async (req, res) => {
    try {
        const books = await lendBook.find();

        if (!books) {
            return res.status(404).json({ message: 'There no borrowed books in the record' });
        }
        res.status(200).json(books)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { borrowBook, returnBook, userBorrowedBooks, allBorrowedBooks }