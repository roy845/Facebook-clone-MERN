import { Link, useLocation, useNavigate } from "react-router-dom";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { useAuth } from "../../context/auth/AuthContext";
import {
  Autocomplete,
  Badge,
  Box,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import toast from "react-hot-toast";
import {
  deleteNotification,
  getAllChatNotifications,
  getAllNotifications,
  getAllUsers,
  removeChatNotificationApiCall,
} from "../../Api/ServerAPI";
import { defaultProfilePic } from "../../context/users/UsersConstants";
import { useSocket } from "../../context/socket/SocketContext";
import SettingsIcon from "@mui/icons-material/Settings";
import { useModal } from "../../context/modals/ModalContext";
import SettingsModal from "../settingsModal/SettingsModal";
import DeviceInfoModal from "../modal/DeviceInfoModal";
import { messangerIcon } from "../../context/items/ItemsConstants";
import { useChat } from "../../context/chat/ChatContext";
import { getSender } from "../../utils/chatLogics";

const Topbar = () => {
  const { auth, setAuth } = useAuth();
  const { messages, setMessages } = useSocket();
  const { setSelectedChat, chats, setChats, notification, setNotification } =
    useChat();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorChatNotificationsEl, setAnchorChatNotificationsEl] =
    useState(null);
  const [anchorNotiEl, setAnchorNotiEl] = useState(null);
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState(users[0]);
  const [notificationReceivedSound, setNotificationReceivedSound] =
    useState(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    toggleDrawer,
    openSettings,
    openDeviceInfo,
    onCloseSettingsModal,
    onOpenDeviceModal,
    onCloseDeviceModal,
  } = useModal();

  const defaultValue = users[0];

  useEffect(() => {
    // Create the audio element when the component mounts
    const audio = new Audio("/audio/Facebook - Sound ! Effect.mp3");
    if (messages.length > 0) setNotificationReceivedSound(audio);
  }, [messages.length]);

  useEffect(() => {
    // eslint-disable-next-line
    const fetchUsers = async () => {
      try {
        const { data } = await getAllUsers(auth?.userInfo?._id);
        setUsers(data);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchUsers();
  }, [auth?.userInfo?._id]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuNotiClose = () => {
    setAnchorNotiEl(null);
  };
  const handleMenuChatNotiClose = () => {
    setAnchorChatNotificationsEl(null);
  };

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/");
    toast.success("Logout Successfully");
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate(`/profile/${auth.userInfo.username}`);
    setAnchorEl(null);
  };

  const handleHome = () => {
    navigate("/");
    setAnchorEl(null);
  };

  const handleInputChange = (event, newValue) => {
    setInputValue(event.target.value);
  };

  const fetchNotifications = async () => {
    try {
      const { data } = await getAllNotifications();
      setMessages(data.filter((m) => m.recipientId === auth?.userInfo?._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotificationsClick = (event) => {
    setAnchorNotiEl(event.currentTarget);
  };
  const handleChatNotificationsClick = (event) => {
    setAnchorChatNotificationsEl(event.currentTarget);
  };

  const removeNotification = async (notificationId) => {
    try {
      const { data } = await deleteNotification(notificationId);
      fetchNotifications();
      navigate(`/post/${data.deletedNotification.post._id}`);
    } catch (error) {
      console.log(error);
      setMessages(messages.filter((noti) => noti._id !== notificationId));
    }
  };

  const removeChatNotification = async (notificationId) => {
    try {
      const { data } = await removeChatNotificationApiCall(notificationId);
      toast.success(data.message);
      removeChatNotification();
    } catch (error) {
      setNotification(
        notification.filter((noti) => noti._id !== notificationId)
      );
    }
  };

  useEffect(() => {
    const fetchChatNotifications = async () => {
      try {
        const { data } = await getAllChatNotifications();

        setNotification(data);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching Notifications!");
      }
    };
    fetchChatNotifications();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      // Play the audio
      notificationReceivedSound?.play();
    } else {
      // Pause the audio
      notificationReceivedSound?.pause();
    }
  }, [messages.length]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link
          to={pathname === "/chats" ? "/chats" : "/"}
          style={{ textDecoration: "none" }}
        >
          <span className="logo">
            <img
              src={
                pathname === "/chats" ? messangerIcon : PF + "facebook_icon.png"
              }
              width="40"
              height="40"
              alt=""
            />

            {pathname === "/chats" ? (
              <div className="logoTextTopBar">Messenger</div>
            ) : (
              <div className="logoTextTopBar">Facebook</div>
            )}
          </span>
        </Link>
      </div>
      <div className="topbarCenter">
        <Autocomplete
          id="users-select"
          value={inputValue || defaultValue}
          inputValue={inputValue}
          sx={{
            "& .MuiInputBase-root": {
              border: "none",
              backgroundColor: "white",
              borderRadius: "10px",

              "&:hover": {
                border: "none",
              },
            },
          }}
          options={users}
          autoHighlight
          onChange={handleInputChange}
          getOptionLabel={(option) => (option ? option.username : "")}
          renderOption={(props, option) => (
            <>
              <Link
                style={{ textDecoration: "none" }}
                to={`/profile/${option.username}`}
              >
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={
                      !option?.profilePicture?.url
                        ? defaultProfilePic
                        : option?.profilePicture?.url
                    }
                    alt=""
                  />
                  {option.username}
                </Box>
              </Link>
            </>
          )}
          renderInput={(params) => (
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  border: "none",

                  "&:hover": {
                    border: "none",
                  },
                },
              }}
              {...params}
              placeholder="Search"
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                ...params.InputProps,
                endAdornment: null,
                startAdornment: <Search color="action" />,
                disableUnderline: true,
              }}
            />
          )}
        />
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Badge
              badgeContent={notification.length}
              color="error"
              onClick={handleChatNotificationsClick}
            >
              <Chat />
            </Badge>

            <Menu
              anchorEl={anchorChatNotificationsEl}
              open={Boolean(anchorChatNotificationsEl)}
              onClose={handleMenuChatNotiClose}
            >
              {!notification?.length && "No New Messages"}
              {notification &&
                notification?.map((noti) => (
                  <MenuItem
                    key={noti?._id}
                    onClick={() => {
                      setSelectedChat(noti?.chat);
                      navigate("/chats");
                      removeChatNotification(noti?._id);
                    }}
                  >
                    {noti?.chat?.isGroupChat
                      ? `New Message in ${noti?.chat?.chatName}`
                      : `New Message from ${getSender(
                          auth?.userInfo,
                          noti?.chat?.users
                        )}`}
                  </MenuItem>
                ))}
            </Menu>
          </div>
          <div className="topbarIconItem">
            <Badge
              badgeContent={messages.length}
              color="error"
              onClick={handleNotificationsClick}
            >
              <Notifications />
            </Badge>
            <Menu
              anchorEl={anchorNotiEl}
              open={Boolean(anchorNotiEl)}
              onClose={handleMenuNotiClose}
            >
              {!messages?.length && "No New Messages"}
              {messages.map((message, index) => (
                <MenuItem
                  onClick={() => removeNotification(message._id)}
                  key={index}
                >
                  {message.content}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <Tooltip title={auth?.userInfo?.username}>
          <img
            onClick={toggleDrawer("right", true)}
            src={
              !auth?.userInfo?.profilePicture?.url
                ? defaultProfilePic
                : auth?.userInfo?.profilePicture?.url
            }
            alt=""
            className="topbarImg"
          />
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleHome}>
            <HomeIcon />
            Home
          </MenuItem>
          <MenuItem onClick={handleProfile}>
            <PersonIcon />
            Profile
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <SettingsIcon />
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </MenuItem>
        </Menu>
      </div>
      {openSettings && (
        <SettingsModal open={openSettings} setOpen={onCloseSettingsModal} />
      )}

      {openDeviceInfo && (
        <DeviceInfoModal open={openDeviceInfo} setOpen={onCloseDeviceModal} />
      )}
    </div>
  );
};

export default Topbar;
