import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { useUser } from "../users/UsersContext";
import {
  createChatNotification,
  createNotification,
  getNotificationsStatus,
} from "../../Api/ServerAPI";
import { useChat } from "../chat/ChatContext";
import {
  messageReceivedSound,
  selectedChatCompare,
} from "../../components/singleChat/SingleChat";
import toast from "react-hot-toast";

let socket;

const ENDPOINT = "http://localhost:8800";

const SocketContext = createContext({});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children, auth }) => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isNotificationsOn, setIsNotificationsOn] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { setActiveUsers } = useUser();

  const {
    selectedChat,
    setSelectedChat,
    chatMessages,
    setChatMessages,
    notification,
    setNotification,
    isSoundEnabled,
  } = useChat();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", auth);
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // socket.emit("join chat", "693b704-903c-4006-bada-4716c6bdab9c");
    socket.on("connected", () => setSocketConnected(true));
    socket.on("getUsers", (users) => {
      localStorage.setItem("activeUsers", JSON.stringify(users));
      setActiveUsers(JSON.parse(localStorage.getItem("activeUsers")));
    });
    return () => {
      socket.disconnect();
      socket.on("getUsers", (users) => {
        localStorage.setItem("activeUsers", JSON.stringify(users));
        setActiveUsers(JSON.parse(localStorage.getItem("activeUsers")));
      });
    };
  }, [auth, setActiveUsers]);

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

  useEffect(() => {
    socket.on("newMention", (message) => {
      isNotificationsOn &&
        createNotification(message)
          .then((res) => {
            setMessages((prevMessages) => [...prevMessages, res.data]);
          })
          .catch((err) => console.log(err));
    });

    return () => {
      socket.off("newMention");
    };
  }, [isNotificationsOn]);

  const createNotificationFunc = async (newMessageReceived) => {
    try {
      const { data } = await createChatNotification({
        chat: newMessageReceived.chat._id,
        content: newMessageReceived.content,
        sender: newMessageReceived.sender._id,
      });
      return data;
    } catch (error) {
      toast.error("Failed to create Notification");
    }
  };

  useEffect(() => {
    const handleMessageReceived = (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // give notification
        if (!notification.includes(newMessageReceived)) {
          createNotificationFunc(newMessageReceived).then((res) => {
            setNotification([res, ...notification]);
          });
          if (isSoundEnabled) {
            messageReceivedSound.play();
          }

          // setFetchAgain(!fetchAgain);
        }
      } else {
        setChatMessages([...chatMessages, newMessageReceived]);
        messageReceivedSound.play();
      }
    };

    socket?.on("message received", handleMessageReceived);

    // Cleanup the event listener on component unmount
    return () => {
      socket?.off("message received", handleMessageReceived);
    };
  }, [selectedChatCompare, notification, messages]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        socketConnected,
        messages,
        setMessages,
        isTyping,
        setIsTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
