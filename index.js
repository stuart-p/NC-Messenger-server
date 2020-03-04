const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const indexRouter = require("./routes/index");

const app = express();
app.use(indexRouter);

const server = http.createServer(app);
const io = socketIo(server);
const onlineUserArray = ["jessJelly"];

io.on("connection", socket => {
  socket.on("disconnect", () => {});
  socket.on("chat message", data => {
    socket.broadcast.emit("chat message", data);
    io.to(socket.id).emit("message validation", true);
  });
  socket.on("userConnected", username => {
    onlineUserArray.push(username);
    io.emit("connectionBroadcast", `${username} joined the chat`);
    io.emit("onlineUserBroadcast", onlineUserArray);
  });
});

server.listen(8080, () => {
  console.log("listening on 8080");
});
