import dotenv from "dotenv";
const { config } = dotenv;
config();

import ApolloServerExpress from "apollo-server-express";
import { formatError } from "apollo-errors";
const { ApolloServer } = ApolloServerExpress;

import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import TokenHandler from "./components/tokens/TokenHandler.js";

import cors from "cors";
const allowedOrigins = [`https://${process.env.FRONTEND}:${process.env.CLIENTSIDE_PORT}`, `https://${process.env.FRONTEND}`, `https://${process.env.HOST}:${process.env.PORT}`, `https://www.${process.env.FRONTEND}`];

const corsOptions = {
    origin: function (origin, callback) {
        if (process.env.PROD === "true") {
            // !origin --> to allow REST tools and server-to-server requests (used to grab images)
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                console.log(`[!] An unallowed origin has tried to connect: ${origin} [!]`);
                callback(new Error("Not allowed by CORS"));
            }
        } else {
            callback(null, true);
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};

import { createRateLimitDirective, createRateLimitTypeDef } from "graphql-rate-limit-directive";

import express from "express";
const app = express();

// Middlewares
app.use(morgan("dev")); // change to common for production
app.use(helmet()); // secure headers
app.use(methodOverride("_method")); // query string in order to make a delete req
app.use(cors(corsOptions));
app.use(express.static("uploads"));

app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(TokenHandler.checkHeaderToken);

// Apollo Server
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

const server = new ApolloServer({
    typeDefs: [createRateLimitTypeDef(), typeDefs],
    resolvers,
    context: ({ req, res }) => ({ req, res }),
    formatError,
    schemaDirectives: {
        rateLimit: createRateLimitDirective(),
    },
    playground: false,
});

server.applyMiddleware({ app, cors: false });

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
import user from "./components/user/user.route.js";
import upload from "./components/post/post.route.js";
import oauth from "./components/github/oauth.routes.js";

// route handling
app.use("/user", user);
app.use("/upload", upload);
app.use("/auth/github/", oauth);

/* HANDLING 404 ERRORS */
app.use((_, res) => {
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
