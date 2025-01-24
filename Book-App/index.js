require('dotenv').config();
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit');

const express = require('express')
const app = express();
const PORT = process.env.PORT || 6000;

const userRoute = require('./Routes/user-routes.js');
const bookRoute = require('./Routes/book-routes.js')
const lendRoute = require('./Routes/lend-book-route.js')



//Rate limit
let limiter = rateLimit({
    max: 5,
    windowMs: 60 * 60 * 1000,
    message: "Limit exceeded please try again in one hour"

});



//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//ROUTES
app.use('/api', limiter);
app.use('/api/books', bookRoute);
app.use('/api/user', userRoute);
app.use('/api/lend', lendRoute);


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to the Database!!'))
    .catch ((error) => console.log('connection failedt', error));



app.listen(PORT, () => console.log(`server running at https://localhost:${PORT}`));