const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const cors = require("cors");
const http = require("http");
const documentRouter = require('./routes/document');
const Document = require("./models/document");
const PORT = process.env.PORT || 3001;
const app = express();

var server = http.createServer(app);
var io = require("socket.io")(server);

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(documentRouter);

const DB = "mongodb+srv://srajanseth39:srajanseth39@doceditor.6xwqknd.mongodb.net/?retryWrites=true&w=majority&appName=DocEditor";

mongoose
    .connect(DB)
    .then(() => {
        console.log("Connection successful!");
    })
    .catch((err) => {
    console.log(err);
    });

io.on('connection', (socket) =>{
    socket.on('join', (documentId) => {
        socket.join(documentId);
    });

socket.on("typing", (data) => {
    socket.broadcast.to(data.room).emit("changes", data);
  });

  socket.on("save", (data) => {
    saveData(data);
  });

});

const saveData = async (data) => {
  try {
    let document = await Document.findById(data.room);
    if (!document) {
      // Create a new document if it doesn't exist
      console.log("Creating new document:", data.room);
      document = new Document({ _id: data.room, content: data.delta });
    }
    document.content = data.delta;
    document = await document.save({ overwrite: true });
  } catch (error) {
    console.error("Error saving document:", error);
    // Handle errors appropriately, potentially sending an error message to the client
  }
};

server.listen(PORT, "0.0.0.0", () => {
    console.log("Connected to port " + PORT);
});
