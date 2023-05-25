const { Server } = require("socket.io");

const WEBSOCKET_PORT = 4000;

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("disconnecting", (reason) => {
    console.log(`user(${socket.id}) has left: ${reason}`);
  });

  console.log("socket.id:", socket.id);
  socket.emit("hello");
});

io.listen(WEBSOCKET_PORT);
