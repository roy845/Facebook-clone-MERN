const Notification = require("../models/Notification");

const createNotificationController = async (req, res) => {
  try {
    console.log(req.body);
    const notification = new Notification(req.body);

    const savedNotification = await notification.save();

    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(500).json({
      message: "Error creating notification",
      error: error.message,
    });
  }
};
const getAllNotificationsController = async (req, res) => {
  try {
    const notifications = await Notification.find({});

    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notifications", error: error.message });
  }
};

const deleteNotificationController = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const deletedNotification = await Notification.findByIdAndDelete(
      notificationId
    );

    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({
      message: "Notification deleted successfully",
      deletedNotification: deletedNotification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting notification",
      error: error.message,
    });
  }
};

module.exports = {
  createNotificationController,
  getAllNotificationsController,
  deleteNotificationController,
};
