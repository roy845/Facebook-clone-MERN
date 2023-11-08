import { useState, useEffect } from "react";
import { Button, FormControl, Switch, TextField } from "@mui/material";
import ModalUnstyled from "../modal/Modal";
import { Box, Stack } from "@mui/system";
import BlockIcon from "@mui/icons-material/Block";
import toast from "react-hot-toast";
import {
  addUsersToBlockedList,
  getNotificationsStatus,
  removeUsersFromBlockedList,
  searchBlockedListUsers,
  searchUsers,
  updateNotificationStatus,
} from "../../Api/ServerAPI";
import Spinner from "../Spinner/Spinner";
import UserBadgeItem from "../userBadgeItem/UserBadgeItem";
import UserListItem from "../userListItem/UserListItem";
import { useAuth } from "../../context/auth/AuthContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "black",
    color: "white",
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  },
  updateProfile: {
    backgroundColor: "#e50914",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#b20710",
    },
  },
  switch: {
    color: "black",
  },
  dialogContent: {
    overflowY: "auto",
  },
}));

const SettingsModal = ({ open, setOpen }) => {
  const [showUsersToBlock, setShowUsersToBlock] = useState(false);
  const [showUsersToUnblock, setShowUsersToUnblock] = useState(false);
  const [search, setSearch] = useState("");
  const [searchBlockedUsers, setSearchBlockedUsers] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsBlockedUsers, setSearchResultsBlockedUsers] = useState(
    []
  );
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersToUnblock, setSelectedUsersToUnblock] = useState([]);
  const [loading, setLoading] = useState(false);

  const { auth } = useAuth();
  const classes = useStyles();

  const showUsersToBlockHandler = () => {
    setShowUsersToBlock(!showUsersToBlock);
  };

  const showUsersToUnblockHandler = () => {
    setShowUsersToUnblock(!showUsersToUnblock);
  };

  const addUserToBlock = (userToBlock) => {
    if (selectedUsers.some((user) => user._id === userToBlock._id)) {
      toast.error("User already addded");
      return;
    }

    setSelectedUsers([...selectedUsers, userToBlock]);
  };

  const addUserToUnblock = (userToUnblock) => {
    if (selectedUsersToUnblock.some((user) => user._id === userToUnblock._id)) {
      toast.error("User already added");
      return;
    }

    setSelectedUsersToUnblock([...selectedUsersToUnblock, userToUnblock]);
  };

  const handleDelete = (userToDelete) => {
    setSelectedUsers(
      selectedUsers.filter(
        (selectedUser) => selectedUser._id !== userToDelete._id
      )
    );
  };

  const handleDeleteUsersFromBlockedList = (userToDelete) => {
    setSelectedUsersToUnblock(
      selectedUsersToUnblock.filter(
        (selectedUser) => selectedUser._id !== userToDelete._id
      )
    );
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await searchUsers(query);
      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      toast.error("Error Occured!");
      setLoading(false);
    }
  };

  const handleSearchBlockedUsers = async (query) => {
    setSearchBlockedUsers(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await searchBlockedListUsers(query);
      setLoading(false);
      setSearchResultsBlockedUsers(data);
    } catch (error) {
      toast.error("Error Occured!");
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (selectedUsers.length === 0) {
        setOpen();
        return;
      }

      const { data } = await addUsersToBlockedList(selectedUsers);
      toast.success(data.message);
      setSearchResults([]);
      setSelectedUsers([]);
      setSelectedUsersToUnblock([]);
      setSearchResultsBlockedUsers([]);
      setShowUsersToBlock(false);
      setShowUsersToUnblock(false);

      setOpen();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmitUsersToUnblock = async () => {
    try {
      if (selectedUsersToUnblock.length === 0) {
        setOpen();
        return;
      }

      const { data } = await removeUsersFromBlockedList(selectedUsersToUnblock);
      toast.success(data.message);
      setSearchResults([]);
      setSelectedUsers([]);
      setSelectedUsersToUnblock([]);
      setSearchResultsBlockedUsers([]);
      setShowUsersToBlock(false);
      setShowUsersToUnblock(false);

      setOpen();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [isNotificationsOn, setIsNotificationsOn] = useState(false);

  const handleSwitchChange = async (event) => {
    try {
      const { data } = await updateNotificationStatus(
        auth?.userInfo?._id,
        event.target.checked
      );

      setIsNotificationsOn(!event.target.checked);
      toast.success(
        !event.target.checked
          ? "Notifications Enabled"
          : "Notifications Disabled"
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchNotificationsStatus = async () => {
      try {
        const { data } = await getNotificationsStatus(auth?.userInfo?._id);

        setIsNotificationsOn(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotificationsStatus();
  }, []);

  return (
    <ModalUnstyled open={open} onClose={setOpen} title="Settings">
      <Stack spacing={2}>
        <h2 style={{ marginBottom: "10px", fontWeight: "bold", fontSize: 28 }}>
          Notifications
        </h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Switch
            className={classes.switch}
            checked={isNotificationsOn}
            onChange={(e) => handleSwitchChange(e)}
          />

          {isNotificationsOn ? (
            <NotificationsActiveIcon
              style={{ color: "gold", marginLeft: "10px" }}
            />
          ) : (
            <NotificationsIcon style={{ color: "black", marginLeft: "10px" }} />
          )}
          <span style={{ marginLeft: "10px", color: "black" }}>
            {isNotificationsOn
              ? "Turn off notifications"
              : "Turn on notifications"}
          </span>
        </div>
        <Button startIcon={<BlockIcon />} onClick={showUsersToBlockHandler}>
          Block Users
        </Button>
        <Button startIcon={<BlockIcon />} onClick={showUsersToUnblockHandler}>
          Unblock Users
        </Button>
      </Stack>

      {showUsersToBlock && (
        <>
          <FormControl>
            <TextField
              placeholder="Search users to block"
              sx={{ marginTop: 5, marginBottom: 5 }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
          <Box w="100%" display="flex" flexWrap="wrap">
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}
          </Box>
          {loading ? (
            <Spinner />
          ) : (
            searchResults?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => addUserToBlock(user)}
              />
            ))
          )}
          <Button
            colorScheme="green"
            disabled={selectedUsers.length === 0}
            onClick={handleSubmit}
            icon
          >
            Save
          </Button>
        </>
      )}
      {showUsersToUnblock && (
        <>
          <FormControl>
            <TextField
              placeholder="Search users to unblock"
              sx={{ marginTop: 5, marginBottom: 5 }}
              onChange={(e) => handleSearchBlockedUsers(e.target.value)}
            />
          </FormControl>
          <Box w="100%" display="flex" flexWrap="wrap">
            {selectedUsersToUnblock.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleDeleteUsersFromBlockedList(u)}
              />
            ))}
          </Box>
          {loading ? (
            <Spinner />
          ) : (
            searchResultsBlockedUsers?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => addUserToUnblock(user)}
              />
            ))
          )}
          <Button
            colorScheme="green"
            disabled={selectedUsersToUnblock.length === 0}
            onClick={handleSubmitUsersToUnblock}
            icon
          >
            Save
          </Button>
        </>
      )}

      <Box display="flex" justifyContent="flex-end" sx={{ marginTop: "20px" }}>
        <Button
          // disabled={loading}
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={() => {
            setSearchResults([]);
            setSelectedUsers([]);
            setSelectedUsersToUnblock([]);
            setSearchResultsBlockedUsers([]);
            setShowUsersToBlock(false);
            setShowUsersToUnblock(false);
            setOpen();
          }}
        >
          Close
        </Button>
      </Box>
    </ModalUnstyled>
  );
};

export default SettingsModal;
