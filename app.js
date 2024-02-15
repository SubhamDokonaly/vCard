"use strict";
/** Dependency Injection */
const express = require("express"); // $ npm install express
const mongoose = require("mongoose"); // $ npm install mongoose
const morgan = require('morgan');   // $ npm i morgan
const cors = require("cors");  // npm i cors
const fileUpload = require("express-fileupload")   // npm i express-fileupload
const fs = require('fs');   // Node In-Build Module
const path = require("path"); // Node In-Build Module
const CONFIG = require("./config/config"); // Injecting Our Configuration
const app = express(); // Initializing ExpressJS
const server = require("http").createServer(app);

app.use(cors({
    credentials: true,
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Origin", "X-Requested-with", "Content-Type", "Accept", "Authorization"],
}))

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }  // 50mb
}));

/** MongoDB Connection */
let options = {
    connectTimeoutMS: 30000
};
mongoose.connect(CONFIG.DB_URL, options);
mongoose.connection.on("error", (error) => console.error("Error in MongoDb connection: " + error));
mongoose.connection.on("reconnected", () => console.log("Mongo reconnected successfully!"));
mongoose.connection.on("disconnected", () => console.log("MongoDB disconnected!"));
mongoose.connection.on("connected", () => {
    /** Middleware Configuration */
    app.set("etag", false)

    const jsonOptions = {
        limit: '100mb', // Limit the request body size
        strict: true,  // Only parse arrays and objects (no primitives)
        type: 'application/json', // Expected content type
    };
    app.use(express.json(jsonOptions));

    app.use((err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {

            res.send({ response: "invalid JSON input" }) // Handling JSON parsing error
        } else {

            next(err); // Forwarding other errors to the next middleware
        }
    });

    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

    // setup the logger
    app.use(morgan(
        (tokens, req, res) => {

            if (tokens.method(req, res) == 'POST') {
                return [
                    tokens.method(req, res),
                    tokens.url(req, res),
                    tokens.status(req, res),
                    tokens.res(req, res, 'content-length'), '-',
                    JSON.stringify(req.body), '-',
                    tokens['response-time'](req, res), 'ms',
                    new Date().toJSON()
                ].join(' ')
            }
            else {
                return [
                    tokens.method(req, res),
                    tokens.url(req, res),
                    tokens.status(req, res),
                    tokens.res(req, res, 'content-length'), '-',
                    tokens['response-time'](req, res), 'ms',
                    new Date().toJSON()
                ].join(' ')
            }

        }, { stream: accessLogStream }));

    // require("./routes/admin")(app);
    // require("./routes/user")(app);
    /** HTTP Server Instance */
    try {
        if (server.listening == false) {
            server.listen(CONFIG.PORT, () => {
                console.log("Server turned on with", CONFIG.ENV, "mode on port", CONFIG.PORT);
            });
        }
    } catch (ex) {
        console.log("TCL: ex", ex)
    }
    /** /HTTP Server Instance */
});