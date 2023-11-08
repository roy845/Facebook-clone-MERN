import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../../../context/auth/AuthContext";
import toast from "react-hot-toast";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../../../config/firebase";
import LinearProgressBar from "../../../../components/linearProgressbar/LinearProgressBar";
import ImageSlider from "../../../../components/imageSlider/ImageSlider";
import { getFileTypeFromExtension } from "../../../../utils/helpers";
import { useVehicles } from "../../../../context/vehicles/VehiclesContext";

const NewVehicleCard = ({ image, title, subTitle }) => {
  const { fileData, setFileData } = useVehicles();
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(0);
  const [uploadState, setUploadState] = useState("");
  const [fileName, setFileName] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(fileData);
  }, [fileData]);

  const { auth } = useAuth();

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

  return (
    <div>
      <label htmlFor="file" className="shareOption">
        <Card
          sx={{
            maxWidth: 350,
            width: 240,
            mt: "10px",
            cursor: "pointer",
            border: "1px gray solid",
          }}
          className="card-hover"
        >
          <CardMedia sx={{ height: 240 }} image={image} title="" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subTitle}
            </Typography>
          </CardContent>
        </Card>
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          accept=".png,.jpeg,.jpg"
          onChange={(e) => uploadFiles(e.target.files)}
          multiple // Allow multiple file selection
        />
      </label>

      {!showProgress ? null : (
        <>
          <LinearProgressBar progress={progress} />
          Status: {uploadState}
          <br />
          FileUploaded:{fileName}
        </>
      )}

      {images?.length > 0 && (
        <ImageSlider
          slides={images}
          setImages={setImages}
          setFileData={setFileData}
          fileData={fileData}
        />
      )}
    </div>
  );
};

export default NewVehicleCard;
