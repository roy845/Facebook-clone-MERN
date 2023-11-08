import "./chatPage.css";
import React, { useState } from "react";
import SwipeableTemporaryDrawer from "../../components/SwipeableDrawer/SwipeableDrawer";
import ChatsSidebar from "../../components/chatsSidebar/ChatsSidebar";
import Topbar from "../../components/topbar/Topbar";

import ChatBox from "../../components/chatBox/ChatBox";
import { Box } from "@chakra-ui/react";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      <SwipeableTemporaryDrawer />

      <Topbar />
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        <ChatsSidebar fetchAgain={fetchAgain} />

        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </div>
  );
};

export default ChatPage;
