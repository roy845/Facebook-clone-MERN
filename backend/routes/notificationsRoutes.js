const router = require("express").Router();

const {
  createNotificationController,
  deleteNotificationController,
  getAllNotificationsController,
} = require("../controllers/notificationsController");

//Create notification || METHOD POST
router.post("/createNotification", createNotificationController);
//Delete notification || METHOD DELETE
router.delete(
  "/deleteNotification/:notificationId",
  deleteNotificationController
);
//Get all notifications || METHOD GET
router.get("/getAllNotifications", getAllNotificationsController);

module.exports = router;
