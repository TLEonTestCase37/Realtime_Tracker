const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("recieve-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", function (socket) {
    io.emit("user-dis", socket.id);
  });
  console.log(`Connected with ID: ${socket.id} `);
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.render("index");
});

server.listen(3000);
