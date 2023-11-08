import axios from "axios";

export const BASE_URL = "http://localhost:8800/api/";

export const API_URLS = {
  login: `${BASE_URL}auth/login`,
  register: `${BASE_URL}auth/register`,
  forgotPassword: `${BASE_URL}auth/forgotPassword`,
  resetPassword: `${BASE_URL}auth/resetPassword`,
  getAllPosts: `${BASE_URL}posts/timeline/`,
  getUserById: `${BASE_URL}users`,
  getUserByUsername: `${BASE_URL}users`,
  getUserPosts: `${BASE_URL}posts/profile/`,
  likePost: `${BASE_URL}posts/`,
  createPost: `${BASE_URL}posts`,
  createStory: `${BASE_URL}stories`,
  updateStory: `${BASE_URL}stories`,
  deleteStory: `${BASE_URL}stories`,
  getAllStories: `${BASE_URL}stories/`,
  getTotalPostsCountByUsername: `${BASE_URL}posts/count/postCount`,
  getTotalPostsCountTimeline: `${BASE_URL}posts/count/postCount/timeline`,
  deletePost: `${BASE_URL}posts`,
  getPost: `${BASE_URL}posts/`,
  updatePost: `${BASE_URL}posts`,
  getActivities: `${BASE_URL}users/getActivitiesFile`,
  getFeelings: `${BASE_URL}users/getFeelingsFile`,
  getFriends: `${BASE_URL}users/friends/`,
  getFriendsByUsername: `${BASE_URL}users/getFriendsByUsername/`,
  followUser: `${BASE_URL}users`,
  unfollowUser: `${BASE_URL}users`,
  getAllUsers: `${BASE_URL}users/getAllUsers/`,
  getMyFollowings: `${BASE_URL}users/getMyFollowings`,
  updateCoverImageUser: `${BASE_URL}users/`,
  updateUserProfile: `${BASE_URL}users/`,
  updateUserProfilePicture: `${BASE_URL}users/`,
  addCommentToPost: `${BASE_URL}posts/addCommentToPost`,
  deleteCommentFromPost: `${BASE_URL}posts/deleteCommentFromPost`,
  getComment: `${BASE_URL}posts/getComment`,
  updateComment: `${BASE_URL}posts/updateComment`,
  getPostLikes: `${BASE_URL}posts/getPostLikes/`,
  getCommentLikes: `${BASE_URL}posts/getCommentLikes/`,
  likeComment: `${BASE_URL}posts/`,
  getUsersByUsername: `${BASE_URL}users/getUsersByUsername`,
  createNotification: `${BASE_URL}notifications/createNotification`,
  getAllNotifications: `${BASE_URL}notifications/getAllNotifications`,
  deleteNotification: `${BASE_URL}notifications/deleteNotification/`,
  searchUsers: `${BASE_URL}users/searchUsers`,
  searchAllUsers: `${BASE_URL}users/searchAllUsers`,
  deleteUser: `${BASE_URL}users`,
  getUsersStats: `${BASE_URL}users/getUsersStats`,
  getNewUsers: `${BASE_URL}users/getNewUsers`,
  addUsersToBlockedList: `${BASE_URL}users/addUsersToBlockedList`,
  removeUsersFromBlockedList: `${BASE_URL}users/removeUsersFromBlockedList`,
  searchBlockedListUsers: `${BASE_URL}users/searchBlockedListUsers`,
  updateTimeSpentInApp: `${BASE_URL}users/updateTimeSpentInApp/`,
  getTimeSpentInApp: `${BASE_URL}users/getTimeSpentInApp/`,
  findAllUsers: `${BASE_URL}users/findAllUsers`,
  getDiskInfo: `${BASE_URL}system/disk`,
  getDeviceInfo: `${BASE_URL}system/os`,
  updateNotificationStatus: `${BASE_URL}users/updateNotificationsStatus/`,
  getNotificationsStatus: `${BASE_URL}users/getNotificationsStatus/`,
  createItem: `${BASE_URL}items`,
  searchItems: `${BASE_URL}items`,
  getItem: `${BASE_URL}items/`,
  updateItem: `${BASE_URL}items/`,
  deleteItem: `${BASE_URL}items/`,
  createVehicle: `${BASE_URL}vehicles/`,
  searchVehicles: `${BASE_URL}vehicles`,
  getVehicle: `${BASE_URL}vehicles/`,
  updateVehicle: `${BASE_URL}vehicles/`,
  deleteVehicle: `${BASE_URL}vehicles/`,
  createProperty: `${BASE_URL}property/`,
  searchProperties: `${BASE_URL}property`,
  deleteProperty: `${BASE_URL}property/`,
  getProperty: `${BASE_URL}property/`,
  updateProperty: `${BASE_URL}property/`,
  createChat: `${BASE_URL}chat/createChat`,
  getChats: `${BASE_URL}chat/fetchChat`,
  getAllChatMessages: `${BASE_URL}messages/getAllMessages/`,
  sendNewChatMessage: `${BASE_URL}messages/sendMessage`,
  createChatNotification: `${BASE_URL}chatNotifications/createChatNotification`,
  getAllChatNotifications: `${BASE_URL}chatNotifications/getAllChatNotifications`,
  removeChatNotification: `${BASE_URL}chatNotifications/removeChatNotification/`,
  filterPosts: `${BASE_URL}posts/filterPosts`,
  filterUserPosts: `${BASE_URL}posts/filterUserPosts`,
};

