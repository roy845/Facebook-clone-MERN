const ChatNotification = require("../models/ChatNotification");

const createChatNotificationController = async (req, res) => {
  const { data } = req.body;

  if (!data.sender || !data.content || !data.chat) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const notification = new ChatNotification(data);

  const savedNotification = await notification.save();

  // Populate the fields 'sender', 'chat', and the 'users' array inside 'chat'
  await savedNotification.populate([
    { path: "sender", select: "-password" },
    {
      path: "chat",
      populate: {
        path: "users",
        select: "-password", // Assuming you also want to exclude passwords from the users
      },
    },
  ]);

  res.status(201).json(savedNotification);
};

const getAllChatNotificationsController = async (req, res) => {
  try {
    const notifications = await ChatNotification.find()
      .populate("sender", "-password")
      .populate({
        path: "chat",
        populate: {
          path: "users",
          select: "-password",
        },
      });

    res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching chat notifications",
      error: error.message,
    });
  }
};

const removeChatNotificationController = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const deletedNotification = await ChatNotification.findByIdAndDelete(
      notificationId
    );

    if (!deletedNotification) {
      return res.status(404).json({ message: "Chat Notification not found" });
    }

    res.status(200).json({ message: "Chat Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting chat notification",
      error: error.message,
    });
  }
};

module.exports = {
  createChatNotificationController,
  getAllChatNotificationsController,
  removeChatNotificationController,
};
