require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {errorHandler} = require('./middleware/errorHandler');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.disable('x-powered-by');

//User Route
app.use('/user', require('./routes/user'));

//Messsage Route
app.use('/message', require('./routes/message'));


/* Error Page */
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

app.use(errorHandler);

module.exports = app;