import React, { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import { getDeviceInfo } from "../../Api/ServerAPI";

function DeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState({
    paltform: "",
    arch: "",
    hostname: "",
    freeMemory: "",
    totalMemory: "",
  });

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const { data } = await getDeviceInfo();
        setDeviceInfo({
          arch: data.arch,
          platform: data.platform,
          hostname: data.hostname,
          freeMemory: data.freeMemory,
          totalMemory: data.totalMemory,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeviceInfo();
  }, []);

  const freeMemoryGB = (deviceInfo.freeMemory / (1024 * 1024 * 1024)).toFixed(
    2
  );
  const totalMemoryGB = (deviceInfo.totalMemory / (1024 * 1024 * 1024)).toFixed(
    2
  );
  const usedMemoryGB = (totalMemoryGB - freeMemoryGB).toFixed(2);
  const memoryUsage = (usedMemoryGB / totalMemoryGB) * 100;

  return (
    <div style={{ marginLeft: "10px" }}>
      <h2>Device Info</h2>
      <p>Platform: {deviceInfo.platform}</p>
      <p>Architecture: {deviceInfo.arch}</p>
      <p>Hostname: {deviceInfo.hostname}</p>
      <p>Used Memory:{usedMemoryGB}GB</p>
      <p>Free Memory:{freeMemoryGB}GB</p>
      <p>Total Memory: {totalMemoryGB}GB</p>
      <LinearProgress variant="determinate" value={memoryUsage} />
      <style jsx global>{`
        .MuiLinearProgress-barColorPrimary {
          background-color: #2074f4;
        }
        .MuiLinearProgress-bar1Buffer {
          background-color: #2074f4;
        }
      `}</style>
      <p style={{ color: "black" }}>Memory Usage: {memoryUsage.toFixed(2)}%</p>
    </div>
  );
}

export default DeviceInfo;
