const express = require('express');
const app = express();

require('dotenv').config();

const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const methodOverride = require('method-override');

// Middlewares
app.use(morgan('dev')); // change to common for production
app.use(helmet()); // secure headers
app.use(methodOverride('_method')); // query string in order to make a delete req
app.use(cors());
app.use(cookieParser());

// Mongo URI
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const mongoURI = process.env.DB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log(`Connected to database [${mongoURI}]`));

app.use('/', (req, res) => {
    res.send("api working");
});

/* HANDLING 404 ERRORS */
app.use((req, res) => {
    res.status(404);
    res.send('404 Not found.');
});

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 5000;

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});