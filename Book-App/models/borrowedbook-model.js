const mongoose = require('mongoose');

const borrowedBookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema
      required: [true, 'please enter your valid userId for this platform'],
    },
    bookName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['borrowed', 'returned'],
      default: 'borrowed',
    },
    borrowedAt: {
      type: Date,
      default: Date.now,
    },
    returnedAt: {
      type: Date,
    },
  }
);

const BorrowedBook = mongoose.model('BorrowedBook', borrowedBookSchema);
module.exports = BorrowedBook;