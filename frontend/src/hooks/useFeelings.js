import { useEffect, useState } from "react";
import { getFeelings } from "../Api/ServerAPI";

const useFeelings = () => {
  const [feelings, setFeelings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFeelings();
        setFeelings(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { feelings, loading, error };
};

export default useFeelings;
