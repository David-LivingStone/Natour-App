const express = require("express");
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require ('helmet');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const tourRouter = require('./routers/tourRouter');// Define router where it was located in the folder
const userRouter = require('./routers/userRouter');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
//const hpp = require('hpp');



const app = express();

//Set sucurity HTTP headers
app.use(helmet())

//Middleware Function
console.log(process.env.NODE_ENV) //check the Environment on Console
// Development logging
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//Limit request from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from tis IP, Please try again in an hour'
});

app.use('/api', limiter)


//app.use(morgan('dev')); // HTTP request logger middleware.

//Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));

//Data sanitization against NoSQL querry injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
// app.use(hpp({
//     whitelist: [
//         'duration',
//         'difficulty',
//         'price'
//     ]
// }));

//Serving static file
app.use(express.static(`${__dirname}/public`)); //Middleware to access public files from a folder.

//Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    //console.log(req.headers)
    next();
});



app.use (express.json()); // middleware for post request

//Mount all routers
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// ROUTER MIDDLEWARE
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`))
});

//GLOBAL ERROR HANDLING MIDDLEWARE 
app.use(globalErrorHandler);

module.exports = app;