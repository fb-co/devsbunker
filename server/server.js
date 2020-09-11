const express = require("express");
const app = express();

require("dotenv").config();

const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const allowedOrigins = [
    `http://${process.env.HOST}:8080`,
    "http://localhost:8080",
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log("[!] A disawllowed origin has tried to connect. [!]");
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};

const methodOverride = require("method-override");

const TokenHandler = require("./components/tokens/TokenHandler");

// Middlewares
app.use(morgan("dev")); // change to common for production
app.use(helmet()); // secure headers
app.use(methodOverride("_method")); // query string in order to make a delete req
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use(TokenHandler.checkHeaderToken); // checking token on every request

// Mongo URI
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const mongoURI = process.env.DB_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log(`Connected to database [${mongoURI}]`));

// imports
const home = require("./components/home/home.route");
const about = require("./components/about/about.route");
const user = require("./components/user/user.route");
const settings = require("./components/settings/settings.route");

// route handling
app.use("/", home);
app.use("/about", about);
app.use("/settings", settings);
app.use("/user", user);

/* HANDLING 404 ERRORS */
app.use((req, res) => {
    res.status(404);
    res.json({
        err: "404 Not found",
    });
});

/* HANDLING OTHER ERRORS */
app.use((err, req, res, next) => {
    res.status(res.statusCode);
    res.json({
        message: err.message,
        stack: err.stack, // this displays the actual error (useful for debugging)
    });
});

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 5000;

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
