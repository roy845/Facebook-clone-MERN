import "./searchUsersDrawer.css";
import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Divider, TextField, Tooltip, Typography } from "@mui/material";
import { ArrowBack, Search } from "@mui/icons-material";
import { useModal } from "../../context/modals/ModalContext";
import { Box } from "@mui/system";
import { createChat, searchAllUsers } from "../../Api/ServerAPI";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useUser } from "../../context/users/UsersContext";
import { useAuth } from "../../context/auth/AuthContext";
import { defaultProfilePic } from "../../context/users/UsersConstants";
import Spinner from "../Spinner/Spinner";
import { makeStyles } from "@mui/styles";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import UserListItem from "../userListItem/UserListItem";
import { useChat } from "../../context/chat/ChatContext";
import toast from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  roundedTextField: {
    "& .MuiInputBase-root": {
      borderRadius: "20px",
    },
  },
  centerTextField: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function SearchUsersDrawer() {
  const classes = useStyles();

  const { usersDrawerState, toggleUsersDrawer } = useModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { auth } = useAuth();
  const { activeUsers } = useUser();
  const {
    setSelectedChat,
    chats,
    setChats /*notification, setNotification */,
  } = useChat();

  const debouncedSearch = debounce(async (query) => {
    try {
      setLoading(true);
      const { data } = await searchAllUsers(query);

      const currentUser = data.find((user) => user._id === auth?.userInfo?._id);

      const friends = data.filter((user) =>
        currentUser?.followings?.includes(user._id)
      );

      setSearchResults(
        data.filter(
          (user) =>
            user._id !== currentUser?._id &&
            !currentUser?.followings?.includes(user._id)
        )
      );
      setFriendsList(friends);

      setLoading(false);
    } catch (error) {
      console.error("Error searching users:", error);
      setLoading(false);
    }
  }, 500);

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const { data } = await createChat(userId);

      if (!chats?.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      toggleUsersDrawer("left", false)();
    } catch (error) {
      toast.error("Error fetching the chat!");
    }
  };

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, fetchAgain]);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
    >
      <Tooltip title="Close">
        <ArrowBack
          style={{ cursor: "pointer" }}
          onClick={toggleUsersDrawer(anchor, false)}
        />
      </Tooltip>
      <Box className={classes.centerTextField}>
        <TextField
          className={`${classes.roundedTextField}`}
          placeholder="Search users"
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: null,
            startAdornment: <Search color="action" />,
            disableUnderline: true,
          }}
        />
      </Box>
      {loading ? (
        <Spinner hourGlass text="users" />
      ) : !searchResults.length && !friendsList.length ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SearchOffIcon
            sx={{ fontSize: 100, color: "red", marginTop: "10px" }}
          />
          <Typography variant="h5" gutterBottom>
            No Users Found
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Your search returned no results.
          </Typography>
        </div>
      ) : (
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <>
              <h3>Friends</h3>
            </>

            {friendsList.map((user, index) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))}

            <>
              <h3>Suggested</h3>
            </>

            {searchResults.map((user, index) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))}
          </ul>
        </div>
      )}
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={usersDrawerState[anchor]}
            onClose={toggleUsersDrawer(anchor, false)}
            onOpen={toggleUsersDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
