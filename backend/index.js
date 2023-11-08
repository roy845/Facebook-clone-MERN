const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const routes = require("./routes");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const path = require("path");

app.use("/images", express.static(path.join(__dirname, "public/images")));
// app.use(express.static(path.join(__dirname, "./build")));

dotenv.config();
//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(routes);

const PORT = process.env.PORT || 8800;

connectDB();

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./build/index.html"));
// });

const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

let users = [];

const addUser = (userData, socketId) => {
  !users.some((user) => user._id === userData?.userInfo?._id) &&
    users.push({ ...userData, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const io = require("socket.io")(server, {
  pingTimeOut: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData?.userInfo?._id);
    addUser(userData, socket.id);
    io.emit("getUsers", users);

    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined Room: " + room);
  });

  socket.on("join messenger chat", (room) => {
    socket.join(room);
    console.log("User joined Room: " + room);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;
    if (!chat.users) {
      return;
    }

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) {
        return;
      }
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.on("postMention", (mentionedUsers) => {
    const message = `You were mentioned in a post by ${mentionedUsers?.auth?.userInfo?.username}.`;
    // Notify mentioned users
    mentionedUsers.data.forEach((user) => {
      socket.in(user._id).emit("newMention", {
        sender: mentionedUsers?.auth?.userInfo?.username,
        recipientId: user._id,
        content: message,
        post: mentionedUsers.post,
      });
    });
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
    removeUser(socket.id);

    io.emit("getUsers", users);
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData?.userInfo?._id);
  });
});
