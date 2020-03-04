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
  socket.on("disconnect", username => {
    onlineUserArray.splice(onlineUserArray.indexOf(username), 1);
    socket.broadcast.emit("onlineUserBroadcast", onlineUserArray);
    socket.broadcast.emit("chat message", `${username} left the chat`);
  });
  socket.on("chat message", data => {
    io.emit("chat message", data);
  });
  socket.on("userConnected", username => {
    if (onlineUserArray.indexOf(username) >= 0) {
      io.to(socket.id).emit("username already exists", true);
    } else {
      onlineUserArray.push(username);
      io.emit("connectionBroadcast", `${username} joined the chat`);
      io.emit("onlineUserBroadcast", onlineUserArray);
    }
  });
});

server.listen(8080, () => {
  console.log("listening on 8080");
});
