const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
const { ITEMS_PER_PAGE } = require("../utils/constants");

const createPostController = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePostController = async (req, res) => {
  try {
    const { postToUpdate, userId } = req.body;
    const { id } = req.params;

    const post = await Post.findById(id);
    if (post.userId === userId) {
      const updatedPost = await post.updateOne(
        { $set: { ...postToUpdate, edited: true } },
        { new: true }
      );
      res
        .status(200)
        .send({ message: "the post has been updated", updatedPost });
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deletePostController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post?.userId === req?.user?.UserInfo?._id ||
      req?.user?.UserInfo?.isAdmin
    ) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const likeDislikePostController = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body.userId);
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPostController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
      })
      .populate("likes");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllTimeLinePosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page } = req.query;
    const currentUser = await User.findById(userId);

    const userPosts = await Post.find({ userId: currentUser._id })
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      })

      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .sort({ createdAt: -1 });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId })
          .populate({
            path: "comments",
            populate: {
              path: "author", // Populate the 'author' field within each comment
            },
          })

          .skip((page - 1) * ITEMS_PER_PAGE)
          .limit(ITEMS_PER_PAGE)
          .sort({ createdAt: -1 });
      })
    );

    const allPosts = userPosts.concat(...friendPosts);

    res.json(allPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getAllUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const { page } = req.query;
    const user = await User.findOne({ username });
    const posts = await Post.find({ userId: user._id })
      .populate({
        path: "comments",
        populate: {
          path: "author", // Populate the 'author' field within each comment
        },
      })

      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const postCountByUserNameController = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    const posts = await Post.find({ userId: user._id });

    res.status(200).send({
      success: true,
      total: posts.length,
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      success: false,
      message: "Error in posts count",
      error,
    });
  }
};

const postCountAllTimeLineController = async (req, res) => {
  try {
    const { userId } = req.params;

    const currentUser = await User.findById(userId);

    const userPosts = await Post.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    const allPosts = userPosts.concat(...friendPosts);

    res.json({ total: allPosts.length });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      success: false,
      message: "Error in posts count",
      error,
    });
  }
};

const addCommentToPostController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { newComment: commentToAdd } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = new Comment({
      author: commentToAdd.author,
      content: commentToAdd.content,
      edited: commentToAdd.edited,
    });

    await newComment.save();

    post.comments.push(newComment._id);

    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteCommentFromPostController = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const commentIndex = post.comments.findIndex(
      (comment) => comment.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment not found" });
    }

    post.comments.splice(commentIndex, 1);

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getCommentController = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId).populate("comments");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = post.comments.find(
      (comment) => comment._id.toString() === commentId
    );
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateCommentController = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { content } = req.body;

    const post = await Post.findById(postId).populate("comments");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = post.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.content = content;
    comment.edited = true;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPostLikesController = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("likes");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post.likes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const likeDislikeCommentController = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(postId).populate("comments");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = post.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the user has already liked this comment
    const likedIndex = comment.likes.indexOf(userId);

    if (likedIndex === -1) {
      // If the user hasn't liked the comment, add the userId to the likes array
      comment.likes.push(userId);
    } else {
      // If the user has already liked the comment, remove the userId from the likes array
      comment.likes.splice(likedIndex, 1);
    }

    // Save the updated comment
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCommentLikesController = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: {
        path: "likes", // Populate the 'likes' field within each comment
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = post.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    if (!comment) {
      return res.status(200);
    }

    res.status(200).json(comment.likes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const filterPostsController = async (req, res) => {
  try {
    const { fromDate, toDate, userId } = req.body;

    const currentUser = await User.findById(userId);

    const userPostsQuery = {
      userId: currentUser._id,
      createdAt: {
        $gte: new Date(fromDate), // Convert fromDate and toDate to Date objects
        $lte: new Date(toDate),
      },
    };

    const userPosts = await Post.find(userPostsQuery)
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      })

      .sort({ createdAt: -1 });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        const friendPostsQuery = {
          userId: friendId,
          createdAt: {
            $gte: new Date(fromDate), // Apply the same date range filter
            $lte: new Date(toDate),
          },
        };

        return Post.find(friendPostsQuery)
          .populate({
            path: "comments",
            populate: {
              path: "author",
            },
          })

          .sort({ createdAt: -1 });
      })
    );

    const allPosts = userPosts.concat(...friendPosts);

    res.json(allPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const filterUserPostsController = async (req, res) => {
  try {
    const { fromDate, toDate, username } = req.body;

    const user = await User.findOne({ username });

    const userPostsQuery = {
      userId: user._id,
      createdAt: {
        $gte: new Date(fromDate), // Convert fromDate and toDate to Date objects
        $lte: new Date(toDate),
      },
    };

    const posts = await Post.find(userPostsQuery)
      .populate({
        path: "comments",
        populate: {
          path: "author", // Populate the 'author' field within each comment
        },
      })

      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
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
};
