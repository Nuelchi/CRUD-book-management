const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please enter the title of the book'],
            unique: true
        },
        author: {
            type: String,
            required: [true, 'please enter the author']
        },
        genre: {
            type: String,
            required: [true, 'please enter the genre of the book']
        },
        quantity: {
            type: Number,
            required: [true, 'please enter the number of copies available']
        },
    }
);



const Book = mongoose.model('Book', bookSchema);
module.exports = Book;