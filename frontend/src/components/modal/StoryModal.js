import React, { useEffect, useState } from "react";
import ModalUnstyled from "./Modal";
import { Button, IconButton, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box } from "@mui/system";
import toast from "react-hot-toast";
import storage from "../../config/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import LinearProgressBar from "../linearProgressbar/LinearProgressBar";
import { useAuth } from "../../context/auth/AuthContext";
import { getFileTypeFromExtension } from "../../utils/helpers";
import CloseIcon from "@mui/icons-material/Close";
import {
  createStory,
  getAllStories,
  getUserById,
  updateStory,
} from "../../Api/ServerAPI";

const StoryModal = ({ open, setOpen, selectedId }) => {
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState([]); // Use an array to store file data
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(0);
  const [uploadState, setUploadState] = useState("");
  const [fileName, setFileName] = useState("");
  const [user, setUser] = useState({});
  const [story, setStory] = useState([]);
  const [fileDurations, setFileDurations] = useState({});
  const audioRefs = {}; // Object to store audio elements
  const videoRefs = {}; // Object to store video elements

  const { auth } = useAuth();

  const handleDurationChange = (id, duration) => {
    setFileDurations((prevDurations) => ({
      ...prevDurations,
      [id]: duration,
    }));
  };

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const { data } = await getUserById(selectedId);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    selectedId && fetchUserById();
  }, [selectedId]);

  useEffect(() => {
    const fetchStoryByUserId = async () => {
      try {
        const { data } = await getAllStories(selectedId);
        setStory(data);
      } catch (error) {
        console.log(error);
      }
    };

    selectedId && fetchStoryByUserId();
  }, [selectedId]);

  const resetForm = () => {
    setFileData([]);
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    const updatedFileData = fileData.map((file) => ({
      ...file,
      publish: true,
      duration: fileDurations[file.id],
    }));

    const newStory = {
      author: user?._id,
      files: updatedFileData, // Use the array of file data
    };

    try {
      setLoading(true);
      await createStory(newStory);
      toast.success("Story created successfully");
      setLoading(false);
      resetForm();
      setOpen(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const handleUpdateStory = async (e) => {
    e.preventDefault();

    const updatedFileData = fileData.map((file) => ({
      ...file,
      publish: true,
      duration: fileDurations[file.id],
    }));

    try {
      setLoading(true);
      await updateStory(user?._id, updatedFileData);
      toast.success("Story updated successfully");
      setLoading(false);
      resetForm();
      setOpen(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const uploadFiles = async (files) => {
    setShowProgress(true);
    const uploadPromises = [];

    for (const file of files) {
      if (file.size > 100 * 1024 * 1024) {
        toast.error(`File ${file.name} size exceeds the 100 MB limit.`);
        continue;
      }

      const fileName = new Date().getTime() + file.name;

      const storageRef = ref(storage, `${user?.username}/files/${fileName}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      setFileName(file.name);

      const fileExtension = getFileTypeFromExtension(
        file.name.split(".").pop()
      );

      const fileObject = {
        id: fileName,
        url: null,
        type: fileExtension,
        publish: false,
      };

      uploadPromises.push(
        new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const newProgress =
                snapshot.totalBytes > 0
                  ? Math.round(
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                  : 0;
              setShowProgress(true);
              setProgress(newProgress);

              if (newProgress === 100) {
                setShowProgress(false);
              }

              switch (snapshot.state) {
                case "paused":
                  setUploadState("Upload is paused");
                  break;
                case "running":
                  setUploadState("Upload is running");
                  break;

                default:
                  setUploadState("Something went wrong");
              }
            },
            (error) => {
              reject(error);
            },
            () => {
              setUploadState("Upload successful");

              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                fileObject.url = downloadURL;

                setFileData((prevFileData) => [...prevFileData, fileObject]);

                resolve();
              });
            }
          );
        })
      );
    }

    // Wait for all upload promises to complete before submitting the form
    await Promise.all(uploadPromises);
    setShowProgress(false);
  };

  const handleRemoveFile = async (id) => {
    const fileToRemove = fileData.find((file) => file.id === id);

    if (fileToRemove) {
      try {
        setFileData((prevFileData) =>
          prevFileData.filter((file) => file.id !== id)
        );

        const storageRef = ref(
          storage,
          `${auth?.userInfo?.username}/files/${fileToRemove.id}`
        );
        await deleteObject(storageRef);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  // const handleLoadedMetadata = (id, element) => {
  //   const duration = element.current.duration;
  //   handleDurationChange(id, duration);
  // };

  return (
    <ModalUnstyled
      open={open}
      onClose={setOpen}
      title={story?.[0] === undefined ? "Create story" : "Update story"}
    >
      {fileData.map((file, index) => (
        <div key={file.id}>
          {file.type === "image" && (
            <>
              <CloseIcon
                className="removeIcon"
                onClick={() => handleRemoveFile(file.id)}
              />
              <img
                className="postImg"
                src={file.url}
                alt=""
                width="200px"
                height="200px"
              />
            </>
          )}
          <div className="postFiles">
            {file.type === "song" && (
              <>
                <CloseIcon
                  className="removeIcon"
                  onClick={() => handleRemoveFile(file.id)}
                />
                <div className="postSongContainer">
                  <audio
                    ref={(ref) => (audioRefs[file.id] = ref)}
                    onLoadedMetadata={(e) =>
                      handleDurationChange(file.id, e.target.duration)
                    }
                    className="postSong"
                    controls
                  >
                    <source src={file.url} type="audio/mpeg" />
                  </audio>
                </div>
              </>
            )}
            {file.type === "movie" && (
              <>
                <CloseIcon
                  className="removeIcon"
                  onClick={() => handleRemoveFile(file.id)}
                />
                <div className="postMovieContainer">
                  <video
                    ref={(ref) => (videoRefs[file.id] = ref)}
                    onLoadedMetadata={(e) =>
                      handleDurationChange(file.id, e.target.duration)
                    }
                    className="postMovie"
                    controls
                    width="300"
                  >
                    <source src={file.url} type="video/mp4" />
                  </video>
                </div>
              </>
            )}
          </div>
          <TextField
            label="Duration (seconds)"
            type="number"
            value={fileDurations[file.id] || ""}
            onChange={(e) => handleDurationChange(file.id, +e.target.value)}
          />
        </div>
      ))}

      <label htmlFor="upload-input">
        <input
          type="file"
          id="upload-input"
          accept=".png, .jpeg, .jpg, .mkv, .mp4, .avi, .mov, .webm, .flv, .wmv, .mkv, .3gp"
          multiple
          style={{ display: "none" }}
          onChange={(e) => uploadFiles(e.target.files)}
        />
        <IconButton component="span">
          <CloudUploadIcon />
        </IconButton>
        Upload Images/Videos
      </label>

      {!showProgress ? null : (
        <>
          <LinearProgressBar progress={progress} />
          Status: {uploadState}
          <br />
          FileUploaded:{fileName}
        </>
      )}

      <Box
        display="flex"
        sx={{ marginTop: "20px" }}
        justifyContent="space-between"
      >
        <Button
          // disabled={loading}
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={() => {
            setOpen(false);
            setFileData([]);
          }}
        >
          Discard
        </Button>

        {story?.[0] === undefined ? (
          <Button
            disabled={loading || fileData.length === 0}
            variant="contained"
            onClick={handlePublish}
          >
            Publish
          </Button>
        ) : (
          <Button
            disabled={loading || fileData.length === 0}
            variant="contained"
            onClick={handleUpdateStory}
          >
            Update
          </Button>
        )}
      </Box>
    </ModalUnstyled>
  );
};

export default StoryModal;
