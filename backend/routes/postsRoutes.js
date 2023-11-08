const router = require("express").Router();

const {
  createPostController,
  updatePostController,
  deletePostController,
  likeDislikePostController,
  getPostController,
  getAllTimeLinePosts,
  getAllUserPosts,
  postCountByUserNameController,
  postCountAllTimeLineController,
  addCommentToPostController,
  deleteCommentFromPostController,
  getCommentController,
  updateCommentController,
  getPostLikesController,
  likeDislikeCommentController,
  getCommentLikesController,
  filterPostsController,
  filterUserPostsController,
} = require("../controllers/postsController");
const { requireSignIn } = require("../middlewares/authMiddleware");

//Create post || METHOD POST
router.post("/", createPostController);
//Add comment to a post
router.post("/addCommentToPost/:postId", addCommentToPostController);
//Update post || METHOD PUT
router.put("/:id", updatePostController);
//Delete post || METHOD DELETE
router.delete("/:id", requireSignIn, deletePostController);
//like/dislike post || METHOD PUT
router.put("/:id/like", likeDislikePostController);
//Get post || METHOD GET
router.get("/:id", getPostController);
//Get all time line posts || METHOD GET
router.get("/timeline/:userId", getAllTimeLinePosts);
//Get all user's posts || METHOD GET
router.get("/profile/:username", getAllUserPosts);
// Get post count || METHOD GET
router.get("/count/postCount/:username", postCountByUserNameController);
// Get post count || METHOD GET
router.get("/count/postCount/timeline/:userId", postCountAllTimeLineController);
// Delete comment from post || METHOD DELETE
router.delete(
  "/deleteCommentFromPost/:postId/:commentId",
  deleteCommentFromPostController
);
// Get comment || METHOD GET
router.get("/getComment/:postId/:commentId", getCommentController);
// Update comment || METHOD PUT
router.put("/updateComment/:postId/:commentId", updateCommentController);
// Get post likes comment || METHOD GET
router.get("/getPostLikes/:postId", getPostLikesController);
//like/dislike comment in post || METHOD PUT
router.put("/:postId/:commentId/:like", likeDislikeCommentController);
//like/dislike comment in post || METHOD PUT
router.get("/getCommentLikes/:postId/:commentId", getCommentLikesController);
//Filter posts  || METHOD POST
router.post("/filterPosts", filterPostsController);
//Filter user posts  || METHOD POST
router.post("/filterUserPosts", filterUserPostsController);
module.exports = router;
