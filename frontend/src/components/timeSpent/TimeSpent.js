import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { API_URLS } from "../../Api/ServerAPI";
import axios from "axios";

const TimeSpent = () => {
  const [startTime, setStartTime] = useState(Date.now());

  const { auth } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      localStorage.setItem("timeSpent", currentTime - startTime);
    }, 1000);

    return () => {
      clearInterval(interval);

      saveTimeSpent();
    };
  }, [startTime]);

  const saveTimeSpent = async () => {
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      const { data } = await axios.post(
        `${API_URLS.updateTimeSpentInApp}${auth?.userInfo?._id}`,
        {
          date: currentDate,
          timeSpent: localStorage.getItem("timeSpent"),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return <div></div>;
};

export default TimeSpent;
