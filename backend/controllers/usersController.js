const { hashPassword } = require("../helpers/authHelper");
const { readJsonFile } = require("../helpers/fileOp");
const Post = require("../models/Post");
const Story = require("../models/Story");
const User = require("../models/User");
const { activitiesFilePath, feelingsFilePath } = require("../paths/filePath");

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const {
    userId,
    profilePicture,
    coverPicture,
    username,
    email,
    desc,
    city,
    from,
    relationship,
    birthday,
  } = req.body;
  if (userId === id || req.body.isAdmin) {
    try {
      const user = await User.findById(userId);

      const updateUserFields = {
        username: username || user.username,
        email: email || user.email,
        desc: desc || user.desc,
        city: city || user.city,
        from: from || user.from,
        relationship: relationship || user.relationship,
        birthday: birthday || user.birthday,
      };

      // Update profilePicture and coverPicture only if they are provided in the request body
      if (profilePicture !== undefined) {
        updateUserFields.profilePicture = profilePicture;
      }

      if (coverPicture !== undefined) {
        updateUserFields.coverPicture = coverPicture;
      }

      if (req.body.password !== "") {
        updateUserFields.password = await hashPassword(req.body.password);
      }

      const updateUser = await User.findByIdAndUpdate(
        userId,
        updateUserFields,
        {
          new: true,
        }
      );

      const { password, __v, ...userInfo } = updateUser._doc;

      res
        .status(200)
        .send({ message: "Account has been updated", user: userInfo });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else {
    return res.status(500).json("You can update only your account!");
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
    await Story.deleteMany({ author: id });
    await User.updateMany({}, { $pull: { followings: id, followers: id } });
    await Post.deleteMany({ userId: id });

    await User.findByIdAndDelete(id);

    res
      .status(200)
      .send({ message: "Account and associated posts have been deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getUserController = async (req, res) => {
  try {
    const userId = req.query.userId;
    const username = req.query.username;

    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });

    if (!user) {
      return res.status(400).send("User not found");
    }
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const followUserController = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json(currentUser.followings);
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};

const unfollowUserController = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json(currentUser.followings);
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
};

const getActivitiesFileController = async (req, res) => {
  try {
    const activitiesData = await readJsonFile(activitiesFilePath);
    res.status(200).send(activitiesData.Activities);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
const getFeelingsFileController = async (req, res) => {
  try {
    const feelingsData = await readJsonFile(feelingsFilePath);
    res.status(200).send(feelingsData.Feelings);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const getFriendsController = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture, birthday } = friend;
      friendList.push({ _id, username, profilePicture, birthday });
    });

    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getFriendsByUsernameController = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture, birthday } = friend;
      friendList.push({ _id, username, profilePicture, birthday });
    });

    res.status(200).json(friendList);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getNewUsersController = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by userId
    const user = await User.findOne({ _id: userId });

    if (!user) {
      // Handle the case where the user is not found
      return res.status(404).json({ message: "User not found" });
    }

    // Access the blockedList field from the user or default to an empty array
    const blockedUsers = user.blockedUsers || [];

    const users = await User.find({
      _id: { $ne: userId, $nin: blockedUsers },
      blockedUsers: { $ne: userId },
    });

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const searchAllUsersController = async (req, res) => {
  try {
    const { query } = req.query;
    const keyword = query
      ? {
          $or: [
            { username: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    // Find the user by userId
    const currentUser = await User.findOne({ _id: req?.user?.UserInfo?._id });

    if (!currentUser) {
      // Handle the case where the user is not found
      return res.status(404).json({ message: "User not found" });
    }

    // Access the blockedList field from the user or default to an empty array
    const blockedUsers = currentUser.blockedUsers || [];
    const users = await User.find({
      ...keyword,
      _id: { $nin: currentUser?.blockedUsers },
      blockedUsers: { $ne: req?.user?.UserInfo?._id },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for users." });
  }
};

const getMyFollowingsController = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.followings);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsersByUsernameController = async (req, res) => {
  try {
    const { users: mentionedUsers } = req.body;

    const users = await User.find({ username: { $in: mentionedUsers } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};

const searchUsersController = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.UserInfo._id);
    const { query } = req.query;

    const keyword = query
      ? {
          $or: [
            { username: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find({
      ...keyword,
      _id: { $ne: req.user.UserInfo._id, $nin: currentUser?.blockedUsers }, // Exclude the current user and users the current user has blocked
      blockedUsers: { $ne: req.user.UserInfo._id }, // Exclude users who have blocked the current user
    });

    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsersStatsController = async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const searchBlockedListUsersController = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          blockedUsers: req.user.UserInfo._id,
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {
          blockedUsers: req.user.UserInfo?._id,
        };

    const users = await User.find(keyword);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

const addUsersToBlockedListController = async (req, res) => {
  const { usersToBlock } = req.body;
  const userIdsToBlock = usersToBlock.map((user) => user._id);

  if (!userIdsToBlock || !Array.isArray(userIdsToBlock)) {
    return res.status(400).send({
      message: "Invalid input. Please provide an array of user IDs to block.",
    });
  }

  const updateFollowingsResult = await User.updateMany(
    { _id: { $in: userIdsToBlock } },
    {
      $pull: {
        followings: req.user.UserInfo._id,
        followers: req.user.UserInfo._id,
      },
    }
  );

  if (updateFollowingsResult.nModified === 0) {
    return res.status(400).send({
      message:
        "Failed to update the following and followers lists for the specified users or no changes were made.",
    });
  }

  // Add the current user to the blockedUsers list of each user in userIdsToBlock
  const blockBackResult = await User.updateMany(
    { _id: { $in: userIdsToBlock } },
    { $addToSet: { blockedUsers: req.user.UserInfo._id } }
  );

  if (blockBackResult.nModified === 0) {
    return res.status(400).send({
      message:
        "Failed to update the blocked list for the specified users or no changes were made.",
    });
  }

  const currentUserUpdateResult = await User.updateOne(
    { _id: req.user.UserInfo._id },
    {
      $pull: {
        followings: { $in: userIdsToBlock },
        followers: { $in: userIdsToBlock },
      },
    }
  );

  if (currentUserUpdateResult.nModified === 0) {
    return res.status(400).send({
      message:
        "Failed to update the current user's following and followers lists.",
    });
  }

  res.status(200).send({
    message: "Users Blocked Successfully",
  });
};

const removeUsersFromBlockedListController = async (req, res) => {
  const { usersToUnBlock } = req.body;

  const userIdsToRemove = usersToUnBlock.map((user) => user._id);

  if (!userIdsToRemove || !Array.isArray(userIdsToRemove)) {
    return res.status(400).send({
      message:
        "Invalid input. Please provide an array of user IDs to remove from the blocked list.",
    });
  }

  const updateFollowingsResult = await User.updateMany(
    { _id: { $in: userIdsToRemove } },
    {
      $push: {
        followings: req.user.UserInfo._id,
        followers: req.user.UserInfo._id,
      },
    }
  );

  if (updateFollowingsResult.nModified === 0) {
    return res.status(400).send({
      message:
        "Failed to update the following and followers lists for the specified users or no changes were made.",
    });
  }

  // Remove the current user from the blockedUsers list of each user in userIdsToRemove
  const unblockResult = await User.updateMany(
    { _id: { $in: userIdsToRemove } },
    { $pull: { blockedUsers: req.user.UserInfo._id } }
  );

  if (unblockResult.nModified === 0) {
    return res.status(400).send({
      message:
        "Failed to update the blocked list of the specified users or no changes were made.",
    });
  }

  const currentUserUpdateResult = await User.updateOne(
    { _id: req.user.UserInfo._id },
    {
      $push: {
        followings: { $each: userIdsToRemove },
        followers: { $each: userIdsToRemove },
      },
    }
  );

  if (currentUserUpdateResult.nModified === 0) {
    return res.status(400).send({
      message:
        "Failed to update the current user's following and followers lists.",
    });
  }

  res.status(200).send({
    message:
      "Successfully removed from the blocked lists of the specified users.",
  });
};

const updateTimeSpent = async (req, res) => {
  const { uid } = req.params;
  const { date, timeSpent } = req.body;

  try {
    const user = await User.findById(uid);

    const timeEntryIndex = user.timeSpentInApp.findIndex(
      (entry) => entry.date === date
    );

    if (timeEntryIndex !== -1) {
      // Update the time spent for the existing date
      await User.updateOne(
        { _id: uid, "timeSpentInApp.date": date },
        { $inc: { "timeSpentInApp.$.timeSpent": timeSpent } }
      );
    } else {
      // Add a new time entry for the date
      await User.updateOne(
        { _id: uid },
        { $push: { timeSpentInApp: { date, timeSpent } } }
      );
    }

    res.status(200).json({ message: "Time spent updated successfully." });
  } catch (error) {
    // Handle any errors that occurred during the query
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getTimeSpent = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await User.findById(uid);
    const timeSpentInApp = user.timeSpentInApp;

    res.status(200).json({ timeSpentInApp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const findAllUsersController = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getNotificationsStatus = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findById({ _id: uid });

    res.status(200).send(user.isNotificationsEnabled);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const updateNotificationsStatus = async (req, res) => {
  const { uid } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: uid },
      { isNotificationsEnabled: req.body.on },
      { new: true }
    );

    console.log(req.body.on);
    console.log(updatedUser.isNotificationsEnabled);

    res.status(200).send("User Notifications Updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = {
  updateUserController,
  deleteUserController,
  getUserController,
  followUserController,
  unfollowUserController,
  getActivitiesFileController,
  getFeelingsFileController,
  getFriendsController,
  searchAllUsersController,
  getFriendsByUsernameController,
  getAllUsersController,
  getMyFollowingsController,
  getUsersByUsernameController,
  searchUsersController,
  getUsersStatsController,
  getNewUsersController,
  searchBlockedListUsersController,
  addUsersToBlockedListController,
  removeUsersFromBlockedListController,
  findAllUsersController,
  updateNotificationsStatus,
  getNotificationsStatus,
  updateTimeSpent,
  getTimeSpent,
};
