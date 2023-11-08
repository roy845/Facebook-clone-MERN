import React, { useState } from "react";
import Lottie from "react-lottie";
import { downloadMedia, formatBytes } from "../../utils/helpers";
import { CircularProgress } from "@mui/material";
import { BASE_URL } from "../../Api/ServerAPI";

const FileDownload = ({ filename, options, imgSrc, filesize }) => {
  const [loading, setLoading] = useState(false);
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div>
      <a href={`${BASE_URL}files/${filename}`} style={{ cursor: "pointer" }}>
        {imgSrc && <img src={imgSrc} width="48px" height="48px" />}
        {options && (
          <Lottie
            options={options}
            width={70}
            style={{
              marginBottom: 15,
              marginLeft: 0,
            }}
          />
        )}
      </a>
      {loading && (
        <div style={containerStyle}>
          <CircularProgress />
        </div>
      )}
      {filesize && formatBytes(filesize)}
    </div>
  );
};

export default FileDownload;
