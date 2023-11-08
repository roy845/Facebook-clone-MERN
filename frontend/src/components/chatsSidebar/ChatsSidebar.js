import "./chatSidebar.css";
import {
  Box,
  Button,
  Stack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { AddIcon } from "@chakra-ui/icons";
import SearchUsersDrawer from "../searchUsersDrawer/SearchUsersDrawer";
import { useModal } from "../../context/modals/ModalContext";
import { useChat } from "../../context/chat/ChatContext";
import { useEffect, useState } from "react";
import { getChats } from "../../Api/ServerAPI";
import toast from "react-hot-toast";
import { getSender, getSenderFull } from "../../utils/chatLogics";
import UserChatItem from "../userChatItem/UserChatItem";
import NoUsersFound from "../noUsersFound/NoUsersFound";

export default function ChatsSidebar({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toggleUsersDrawer } = useModal();
  const { selectedChat, setSelectedChat, chats, setChats /*checked*/ } =
    useChat();

  const fetchChats = async () => {
    try {
      setLoading(true);
      const { data } = await getChats();
      setChats(data);

      setLoading(false);
    } catch (error) {
      toast.error("Failed to Load the chats");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("auth")).userInfo);
    fetchChats();
  }, [fetchAgain /*checked*/]);

  const filteredChats = chats?.filter(
    (chat) =>
      chat?.chatName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getSender(loggedUser, chat?.users)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SearchUsersDrawer />

      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="Work sans"
          display="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontWeight="bold">My Chats</Text>
          <Tooltip
            backgroundColor="white"
            color="black"
            label="Search users to chat"
          >
            <Button onClick={toggleUsersDrawer("left", true)} variant="ghost">
              <AddIcon fontSize={20} />
            </Button>
          </Tooltip>
        </Box>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="black" />}
            width="40px" // Set a fixed width for the icon container
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop="10px"
            fontSize={28}
          />
          <Input
            variant="filled"
            bg="#E0E0E0"
            type="text"
            height="50px"
            width="100%"
            borderRadius="10px"
            placeholder="Search chats"
            value={searchTerm}
            pl={10}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        {loading ? <Spinner /> : filteredChats?.length + " chats"}
        <Box
          d="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {filteredChats.length === 0 && <NoUsersFound chats />}
          {filteredChats && !loading ? (
            <Stack height="calc(100vh - 60px)" overflowY="auto">
              {filteredChats?.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  ser
                  bg={selectedChat === chat ? "#1775ee" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat?._id}
                  _hover={{
                    backgroundColor: "#1775ee",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <UserChatItem
                    key={chat._id}
                    user={
                      !chat.isGroupChat
                        ? getSenderFull(loggedUser, chat.users)
                        : chat?.chatName
                    }
                  />
                  {chat?.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat?.latestMessage?.sender?.username} : </b>
                      {chat?.latestMessage?.content?.length > 50
                        ? chat?.latestMessage?.content?.substring(0, 51) + "..."
                        : chat?.latestMessage?.content}
                    </Text>
                  )}
                </Box>
              ))}
            </Stack>
          ) : (
            <>
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
                display="flex"
                mt={5}
              />
              <Text textAlign="center">Loading chats</Text>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
