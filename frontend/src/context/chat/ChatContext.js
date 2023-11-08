import { useContext, createContext, useState } from "react";

export const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  // const [checked, setChecked] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
        // checked,
        // setChecked,
        isSoundEnabled,
        setIsSoundEnabled,
        chatMessages,
        setChatMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => useContext(ChatContext);

export { useChat, ChatProvider };
