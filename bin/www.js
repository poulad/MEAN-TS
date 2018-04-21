"use strict";

const server = require("../dist/server");
const http = require("http");

const httpPort = normalizePort(process.env.PORT || 3000);
let httpServer;
server.Server.bootstrap()
    .then(server => {
        server.app.set("port", httpPort);
        httpServer = http.createServer(server.app);

        httpServer.listen(httpPort);
        httpServer.on("error", onError);
        httpServer.on("listening", onListening);

        console.info(`Server running at http://localhost:${httpPort}`);
    })
    .catch(e => {
        console.error('Failed to bootstrap the server');
        console.error(e);
        process.exit(1);
    });

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof httpPort === "string" ?
        "Pipe " + httpPort :
        "Port " + httpPort;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = httpServer.address();
    const bind = typeof addr === "string" ?
        "pipe " + addr :
        "port " + addr.port;
}
