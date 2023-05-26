const { Server } = require("socket.io");

const WEBSOCKET_PORT = 4000;

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.emit("hello");

  socket.on("disconnecting", (reason) => {
    console.log(`user(${socket.id}) has left: ${reason}`);
  });

  socket.on("player", (args) => {
    console.log(`player(${socket.id}):`, args);
    socket.broadcast.emit("player", args);
  });
});

io.listen(WEBSOCKET_PORT);
