import dotenv from "dotenv";
const { config } = dotenv;
config();

import ApolloServerExpress from "apollo-server-express";
const { ApolloServer } = ApolloServerExpress;

import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import TokenHandler from "./components/tokens/TokenHandler.js";

import cors from "cors";
const allowedOrigins = [
    `http://${process.env.HOST}:8080`,
    "http://localhost:8080",
];
const corsOptions = {
    origin: function (origin, callback) {
        if (process.env.PROD === "true") {
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                console.log(
                    "[!] A disawllowed origin has tried to connect. [!]"
                );
                callback(new Error("Not allowed by CORS"));
            }
        } else {
            callback(null, true);
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};

import express from "express";
const app = express();

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

// Apollo Server
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
});

server.applyMiddleware({ app });

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
import home from "./components/home/home.route.js";
import about from "./components/about/about.route.js";
import user from "./components/user/user.route.js";
import settings from "./components/settings/settings.route.js";

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
