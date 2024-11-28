require('dotenv').config();
const mongoose = require('mongoose')

const express = require('express')
const app = express();
const PORT = process.env.PORT

const userRoute = require('./Routes/user-routes.js');
const bookRoute = require('./Routes/book-routes.js')
const lendRoute = require('./Routes/lend-book-route.js')


//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }));



//ROUTES
app.use('/api/books,', bookRoute);
app.use('/api/user,', userRoute);
app.use('/api/lend,', lendRoute);


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to the Database!!'))
    .catch ((error) => console.log('connection failedt', error));



app.listen(PORT, () => console.log(`server running at https://localhost:${PORT}`));