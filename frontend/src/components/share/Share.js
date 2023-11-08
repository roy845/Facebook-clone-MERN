import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import { useAuth } from "../../context/auth/AuthContext";
import { useEffect, useState } from "react";
import { createPost, getUsersByUsername } from "../../Api/ServerAPI";
import toast from "react-hot-toast";
import storage from "../../config/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import LinearProgressBar from "../linearProgressbar/LinearProgressBar";
import {
  filterNamesWithAtSymbol,
  getFileTypeFromExtension,
} from "../../utils/helpers";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import CountrySelect from "../countrySelect/CountrySelect";
import CitySelect from "../citySelect/CitySelect";
import BasicTabs from "../basicTabs/BasicTabs";
import ActivitiesSelect from "../activitiesSelect/ActivitiesSelect";
import FeelingsSelect from "../feelingsSelect/FeelingsSelect";
import ImageSlider from "../imageSlider/ImageSlider";
import { defaultProfilePic } from "../../context/users/UsersConstants";
import { useSocket } from "../../context/socket/SocketContext";
import { useUser } from "../../context/users/UsersContext";
import { Paper, Popper } from "@mui/material";

export default function Share() {
  const { auth, fetchAgain, setFetchAgain } = useAuth();
  const [desc, setDesc] = useState("");
  const [fileData, setFileData] = useState([]); // Use an array to store file data
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(0);
  const [uploadState, setUploadState] = useState("");
  const [fileName, setFileName] = useState("");
  const [showCountry, setShowCountry] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [showActivitiesFeelings, setShowActivitiesFeelings] = useState(false);
  const [activity, setActivity] = useState("");
  const [feeling, setFeeling] = useState("");
  const [images, setImages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const { socket } = useSocket();
  const { activeUsers, friends } = useUser();

  const handleLocation = () => {
    setShowCountry((prev) => !prev);
  };

  const handleActivitiesFeelings = () => {
    setShowActivitiesFeelings((prev) => !prev);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFileData = fileData.map((file) => ({
      ...file,
      publish: true,
    }));

    const newPost = {
      userId: auth?.userInfo?._id,
      desc: desc,
      files: updatedFileData, // Use the array of file data
      edited: false,
    };

    try {
      await createPost(newPost);
      toast.success("Post created successfully");
      const mentions = desc.includes("@") && filterNamesWithAtSymbol(desc);
      const { data } = await getUsersByUsername(mentions);

      socket.emit("postMention", { data, auth });
      setDesc("");
      setFileData([]); // Clear the file data array
      setImages([]);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast.error(error);
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

                setFileData((prevFileData) => [...prevFileData, fileObject]);
                fileObject.type === "image" &&
                  setImages((imageData) => [...imageData, fileObject]);

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

  const handleTag = (event) => {
    const newValue = event.target.value;
    setDesc(newValue);

    if (newValue.includes("@")) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <Link to={`/profile/${auth?.userInfo?.username}`}>
              <img
                className="shareProfileImg"
                src={
                  !auth?.userInfo?.profilePicture?.url
                    ? defaultProfilePic
                    : auth?.userInfo?.profilePicture?.url
                }
                alt=""
              />
            </Link>
            <input
              value={desc}
              onChange={handleTag}
              placeholder={`What's in your mind ${auth?.userInfo?.username} ?`}
              className="shareInput"
            />
          </div>
          <hr className="shareHr" />
          <form className="shareBottom" onSubmit={handleSubmit}>
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Attach Files</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png, .jpeg, .jpg, .mkv, .mp4, .avi, .mov, .webm, .flv, .wmv, .mkv, .3gp,.mp3"
                  onChange={(e) => uploadFiles(e.target.files)}
                  multiple // Allow multiple file selection
                />
              </label>
              <div className="shareOption">
                <Label htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText" style={{ cursor: "pointer" }}>
                  Tag
                </span>
              </div>
              <div className="shareOption">
                <Room htmlColor="green" className="shareIcon" />
                <span onClick={handleLocation} className="shareOptionText">
                  Location
                </span>
              </div>
              <div className="shareOption">
                <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                <span
                  className="shareOptionText"
                  onClick={handleActivitiesFeelings}
                >
                  Feelings
                </span>
              </div>
            </div>

            <button
              className={desc ? "shareButton" : "shareButtonDisabled"}
              type="submit"
              disabled={!desc}
            >
              Share
            </button>
          </form>
        </div>
      </div>
      {!showProgress ? null : (
        <>
          <LinearProgressBar progress={progress} />
          Status: {uploadState}
          <br />
          FileUploaded:{fileName}
        </>
      )}

      {images.length > 0 && (
        <ImageSlider slides={images} setImages={setImages} />
      )}

      {fileData.map((file, index) => (
        <div key={file.id}>
          {/* {file.type === "image" && (
            <>
              <CloseIcon
                className="removeIcon"
                onClick={() => handleRemoveFile(file.id)}
              />
              <img className="postImg" src={file.url} alt="" />
            </>
          )} */}
          <div className="postFiles">
            {" "}
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

      <Popper
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
    </>
  );
}
