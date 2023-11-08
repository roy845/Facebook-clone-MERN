import "./swipeableDrawer.css";
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useModal } from "../../context/modals/ModalContext";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import DevicesIcon from "@mui/icons-material/Devices";
import SpeedIcon from "@mui/icons-material/Speed";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth/AuthContext";
import toast from "react-hot-toast";
import { speedTestUrl } from "../../context/users/UsersConstants";

export default function SwipeableTemporaryDrawer() {
  const { state, toggleDrawer, onOpenSettingsModal, onOpenDeviceModal } =
    useModal();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState(
    +localStorage.getItem("selectedItem") || 0
  );

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const menuItems = [
    {
      name: "Home",
      icon: <HomeIcon />,
      onClick: (index) => {
        navigate("/");
        window.location.reload();
        setSelectedItem(index);
        localStorage.setItem("selectedItem", index);
      },
    },
    {
      name: "Profile",
      icon: <PersonIcon />,
      onClick: (index) => {
        navigate(`/profile/${auth.userInfo.username}`);
        setSelectedItem(index);
        localStorage.setItem("selectedItem", index);
      },
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      onClick: (index) => {
        onOpenSettingsModal();
        setSelectedItem(index);
        localStorage.setItem("selectedItem", index);
      },
    },
    {
      name: "Statistics",
      icon: <BarChartIcon />,
      onClick: (index) => {
        navigate("/statistics");
        setSelectedItem(index);
        localStorage.setItem("selectedItem", index);
      },
    },
    {
      name: "Device Info",
      icon: <DevicesIcon />,
      onClick: (index) => {
        onOpenDeviceModal();
        setSelectedItem(index);
        localStorage.setItem("selectedItem", index);
      },
    },
    {
      name: "Speed test",
      icon: <SpeedIcon />,
      onClick: (index) => {
        window.open(speedTestUrl, "_blank");
        setSelectedItem(index);
        localStorage.setItem("selectedItem", index);
      },
    },
    {
      name: "Logout",
      icon: <LogoutIcon />,
      onClick: (index) => {
        setAuth(null);
        localStorage.removeItem("auth");

        navigate("/");
        toast.success("Logout Successfully");
        setSelectedItem(index);
        document.title = "Facebook";
      },
    },
  ];

  React.useEffect(() => {
    setSelectedItem(+localStorage.getItem("selectedItem"));
    localStorage.removeItem("selectedItem");
  }, []);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <span className="logo-drawer">
          <img
            src={PF + "facebook_icon.png"}
            width="40"
            height="40"
            alt=""
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          />
          <div className="logoText">Facebook</div>
        </span>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            className="list-item"
            style={{
              backgroundColor: selectedItem === index ? "#2074d4" : "",
              color: selectedItem === index ? "white" : "",
            }}
          >
            <ListItemButton onClick={() => item.onClick(index)}>
              <ListItemIcon
                className="list-item"
                style={{
                  color: selectedItem === index ? "white" : "",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
