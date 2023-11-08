const router = require("express").Router();

const {
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
  updateNotificationsStatus,
  getNotificationsStatus,
  updateTimeSpent,
  getTimeSpent,
  findAllUsersController,
} = require("../controllers/usersController");

const { requireSignIn } = require("../middlewares/authMiddleware");

//Update user || METHOD PUT
router.put("/:id", updateUserController);
//Delete user || METHOD DELETE
router.delete("/:id", deleteUserController);
//Get user || METHOD GET
router.get("/", getUserController);
//Follow user || METHOD PUT
router.put("/:id/follow", followUserController);
//Unfollow user || METHOD PUT
router.put("/:id/unfollow", unfollowUserController);
//get Activities.json file || METHOD GET
router.get("/getActivitiesFile", getActivitiesFileController);
//get Feelings.json file || METHOD GET
router.get("/getFeelingsFile", getFeelingsFileController);
//get friends || METHOD GET
router.get("/friends/:userId", getFriendsController);
//get friends by username || METHOD GET
router.get("/getFriendsByUsername/:username", getFriendsByUsernameController);
//get all users || METHOD GET
router.get("/getAllUsers/:userId", getAllUsersController);
//search all users || METHOD GET
router.get("/searchAllUsers", requireSignIn, searchAllUsersController);
//get my followings || METHOD GET
router.get("/getMyFollowings/:userId", getMyFollowingsController);
//get users by username || METHOD GET
router.post("/getUsersByUsername", getUsersByUsernameController);
//Search users || METHOD GET
router.get("/searchUsers", requireSignIn, searchUsersController);
//Get users stats || METHOD GET
router.get("/getUsersStats", getUsersStatsController);
//Get new users (limit to 5 new users)  || METHOD GET
router.get("/getNewUsers", getNewUsersController);
//Get blocked users || METHOD GET
router.get(
  "/searchBlockedListUsers",
  requireSignIn,
  searchBlockedListUsersController
);
//Add users to blocked list || METHOD POST
router.post(
  "/addUsersToBlockedList",
  requireSignIn,
  addUsersToBlockedListController
);
//removeUsersFromBlockedList || METHOD POST
router.post(
  "/removeUsersFromBlockedList",
  requireSignIn,
  removeUsersFromBlockedListController
);
//Update time spent
router.post("/updateTimeSpentInApp/:uid", updateTimeSpent);
//Get time spent
router.get("/getTimeSpentInApp/:uid", getTimeSpent);
//Find all users
router.get("/findAllUsers", findAllUsersController);
//Update notifications status
router.put("/updateNotificationsStatus/:uid", updateNotificationsStatus);
//Get notifications status
router.get("/getNotificationsStatus/:uid", getNotificationsStatus);
module.exports = router;
