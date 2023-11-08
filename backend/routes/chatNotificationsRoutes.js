const express = require("express");
const {
  createChatNotificationController,
  getAllChatNotificationsController,
  removeChatNotificationController,
} = require("../controllers/chatNotificationsController");

const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

//createNotification || METHOD POST
router.post(
  "/createChatNotification",
  requireSignIn,
  createChatNotificationController
);

//getAllNotifications || METHOD GET
router.get(
  "/getAllChatNotifications",
  requireSignIn,
  getAllChatNotificationsController
);

//removeNotification || METHOD DELTE
router.delete(
  "/removeChatNotification/:notificationId",
  requireSignIn,
  removeChatNotificationController
);

module.exports = router;
