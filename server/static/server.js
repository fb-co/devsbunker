const express = require('express');
const app = express();

require('dotenv').config();

const morgan = require('morgan');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Middlewares
app.use(morgan('dev')); // change to common for production
app.use(helmet()); // secure headers
app.use(cors());
app.use(cookieParser());

app.use('/', (req, res) => {
    res.send("frontend working");
});

/* HANDLING 404 ERRORS */
app.use((req, res) => {
    res.status(404);
    res.send('404 Not found.');
});

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8080;

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});