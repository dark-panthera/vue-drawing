const express = require("express");

const app = express();
const socketio = require("socket.io");
const fs = require('fs');
app.use(express.static(`${__dirname}/dist`));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.of("/").on("connection", (socket) => {
    // socket connect to namespaces
    socket.emit("messageFromServer", { data: "Welcome to the socketio server" });

    socket.on("mouse", (data) => {
        // eslint-disable-next-line no-console
        console.log("Received: 'mouse' " + data.x + " " + data.y);
        socket.broadcast.emit("mouse", data);
    });

    
    socket.on("image", (data) => {
        // eslint-disable-next-line no-console
        console.log("Received: 'mouse' " + data.image);
        // Send it to all other clients
        socket.broadcast.emit("image", data);
    });
});