export const login = (email, password) => {
  try {
    return axios.post(API_URLS.login, { email, password });
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = (email) => {
  try {
    return axios.post(API_URLS.forgotPassword, { email });
  } catch (error) {
    throw error;
  }
};

export const resetPassword = (token, password) => {
  try {
    return axios.post(API_URLS.resetPassword, { token, password });
  } catch (error) {
    throw error;
  }
};

export const register = (user) => {
  try {
    return axios.post(API_URLS.register, user);
  } catch (error) {
    throw error;
  }
};

export const likePost = (postId, userId) => {
  try {
    return axios.put(`${API_URLS.likePost}${postId}/like`, { userId });
  } catch (error) {
    throw error;
  }
};

export const likeComment = (postId, commentId, userId) => {
  try {
    return axios.put(`${API_URLS.likePost}${postId}/${commentId}/like`, {
      userId,
    });
  } catch (error) {
    throw error;
  }
};

export const getPostLikes = (postId) => {
  try {
    return axios.get(`${API_URLS.getPostLikes}${postId}`);
  } catch (error) {
    throw error;
  }
};

export const getCommentLikes = (postId, commentId) => {
  try {
    return axios.get(`${API_URLS.getCommentLikes}${postId}/${commentId}`);
  } catch (error) {
    throw error;
  }
};

export const createPost = (post) => {
  try {
    return axios.post(API_URLS.createPost, post);
  } catch (error) {
    throw error;
  }
};

export const createStory = (story) => {
  try {
    return axios.post(API_URLS.createStory, story);
  } catch (error) {
    throw error;
  }
};

export const updateStory = (userId, updatedStory) => {
  try {
    return axios.put(`${API_URLS.updateStory}/${userId}`, updatedStory);
  } catch (error) {
    throw error;
  }
};

export const deleteStory = (storyId, fileId) => {
  try {
    return axios.delete(`${API_URLS.deleteStory}/${storyId}/${fileId}`);
  } catch (error) {
    throw error;
  }
};

export const getAllStories = (userId) => {
  try {
    return axios.get(`${API_URLS.getAllStories}${userId}`);
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = (userId, page) => {
  try {
    return axios.get(`${API_URLS.getAllPosts}${userId}?page=${page}`);
  } catch (error) {
    throw error;
  }
};

export const getUserById = (userId) => {
  try {
    return axios.get(`${API_URLS.getUserById}?userId=${userId}`);
  } catch (error) {
    throw error;
  }
};

export const getUserByUsername = (username) => {
  try {
    return axios.get(`${API_URLS.getUserByUsername}?username=${username}`);
  } catch (error) {
    throw error;
  }
};

export const getUserPosts = (username, page) => {
  try {
    return axios.get(`${API_URLS.getUserPosts}${username}?page=${page}`);
  } catch (error) {
    throw error;
  }
};

export const getTotalPostsCountByUsername = (username) => {
  try {
    return axios.get(`${API_URLS.getTotalPostsCountByUsername}/${username}`);
  } catch (error) {
    throw error;
  }
};

export const getTotalPostsCountTimeline = (userId) => {
  try {
    return axios.get(`${API_URLS.getTotalPostsCountTimeline}/${userId}`);
  } catch (error) {
    throw error;
  }
};

export const deletePost = (postId, userId) => {
  try {
    return axios.delete(`${API_URLS.deletePost}/${postId}`, {
      data: { userId },
    });
  } catch (error) {
    throw error;
  }
};

export const getPost = (postId) => {
  try {
    return axios.get(`${API_URLS.getPost}/${postId}`);
  } catch (error) {
    throw error;
  }
};

export const updatePost = (postId, userId, postToUpdate) => {
  try {
    return axios.put(`${API_URLS.updatePost}/${postId}`, {
      userId,
      postToUpdate,
    });
  } catch (error) {
    throw error;
  }
};

export const getActivities = () => {
  try {
    return axios.get(`${API_URLS.getActivities}`);
  } catch (error) {
    throw error;
  }
};

export const getFeelings = () => {
  try {
    return axios.get(`${API_URLS.getFeelings}`);
  } catch (error) {
    throw error;
  }
};

export const getFriends = (userId) => {
  try {
    return axios.get(`${API_URLS.getFriends}${userId}`);
  } catch (error) {
    throw error;
  }
};

export const getFriendsByUsername = (username) => {
  try {
    return axios.get(`${API_URLS.getFriendsByUsername}${username}`);
  } catch (error) {
    throw error;
  }
};

export const followUser = (id, currentUserId) => {
  try {
    return axios.put(`${API_URLS.followUser}/${id}/follow`, {
      userId: currentUserId,
    });
  } catch (error) {
    throw error;
  }
};

export const unfollowUser = (id, currentUserId) => {
  try {
    return axios.put(`${API_URLS.unfollowUser}/${id}/unfollow`, {
      userId: currentUserId,
    });
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = (userId) => {
  try {
    return axios.get(`${API_URLS.getAllUsers}${userId}`);
  } catch (error) {
    throw error;
  }
};

export const findAllUsers = () => {
  try {
    return axios.get(`${API_URLS.findAllUsers}`);
  } catch (error) {
    throw error;
  }
};

export const getMyFollowings = (userId) => {
  try {
    return axios.get(`${API_URLS.getMyFollowings}/${userId}`);
  } catch (error) {
    throw error;
  }
};

export const updateCoverImageUser = (userId, file) => {
  try {
    return axios.put(`${API_URLS.updateCoverImageUser}${userId}`, {
      userId,
      coverPicture: file,
    });
  } catch (error) {
    throw error;
  }
};

export const updateUserProfilePicture = (userId, file) => {
  try {
    return axios.put(`${API_URLS.updateUserProfilePicture}${userId}`, {
      userId,
      profilePicture: file,
    });
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = (
  userId,
  file,
  username,
  email,
  password,
  desc,
  city,
  from,
  status,
  birthday
) => {
  try {
    return axios.put(`${API_URLS.updateCoverImageUser}${userId}`, {
      userId,
      profilePicture: file,
      username,
      email,
      password,
      desc,
      city,
      from,
      relationship: status,
      birthday,
    });
  } catch (error) {
    throw error;
  }
};

export const addCommentToPost = (postId, newComment) => {
  try {
    return axios.post(`${API_URLS.addCommentToPost}/${postId}`, { newComment });
  } catch (error) {
    throw error;
  }
};

export const deleteCommentFromPost = (postId, commentId) => {
  try {
    return axios.delete(
      `${API_URLS.deleteCommentFromPost}/${postId}/${commentId}`
    );
  } catch (error) {
    throw error;
  }
};

export const getComment = (postId, commentId) => {
  try {
    return axios.get(`${API_URLS.getComment}/${postId}/${commentId}`);
  } catch (error) {
    throw error;
  }
};

export const updateComment = (postId, commentId, content) => {
  try {
    return axios.put(`${API_URLS.updateComment}/${postId}/${commentId}`, {
      content,
    });
  } catch (error) {
    throw error;
  }
};

export const getUsersByUsername = (users) => {
  try {
    return axios.post(`${API_URLS.getUsersByUsername}`, {
      users,
    });
  } catch (error) {
    throw error;
  }
};

export const createNotification = (content) => {
  try {
    return axios.post(`${API_URLS.createNotification}`, {
      recipientId: content.recipientId,
      sender: content.sender,
      content: content.content,
      post: content.post,
    });
  } catch (error) {
    throw error;
  }
};

export const getAllNotifications = () => {
  try {
    return axios.get(`${API_URLS.getAllNotifications}`);
  } catch (error) {
    throw error;
  }
};

export const deleteNotification = (notificationId) => {
  try {
    return axios.delete(`${API_URLS.deleteNotification}${notificationId}`);
  } catch (error) {
    throw error;
  }
};

export const searchUsers = (searchQuery) => {
  try {
    return axios.get(`${API_URLS.searchUsers}?query=${searchQuery}`);
  } catch (error) {
    throw error;
  }
};

export const searchAllUsers = (searchQuery) => {
  try {
    return axios.get(`${API_URLS.searchAllUsers}?query=${searchQuery}`);
  } catch (error) {
    throw error;
  }
};

export const deleteUser = (userId) => {
  try {
    return axios.delete(`${API_URLS.deleteUser}/${userId}`);
  } catch (error) {
    throw error;
  }
};

export const getUsersStats = () => {
  try {
    return axios.get(`${API_URLS.getUsersStats}`);
  } catch (error) {
    throw error;
  }
};

export const getNewUsers = () => {
  try {
    return axios.get(`${API_URLS.getNewUsers}`);
  } catch (error) {
    throw error;
  }
};

export const addUsersToBlockedList = (usersToBlock) => {
  try {
    return axios.post(`${API_URLS.addUsersToBlockedList}`, { usersToBlock });
  } catch (error) {
    throw error;
  }
};

export const removeUsersFromBlockedList = (usersToUnBlock) => {
  try {
    return axios.post(`${API_URLS.removeUsersFromBlockedList}`, {
      usersToUnBlock,
    });
  } catch (error) {
    throw error;
  }
};

export const searchBlockedListUsers = (search) => {
  try {
    return axios.get(`${API_URLS.searchBlockedListUsers}?search=${search}`);
  } catch (error) {
    throw error;
  }
};

export const updateTimeSpentInApp = (userId, currentDate, timeSpent) => {
  try {
    console.log(userId, currentDate, timeSpent);
    return axios.post(`${API_URLS.updateTimeSpentInApp}${userId}`, {
      currentDate: currentDate,
      timeSpent: timeSpent,
    });
  } catch (error) {
    throw error;
  }
};

export const getTimeSpentInApp = (userId) => {
  try {
    return axios.get(`${API_URLS.getTimeSpentInApp}${userId}`);
  } catch (error) {
    throw error;
  }
};

export const getDiskInfo = () => {
  try {
    return axios.get(`${API_URLS.getDiskInfo}`);
  } catch (error) {
    throw error;
  }
};

export const getDeviceInfo = () => {
  try {
    return axios.get(`${API_URLS.getDeviceInfo}`);
  } catch (error) {
    throw error;
  }
};

export const updateNotificationStatus = (userId, isNotificationOn) => {
  try {
    return axios.put(`${API_URLS.updateNotificationStatus}${userId}`, {
      on: isNotificationOn,
    });
  } catch (error) {
    throw error;
  }
};

export const getNotificationsStatus = (userId) => {
  try {
    return axios.get(`${API_URLS.getNotificationsStatus}${userId}`);
  } catch (error) {
    throw error;
  }
};

export const createItem = (item) => {
  try {
    return axios.post(`${API_URLS.createItem}`, item);
  } catch (error) {
    throw error;
  }
};

export const searchItems = (
  searchQuery,
  selectedSortByValue,
  selectedFiltersByCondition,
  selectedItemsByCategory,
  minPrice,
  maxPrice
) => {
  const params = {
    query: searchQuery,
    sort: selectedSortByValue,
    condition: selectedFiltersByCondition,
    category: selectedItemsByCategory,
    minPrice,
    maxPrice,
  };

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== null && value !== ""
    )
  );

  const queryString = new URLSearchParams(filteredParams).toString();
  const apiUrl = `${API_URLS.searchItems}?${queryString}`;

  try {
    return axios.get(apiUrl);
  } catch (error) {
    throw error;
  }
};

export const getItem = (itemId) => {
  try {
    return axios.get(`${API_URLS.getItem}${itemId}`);
  } catch (error) {
    throw error;
  }
};

export const deleteItem = (itemId) => {
  try {
    return axios.delete(`${API_URLS.deleteItem}${itemId}`);
  } catch (error) {
    throw error;
  }
};

export const deleteVehicle = (vehicleId) => {
  try {
    return axios.delete(`${API_URLS.deleteVehicle}${vehicleId}`);
  } catch (error) {
    throw error;
  }
};

export const updateItem = (itemId, updatedItem) => {
  try {
    return axios.put(`${API_URLS.updateItem}${itemId}`, { updatedItem });
  } catch (error) {
    throw error;
  }
};

export const createVehicle = (vehicle) => {
  try {
    return axios.post(`${API_URLS.createVehicle}`, vehicle);
  } catch (error) {
    throw error;
  }
};

export const searchVehicles = (
  searchQuery,
  selectedSortVehiclesByValue,
  selectedVehiclesByType,
  selectedVehiclesByBodyStyle,
  selectedVehiclesByCondition,
  selectedVehiclesByFuelType,
  selectedVehiclesByTransmission,
  minVehiclesPrice,
  maxVehiclesPrice
) => {
  const params = {
    query: searchQuery,
    sort: selectedSortVehiclesByValue,
    type: selectedVehiclesByType,
    bodyStyle: selectedVehiclesByBodyStyle,
    condition: selectedVehiclesByCondition,
    fuelType: selectedVehiclesByFuelType,
    transmission: selectedVehiclesByTransmission,
    minPrice: minVehiclesPrice,
    maxPrice: maxVehiclesPrice,
  };

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== null && value !== ""
    )
  );

  const queryString = new URLSearchParams(filteredParams).toString();
  const apiUrl = `${API_URLS.searchVehicles}?${queryString}`;

  try {
    return axios.get(apiUrl);
  } catch (error) {
    throw error;
  }
};

export const getVehicle = (vehicleId) => {
  try {
    return axios.get(`${API_URLS.getVehicle}${vehicleId}`);
  } catch (error) {
    throw error;
  }
};

export const updateVehicle = (vehicleId, updatedVehicle) => {
  try {
    return axios.put(`${API_URLS.updateVehicle}${vehicleId}`, {
      updatedVehicle,
    });
  } catch (error) {
    throw error;
  }
};

export const createProperty = (property) => {
  try {
    return axios.post(`${API_URLS.createProperty}`, property);
  } catch (error) {
    throw error;
  }
};

export const getProperty = (propertyId) => {
  try {
    return axios.get(`${API_URLS.getProperty}${propertyId}`);
  } catch (error) {
    throw error;
  }
};

export const searchProperties = (
  searchQuery,
  selectedSortPropertyByValue,
  selectedPropertyByType,
  selectedPropertyByBedrooms,
  selectedPropertyByBathrooms,
  selectedPropertyByWashingMachine,
  selectedPropertyParkingType,
  selectedPropertyByAirconditioning,
  selectedPropertyByHeatingType,
  selectedPropertyByCatFriendly,
  selectedPropertyByDogFriendly,
  squareFeetMin,
  squareFeetMax,
  minPropertyPrice,
  maxPropertyPrice
) => {
  const params = {
    query: searchQuery,
    sort: selectedSortPropertyByValue,
    type: selectedPropertyByType,
    bedrooms: selectedPropertyByBedrooms,
    bathrooms: selectedPropertyByBathrooms,
    washingMachine: selectedPropertyByWashingMachine,
    parkingType: selectedPropertyParkingType,
    airConditioning: selectedPropertyByAirconditioning,
    heatingType: selectedPropertyByHeatingType,
    catFriendly: selectedPropertyByCatFriendly,
    dogFriendly: selectedPropertyByDogFriendly,
    squareFeetMin,
    squareFeetMax,
    minPrice: minPropertyPrice,
    maxPrice: maxPropertyPrice,
  };

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== null && value !== ""
    )
  );

  const queryString = new URLSearchParams(filteredParams).toString();
  const apiUrl = `${API_URLS.searchProperties}?${queryString}`;

  try {
    return axios.get(apiUrl);
  } catch (error) {
    throw error;
  }
};

export const deleteProperty = (propertyId) => {
  try {
    return axios.delete(`${API_URLS.deleteProperty}${propertyId}`);
  } catch (error) {
    throw error;
  }
};

export const updateProperty = (propertyId, updatedProperty) => {
  try {
    return axios.put(`${API_URLS.updateProperty}${propertyId}`, {
      updatedProperty,
    });
  } catch (error) {
    throw error;
  }
};

export const createChat = (userId) => {
  try {
    return axios.post(`${API_URLS.createChat}`, { userId });
  } catch (error) {
    throw error;
  }
};

export const getChats = () => {
  try {
    return axios.get(`${API_URLS.getChats}`);
  } catch (error) {
    throw error;
  }
};

export const getAllChatMessages = (chatId) => {
  try {
    return axios.get(`${API_URLS.getAllChatMessages}${chatId}`);
  } catch (error) {
    throw error;
  }
};

export const sendNewChatMessage = (formData) => {
  try {
    return axios.post(`${API_URLS.sendNewChatMessage}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    throw error;
  }
};

export const createChatNotification = (data) => {
  try {
    return axios.post(`${API_URLS.createChatNotification}`, { data });
  } catch (error) {
    throw error;
  }
};

export const getAllChatNotifications = () => {
  try {
    return axios.get(`${API_URLS.getAllChatNotifications}`);
  } catch (error) {
    throw error;
  }
};

export const removeChatNotificationApiCall = (notificationId) => {
  try {
    return axios.delete(`${API_URLS.removeChatNotification}${notificationId}`);
  } catch (error) {
    throw error;
  }
};

export const filterPosts = (fromDate, toDate, userId) => {
  try {
    return axios.post(`${API_URLS.filterPosts}`, {
      fromDate,
      toDate,
      userId,
    });
  } catch (error) {
    throw error;
  }
};

export const filterUserPosts = (username, fromDate, toDate) => {
  try {
    return axios.post(`${API_URLS.filterUserPosts}`, {
      fromDate,
      toDate,
      username,
    });
  } catch (error) {
    throw error;
  }
};
