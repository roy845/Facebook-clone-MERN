const User = require("../models/User");
const Story = require("../models/Story");

const createStoryController = async (req, res) => {
  try {
    const newStory = new Story(req.body);
    const savedStory = await newStory.save();

    res.status(200).json(savedStory);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllStoriesController = async (req, res) => {
  try {
    const { userId } = req.params;

    const userStories = await Story.find({
      author: userId,
    }).populate("author");

    res.json(userStories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateStoryController = async (req, res) => {
  try {
    const { userId } = req.params;

    const story = await Story.find({ author: userId });

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    story[0].files.push(...req.body);

    await story[0].save();

    res.status(200).json({ message: "Story updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deleteStoryController = async (req, res) => {
  const { storyId, fileId } = req.params;

  try {
    // Find the story by its ID
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    // Filter out the file to delete from the 'files' array
    story.files = story.files.filter((file) => file.id !== fileId);

    // Save the updated story
    await story.save();

    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the file" });
  }
};

module.exports = {
  createStoryController,
  getAllStoriesController,
  updateStoryController,
  deleteStoryController,
  //   getStoryController,
};
