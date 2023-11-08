"./updateUser.css";
import { useNavigate, useParams } from "react-router";
import Topbar from "../../../../components/topbar/Topbar";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { getUserById, updateUserProfile } from "../../../../Api/ServerAPI";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import storage from "../../../../config/firebase";
import LinearProgressBar from "../../../../components/linearProgressbar/LinearProgressBar";
import { defaultProfilePic } from "../../../../context/users/UsersConstants";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import SwipeableTemporaryDrawer from "../../../../components/SwipeableDrawer/SwipeableDrawer";

const UpdateUserPage = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [from, setFrom] = useState("");
  const [status, setStatus] = useState();
  const [birthday, setBirthday] = useState();
  const [createdAt, setCreatedAt] = useState(new Date());
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(0);
  const [uploadState, setUploadState] = useState("");
  const [fileName, setFileName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const { data } = await getUserById(userId);
        setUser(data);

        setFile(data.profilePicture);
        setUsername(data.username);
        setEmail(data.email);
        setDescription(data.desc);
        setCity(data.city);
        setFrom(data.from);
        setStatus(data.relationship);
        setBirthday(moment(data?.birthday));
        setCreatedAt(data.createdAt);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchUserById();
  }, [userId]);

  const uploadFile = async (file) => {
    setShowProgress(true);

    if (file.size > 100 * 1024 * 1024) {
      toast.error(`File ${file.name} size exceeds the 100 MB limit.`);
      return;
    }

    const fileName = new Date().getTime() + file.name;
    const fileObject = {
      url: null,
      id: fileName,
    };

    const storageRef = ref(storage, `${user?.username}/files/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    setFileName(file.name);

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

            setFile(fileObject);
            resolve();
          });
        }
      );
    });

    setShowProgress(false);
  };

  const handleRemoveFile = async () => {
    try {
      const storageRef = ref(storage, `${user?.username}/files/${file.id}`);
      await deleteObject(storageRef);

      setFile("");
    } catch (error) {
      console.error("Error deleting file:", error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      await updateUserProfile(
        user?._id,
        file,
        username,
        email,
        password,
        description,
        city,
        from,
        status,
        birthday
      );
      toast.success("User profile updated successfully");

      setLoading(false);

      navigate("/admin/users");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <SwipeableTemporaryDrawer />
      <Topbar />
      <div className="editUserContainer" style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="content"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <h1>Edit User - {user?.username}</h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {file?.url && (
              <CloseIcon
                className="removeIcon"
                onClick={handleRemoveFile}
                style={{
                  position: "relative",
                  marginLeft: "auto",
                }}
              />
            )}
            <Avatar
              sx={{ width: "100px", height: "100px" }}
              src={!file?.url ? defaultProfilePic : file?.url}
              alt=""
            />
            <label htmlFor="upload-input">
              <input
                type="file"
                id="upload-input"
                style={{ display: "none" }}
                onChange={(e) => uploadFile(e.target.files[0])}
              />
              <IconButton component="span">
                <CloudUploadIcon />
              </IconButton>
              Upload Profile Image
            </label>
            {!showProgress ? null : (
              <>
                <LinearProgressBar progress={progress} />
                Status: {uploadState}
                <br />
                FileUploaded:{fileName}
              </>
            )}

            <TextField
              style={{ marginTop: "5px" }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              style={{ marginTop: "5px" }}
              variant="outlined"
              margin="normal"
              fullWidth
              disabled
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              style={{ marginTop: "5px" }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              style={{ marginTop: "5px" }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="desc"
              label="Description"
              name="desc"
              autoComplete="desc"
              autoFocus
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              style={{ marginTop: "5px" }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
              autoFocus
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="from"
              label="Country"
              name="from"
              autoComplete="from"
              autoFocus
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />

            <Select
              value={status || 3}
              onChange={(e) => setStatus(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{ marginTop: "5px" }}
            >
              <MenuItem value={1}>Single</MenuItem>
              <MenuItem value={2}>Married</MenuItem>
              <MenuItem value={3}>-</MenuItem>
            </Select>

            <DatePicker
              sx={{ marginTop: "10px" }}
              value={birthday}
              required
              onChange={(date) => setBirthday(date)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              disabled
              fullWidth
              id="createdAt"
              label="CreatedAt"
              name="createdAt"
              autoComplete="createdAt"
              autoFocus
              value={new Date(createdAt).toLocaleDateString()}
            />
          </div>

          <Box
            display="flex"
            sx={{ marginTop: "20px", gap: "20px" }}
            justifyContent="space-between"
          >
            <Button
              disabled={loading}
              variant="contained"
              style={{ backgroundColor: "red" }}
              onClick={() => {
                navigate("/admin/users");
              }}
            >
              Discard
            </Button>
            <Button disabled={loading} variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default UpdateUserPage;
