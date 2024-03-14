require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT.js');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials.js');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn.js');
const PORT = process.env.PORT || 3500;

// connect to mongoDB
connectDB();

// custom middleware logger
app.use(logger);

// use credentials before CORS and fetch cookies credentials
app.use(credentials);

// cross origin resource sharing
// whitelist items are domains that can access the backend
app.use(cors(corsOptions));

// build-in middleware to handle urlencoded data
// form data: 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// build-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files (css, js)
app.use(express.static(path.join(__dirname, '/public')));

// defining routes

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); // 302 by default
});

// changed from app.use('/*',.....) to app.all('*',.....) ~2h55m in course
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
    res.json({ error: "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// error function added with cors
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('conneced to MongoDB');
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
})