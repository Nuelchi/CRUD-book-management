const Book = require('../models/books-model');



const addBooks = async (req,res)=> {
    try {
        const book = await Book.create(req.body);
        res.status(200).json({message: 'book added successfully!!',book});
    } 
    catch(error){
        res.status(404).json({message: error.message});
    }
};


const getBooks = async (req,res)=> {
    try {
        const books = await Book.find({});

        if (!books) {
            return res.status(404).json({ message: 'book with ID not found' });
        }
        res.status(200).json(books)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




const getBook = async (req,res)=> {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'No available books at the moment try again later' });
        }
        res.status(200).json(book)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateBook = async (req, res) => {
    try {
        // Find the book by ID and update it
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,  // Get the book ID from the request parameters
            req.body,       // Data to update from the request body
            { new: true, runValidators: true } // Return updated document and validate inputs
        );

        // If no book is found with the given ID
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book with the specified ID not found!, please provide a valid id' });
        }

        // Return the updated book
        res.status(200).json({ message: 'Book updated successfully!', book: updatedBook });
    } catch (error) {
        // Handle errors, including invalid ObjectId or validation errors
        res.status(400).json({ message: error.message });
    }
};



module.exports = {addBooks, getBook, getBooks, updateBook}