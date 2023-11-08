import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { AdminPanelSettings } from "@mui/icons-material";
import { useAuth } from "../../context/auth/AuthContext";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Box } from "@chakra-ui/react";

export default function Sidebar() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const sideBarItems = [
    {
      name: "Feed",
      icon: <RssFeed className="sidebarIcon" />,
      onClick: () => navigate("/"),
    },
    {
      name: "Chats",
      icon: <Chat className="sidebarIcon" />,
      onClick: () => navigate("/chats"),
    },
    {
      name: "Videos",
      icon: <PlayCircleFilledOutlined className="sidebarIcon" />,
      onClick: () => {},
    },
    {
      name: "Groups",
      icon: <Group className="sidebarIcon" />,
      onClick: () => {},
    },
    {
      name: "Bookmarks",
      icon: <Bookmark className="sidebarIcon" />,
      onClick: () => {},
    },
    {
      name: "Questions",
      icon: <HelpOutline className="sidebarIcon" />,
      onClick: () => {},
    },
    {
      name: "Jobs",
      icon: <WorkOutline className="sidebarIcon" />,
      onClick: () => {},
    },
    {
      name: "Events",
      icon: <Event className="sidebarIcon" />,
      onClick: () => {},
    },
    {
      name: "Courses",
      icon: <School className="sidebarIcon" />,
      onClick: () => {},
    },
    {
      name: "Admin",
      icon: <AdminPanelSettings className="sidebarIcon" />,
      onClick: () => navigate("/admin"),
    },
    {
      name: "Market Place",
      icon: <StorefrontIcon className="sidebarIcon" />,
      onClick: () => navigate("/marketPlace"),
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          {sideBarItems.map((item, index) => (
            <Box
              onClick={item.onClick}
              cursor="pointer"
              ser
              px={3}
              py={2}
              borderRadius="lg"
              key={index}
              _hover={{
                backgroundColor: "#1775ee",
                color: "white",
                cursor: "pointer",
              }}
            >
              {item.icon}
              {item.name}
            </Box>
          ))}
        </ul>
      </div>
    </div>
  );
}
