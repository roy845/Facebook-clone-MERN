import { useEffect, useState } from "react";
import { useModal } from "../../context/modals/ModalContext";
import ModalUnstyled from "../modal/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useAuth } from "../../context/auth/AuthContext";
import storage from "../../config/firebase";
import toast from "react-hot-toast";
import {
  deletePost,
  getPost,
  getUsersByUsername,
  updatePost,
} from "../../Api/ServerAPI";
import { Box, Button, Paper, Popper } from "@mui/material";
import { EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material";
import {
  filterNamesWithAtSymbol,
  getFileTypeFromExtension,
} from "../../utils/helpers";
import LinearProgressBar from "../linearProgressbar/LinearProgressBar";
import CountrySelect from "../countrySelect/CountrySelect";
import CitySelect from "../citySelect/CitySelect";
import BasicTabs from "../basicTabs/BasicTabs";
import ActivitiesSelect from "../activitiesSelect/ActivitiesSelect";
import FeelingsSelect from "../feelingsSelect/FeelingsSelect";
import { useUser } from "../../context/users/UsersContext";
import { defaultProfilePic } from "../../context/users/UsersConstants";
import { useSocket } from "../../context/socket/SocketContext";

const UpdateModal = ({ post }) => {
  const { auth, fetchAgain, setFetchAgain } = useAuth();
  const { open, onClose } = useModal();
  const [postUpdate, setPostUpdate] = useState([]);
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(0);
  const [uploadState, setUploadState] = useState("");
  const [fileName, setFileName] = useState("");
  const [showCountry, setShowCountry] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [activity, setActivity] = useState("");
  const [feeling, setFeeling] = useState("");
  const [showActivitiesFeelings, setShowActivitiesFeelings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { activeUsers, friends } = useUser();
  const { socket } = useSocket();

  const handleActivitiesFeelings = () => {
    setShowActivitiesFeelings((prev) => !prev);
  };

  const handleLocation = () => {
    setShowCountry((prev) => !prev);
  };

  useEffect(() => {
    setDesc(
      country &&
        city &&
        "🌐 " + auth?.userInfo?.username + " is at " + country + " , " + city
    );
  }, [city, country, auth?.userInfo?.username]);

  useEffect(() => {
    setDesc(activity && auth?.userInfo?.username + " is " + activity);
  }, [activity, auth?.userInfo?.username]);

  useEffect(() => {
    setDesc(feeling && auth?.userInfo?.username + " feels " + feeling);
  }, [feeling, auth?.userInfo?.username]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await getPost(post._id);
        setPostUpdate(data);
        setFiles(data.files);
        setDesc(data.desc);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchPost();
  }, [post._id]);

  const handleRemoveFile = async (id) => {
    const fileToRemove = files.find((file) => file.id === id);

    setFiles((prevFileData) => prevFileData.filter((file) => file.id !== id));

    if (fileToRemove) {
      setFilesToRemove((files) => [...files, fileToRemove]);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    if (desc === "" && files.length === 0) {
      try {
        try {
          const storageRef = ref(
            storage,
            `${auth?.userInfo?.username}/files/${filesToRemove[0].id}`
          );
          await deleteObject(storageRef);
        } catch (error) {
          console.error("Error deleting file:", error);
          setLoading(false);
        }
        await deletePost(post._id, auth?.userInfo?._id);
        onClose();
        setFetchAgain(!fetchAgain);
      } catch (error) {
        toast.error(error);
      }
    }
    for (const file of filesToRemove) {
      try {
        const storageRef = ref(
          storage,
          `${auth?.userInfo?.username}/files/${file.id}`
        );
        await deleteObject(storageRef);
      } catch (error) {
        console.error("Error deleting file:", error);
        setLoading(false);
      }
    }

    const updatedFileData = files.map((file) => ({
      ...file,
      publish: true,
    }));

    const postToUpdate = {
      desc: desc,
      files: updatedFileData,
      likes: postUpdate.likes,
    };

    try {
      await updatePost(post._id, auth?.userInfo?._id, postToUpdate);
      toast.success("Post updated successfully");
      const mentions = desc.includes("@") && filterNamesWithAtSymbol(desc);
      const { data } = await getUsersByUsername(mentions);
      console.log(socket);
      socket.emit("postMention", { data, auth, post });
      setFetchAgain(!fetchAgain);
      onClose();
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }

    setLoading(false);
  };

  const handleClose = () => {
    setDesc("");
    setFiles([]);
    setFilesToRemove([]);
    onClose();
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

      const storageRef = ref(
        storage,
        `${auth?.userInfo?.username}/files/${fileName}`
      );

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

                setFiles((prevFileData) => [...prevFileData, fileObject]);

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

  const handleClosePopper = () => {
    setAnchorEl(null);
  };

  const handleDescriptionChange = (e) => {
    const newValue = e.target.value;
    setDesc(newValue);
    if (newValue.includes("@")) {
      setAnchorEl(e.currentTarget);
    }
  };

  return (
    <ModalUnstyled open={open} onClose={onClose} title="Update Post">
      <textarea
        placeholder={`Whats on your mind ? ${auth?.userInfo?.username}`}
        value={desc}
        className="shareInput"
        onChange={handleDescriptionChange}
        style={{ marginBottom: "10px" }}
      />

      <Popper
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClosePopper}
        style={{ zIndex: 99999, marginBottom: "100px" }}
        placement="top-start"
      >
        <Paper>
          {friends?.map((friend) => (
            <li
              className="friendListItem"
              key={friend.username}
              onClick={() => {
                setDesc((prevContent) => prevContent + friend.username);

                setAnchorEl(null);
              }}
            >
              <div className="rightbarProfileImgContainer">
                <img
                  className="rightbarProfileImg"
                  src={friend.profilePicture.url || defaultProfilePic}
                  alt=""
                />
                {activeUsers.some(
                  (active) => active?.userInfo?._id === friend._id
                ) ? (
                  <span className="rightbarOnline"></span>
                ) : (
                  <span className="rightbarOffline"></span>
                )}
              </div>
              <span className="rightbarUsername">{friend.username}</span>
            </li>
          ))}
        </Paper>
      </Popper>

      {files?.map((file, index) => (
        <div key={file.id}>
          {file.type === "image" && (
            <>
              <CloseIcon
                className="removeIcon"
                onClick={() => handleRemoveFile(file.id)}
              />
              <img className="postImg" src={file.url} alt="" />
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
                  <audio className="postSong" controls>
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
                  <video className="postMovie" controls width="300">
                    <source src={file.url} type="video/mp4" />
                  </video>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      {!showProgress ? null : (
        <>
          <LinearProgressBar progress={progress} />
          Status: {uploadState}
          <br />
          FileUploaded:{fileName}
        </>
      )}
      <div className="shareOptions">
        <label htmlFor="fileUpdateModal" className="shareOption">
          <PermMedia htmlColor="tomato" className="shareIcon" />
          <span className="shareOptionText">Attach Files</span>
          <input
            style={{ display: "none" }}
            type="file"
            id="fileUpdateModal"
            accept=".png, .jpeg, .jpg, .mkv, .mp4, .avi, .mov, .webm, .flv, .wmv, .mkv, .3gp,.mp3"
            onChange={(e) => uploadFiles(e.target.files)}
            multiple // Allow multiple file selection
          />
        </label>
        <div className="shareOption">
          <Label htmlColor="blue" className="shareIcon" />
          <span className="shareOptionText">Tag</span>
        </div>
        <div className="shareOption">
          <Room htmlColor="green" className="shareIcon" />
          <span onClick={handleLocation} className="shareOptionText">
            Location
          </span>
        </div>
        <div className="shareOption">
          <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
          <span onClick={handleActivitiesFeelings} className="shareOptionText">
            Feelings
          </span>
        </div>
      </div>
      {showActivitiesFeelings && (
        <BasicTabs
          activitiesSelect={<ActivitiesSelect setActivity={setActivity} />}
          feelingsSelect={<FeelingsSelect setFeeling={setFeeling} />}
        />
      )}
      {showCountry && (
        <CountrySelect setCountry={setCountry} setShowCities={setShowCities} />
      )}
      {showCities && <CitySelect country={country} setCity={setCity} />}
      <Box
        display="flex"
        sx={{ marginTop: "20px" }}
        justifyContent="space-between"
      >
        <Button
          disabled={loading}
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={handleClose}
        >
          Discard
        </Button>
        <Button disabled={loading} variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </ModalUnstyled>
  );
};

export default UpdateModal;
