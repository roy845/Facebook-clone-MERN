import React, { useState, useEffect } from "react";
import { LinearProgress, Typography } from "@mui/material";
import { getDiskInfo } from "../../Api/ServerAPI";

function DiskUsage() {
  const [disk, setDisk] = useState(null);

  useEffect(() => {
    const getDiskStats = async () => {
      try {
        const { data } = await getDiskInfo();
        setDisk(data[0]);
      } catch (error) {}
    };
    getDiskStats();
  }, []);

  if (!disk) {
    return null;
  }

  const totalGB = (disk._blocks / (1024 * 1024 * 1024)).toFixed(2);
  const usedGB = (disk._used / (1024 * 1024 * 1024)).toFixed(2);
  const freeGB = (totalGB - usedGB).toFixed(2);

  const progress = Math.round((disk._used / disk._blocks) * 100);
  const remaining = 100 - progress;

  return (
    <div>
      <h2>Disk Info</h2>
      <div style={{ display: "flex", alignItems: "center", width: "200px" }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          style={{ flex: 1 }}
        />
        <Typography variant="body2" style={{ marginLeft: 10 }}>
          {`${progress}%`}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <b>|</b>
        <span style={{ color: "black" }}>{`${usedGB} GB used`}</span>
        <b>|</b>
        <span style={{ color: "black" }}>{`${freeGB} GB free`}</span> <b>|</b>
        <span style={{ color: "black" }}>{`${totalGB} GB total`}</span> <b>|</b>
      </div>

      <style jsx global>{`
        .MuiLinearProgress-barColorPrimary {
          background-color: #2074f4;
        }
        .MuiLinearProgress-bar1Buffer {
          background-color: #2074f4;
        }
      `}</style>
      <style jsx>{`
        span {
          font-size: 14px;
          color: #2074f4;
        }
      `}</style>
    </div>
  );
}

export default DiskUsage;
