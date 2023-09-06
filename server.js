const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running.");
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("input", (data) => {
    console.log(`Received input: ${data}`);
    // Di sini, Anda dapat menjalankan perintah dan mengirim outputnya ke socket.
    // Contoh sederhana: socket.emit("output", "Output perintah Anda");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
