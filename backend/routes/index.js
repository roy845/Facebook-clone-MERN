const express = require("express");

const authRoutes = require("./authRoutes");
const usersRoutes = require("./usersRoutes");
const postsRoutes = require("./postsRoutes");
const storiesRoutes = require("./storiesRoutes");
const systemRoutes = require("./systemRoutes");
const itemsRoutes = require("./itemsRoutes");
const vehicleRoutes = require("./vehiclesRoutes");
const propertyRoutes = require("./propertyRoutes");
const chatRoutes = require("./chatRoutes");
const messagesRoutes = require("./messagesRoutes");
const chatNotificationsRoutes = require("./chatNotificationsRoutes");
const notificationsRoutes = require("./notificationsRoutes");
const filesRoutes = require("./filesRoutes");

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/users", usersRoutes);
router.use("/api/posts", postsRoutes);
router.use("/api/stories", storiesRoutes);
router.use("/api/system", systemRoutes);
router.use("/api/items", itemsRoutes);
router.use("/api/vehicles", vehicleRoutes);
router.use("/api/property", propertyRoutes);
router.use("/api/chat", chatRoutes);
router.use("/api/messages", messagesRoutes);
router.use("/api/chatNotifications", chatNotificationsRoutes);
router.use("/api/notifications", notificationsRoutes);
router.use("/api/files", filesRoutes);

module.exports = router;
