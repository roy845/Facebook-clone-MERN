import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import {
  getUserPosts,
  getAllPosts,
  getTotalPostsCountTimeline,
  getTotalPostsCountByUsername,
  filterPosts,
  filterUserPosts,
} from "../../Api/ServerAPI";
import { useAuth } from "../../context/auth/AuthContext";
import { CircularProgress, Button, TextField } from "@mui/material";
import Stories from "../Stories/Stories";
import FilterPosts from "../filterPosts/FilterPosts";
import NoItems from "../../pages/marketPlace/components/noItems/NoItems";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { auth, fetchAgain } = useAuth();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

  //get total post count
  const getTotal = async () => {
    try {
      const { data } = username
        ? await getTotalPostsCountByUsername(username)
        : await getTotalPostsCountTimeline(auth?.userInfo?._id);

      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const { data } = username
        ? await getUserPosts(username, page)
        : await getAllPosts(auth?.userInfo?._id, page);

      if (data.length > 0) {
        setPosts([...posts, ...data]);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onLoadMore = async (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  // eslint-disable-next-line
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = username
        ? await getUserPosts(username, page)
        : await getAllPosts(auth?.userInfo?._id, page);

      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [username, auth?.userInfo?._id, fetchAgain]);

  useEffect(() => {
    // eslint-disable-next-line
    if (page === 1) {
      return;
    }
    loadMore();
  }, [page]);

  useEffect(() => {
    // eslint-disable-next-line
    getTotal();
  }, [username, auth?.userInfo?._id]);

  const handleFilterPosts = async () => {
    try {
      const { data } = username
        ? await filterUserPosts(username, fromDate, toDate)
        : await filterPosts(fromDate, toDate, auth?.userInfo?._id);
      setPosts(data);
      setPage(1);
      setShowLoadMoreButton(false);
    } catch (error) {
      console.log(error);
    }
  };

  const resetPosts = () => {
    setPage(1);
    fetchPosts();
    setShowLoadMoreButton(true);
    setFromDate(null);
    setToDate(null);
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        {!username && <Stories />}

        {(!username || username === auth?.userInfo?.username) && <Share />}
        {(!username || username === auth?.userInfo?.username) && posts && (
          <FilterPosts
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            resetPosts={resetPosts}
            setToDate={setToDate}
            handleFilterPosts={handleFilterPosts}
          />
        )}

        {posts.length === 0 && <NoItems type="posts" />}

        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}

        {posts && showLoadMoreButton && posts.length < total && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" color="primary" onClick={onLoadMore}>
              Load More
            </Button>
          </div>
        )}
        {loading && username === auth?.userInfo?.username && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
}
