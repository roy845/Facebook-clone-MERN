import { createContext, useContext, useEffect, useState } from "react";

export const UsersContext = createContext({});

export const UsersContextProvider = ({ children }) => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [myFollowings, setMyFollowing] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendsByUsername, setFriendsByUsername] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  return (
    <UsersContext.Provider
      value={{
        fetchAgain,
        setFetchAgain,
        myFollowings,
        setMyFollowing,
        friends,
        setFriends,
        activeUsers,
        setActiveUsers,
        friendsByUsername,
        setFriendsByUsername,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

const useUser = () => useContext(UsersContext);

export { useUser };
