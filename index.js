const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const indexRouter = require("./routes/index");

const app = express();
app.use(indexRouter);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  io.emit("connected", "somebody connected to the chat...");

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });
  socket.on("userConnected", username => {
    io.emit("connectionBroadcast", username);
  });
});

server.listen(8080, () => {
  console.log("listening on 8080");
});
