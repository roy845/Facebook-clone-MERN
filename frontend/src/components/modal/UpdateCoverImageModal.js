import toast from "react-hot-toast";
import ModalUnstyled from "../modal/Modal";
import { getUserById, updateCoverImageUser } from "../../Api/ServerAPI";
import { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box } from "@mui/system";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import storage from "../../config/firebase";
import { useAuth } from "../../context/auth/AuthContext";
import LinearProgressBar from "../linearProgressbar/LinearProgressBar";
import { defaultCoverPic } from "../../context/users/UsersConstants";

const UpdateCoverImageModal = ({ user, open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(0);
  const [uploadState, setUploadState] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");
  const { auth } = useAuth();

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const { data } = await getUserById(user?._id);
        setFile(data.coverPicture);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchUserById();
  }, [user?._id]);

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

    const storageRef = ref(
      storage,
      `${auth?.userInfo?.username}/files/${fileName}`
    );

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
      const storageRef = ref(
        storage,
        `${auth?.userInfo?.username}/files/${file.id}`
      );
      await deleteObject(storageRef);
      await updateCoverImageUser(auth?.userInfo?._id, file);

      setFile("");
    } catch (error) {
      console.error("Error deleting file:", error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      await updateCoverImageUser(auth?.userInfo?._id, file);
      toast.success("Image cover updated successfully");
      setLoading(false);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <ModalUnstyled open={open} onClose={setOpen} title="Update Cover Image">
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
        <img src={!file.url ? defaultCoverPic : file.url} alt="" />
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
          Upload Cover Image
        </label>
        {!showProgress ? null : (
          <>
            <LinearProgressBar progress={progress} />
            Status: {uploadState}
            <br />
            FileUploaded:{fileName}
          </>
        )}
      </div>

      <Box
        display="flex"
        sx={{ marginTop: "20px" }}
        justifyContent="space-between"
      >
        <Button
          disabled={loading}
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={() => {
            setOpen(false);
          }}
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

export default UpdateCoverImageModal;
