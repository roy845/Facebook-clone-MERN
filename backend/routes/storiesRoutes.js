const router = require("express").Router();

const {
  createStoryController,
  updateStoryController,
  deleteStoryController,
  //   getStoryController,
  getAllStoriesController,
} = require("../controllers/storiesController");
const { requireSignIn } = require("../middlewares/authMiddleware");

//Create story || METHOD POST
router.post("/", requireSignIn, createStoryController);
//Update story|| METHOD PUT
router.put("/:userId", updateStoryController);
//Delete story || METHOD DELETE
router.delete("/:storyId/:fileId", deleteStoryController);
//Get story || METHOD GET
// router.get("/", getStoryController);
// Get all stories || METHOD GET
router.get("/:userId", getAllStoriesController);

module.exports = router;
