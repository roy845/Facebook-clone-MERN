const Message = require("../models/Message");
const User = require("../models/User");
const Chat = require("../models/Chat");
const asyncHandler = require("express-async-handler");

const sendMessageController = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).send("Invalid Data passed into request");
  }

  let fileData = null;
  if (req.file) {
    fileData = {
      filename: req.file.filename,
      filetype: req.file.mimetype,
      filesize: req.file.size,
    };
  }

  console.log(req.file);

  try {
    // Fetch the chat to get the users
    const chat = await Chat.findById(chatId);

    // Fetch all users whom the current user has blocked
    const usersBlockedByCurrentUser = await User.findOne({
      _id: req?.user?.UserInfo?._id,
    }).select("blockedUsers");
    const blockedUserIds = usersBlockedByCurrentUser.blockedUsers.map((id) =>
      id.toString()
    );

    // Check if the current user has blocked any user in the chat
    const hasBlockedAnyUserInChat = chat.users.some((userId) => {
      return blockedUserIds.includes(userId.toString());
    });

    if (hasBlockedAnyUserInChat) {
      return res
        .status(401)
        .send(
          "You have been blocked by this user. you cannot send him messages."
        );
    }

    // Fetch all users who have the current user in their blocked list
    const usersWhoBlockedCurrentUser = await User.find({
      blockedUsers: req?.user?.UserInfo?._id,
    }).select("_id");
    const blockedByUserIds = usersWhoBlockedCurrentUser.map((user) =>
      user._id.toString()
    );

    // Check if any user in the chat has blocked the current user
    const isBlockedByAnyUserInChat = chat.users.some((userId) => {
      return blockedByUserIds.includes(userId.toString());
    });

    if (isBlockedByAnyUserInChat) {
      return res
        .status(403)
        .send(
          "This user is blocked, you need to cancel the block of this user in order to send him a message"
        );
    }

    let newMessage = {
      sender: req?.user?.UserInfo?._id,
      content: content,
      chat: chatId,
      file: fileData,
    };

    let message = await new Message(newMessage).save();

    message = await message.populate("sender");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
    });

    await Chat.findByIdAndUpdate(chat, { latestMessage: message });

    res.json(message);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
});

const getAllMessagesController = asyncHandler(async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chat: chatId })
      .populate("sender")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = {
  sendMessageController,
  getAllMessagesController,
};
