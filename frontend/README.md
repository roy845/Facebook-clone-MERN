# <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/256px-Facebook_icon.svg.png" height="48" width = "48"/> Fullstack Facebook App

This is a Fullstack Facebook App built with React for the frontend, NodeJS and Express for the backend, MongoDB for the database, Firebase Storage for file storage, SocketIO for realtime messaging and Docker for containerization.

## Technology stack

- **Docker**
  <img src="https://icon-icons.com/icons2/2699/PNG/512/docker_official_logo_icon_169250.png" width="124px" height="124px">

- **React**
  <img src="https://upload.wikimedia.org/wikipedia/he/a/a7/React-icon.svg" width="124px" height="124px">
- **MongoDB**
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" width="124px" height="124px">
- **NodeJs**
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="124px" height="124px">

- **Express**
  <img src = "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width = "60px" height = "60px">

- **JWT (JSON Web Tokens)**
  <img src = "https://cdn.worldvectorlogo.com/logos/jwt-3.svg" width = "60px" height = "60px">

- **Nodemailer**
  <img src = "https://i0.wp.com/community.nodemailer.com/wp-content/uploads/2015/10/n2-2.png?w=422&ssl=1" width = "60px" height = "60px">

- **Material UI**
  <a href="https://ibb.co/VtWN1my"><img src="https://i.ibb.co/wRNLksH/mui-logo.png" alt="mui-logo" width = "60px" height = "60px"></a>

- **Chakra UI**
  <img src="https://i.ibb.co/4Sg46gN/chakra-ui-logo.png" width="124px" height="124px">

- <b>Real-Time Data Transfer:</b> SocketIO

 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/600px-Socket-io.svg.png?20200308235956" width="124px" height="124px">

- **Firebase**
  <img src = "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-firebase-icon.png" width = "60px" height = "60px">

- **VSCODE**
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" width="60px" height="60px">

## Project structure

<a href="https://ibb.co/pvyYkkc"><img src="https://i.ibb.co/GvTzrry/System-structure.png" alt="System-structure" border="1"></a>

## Database Schemas

https://www.docdroid.net/yMULei0/facebook-schemas-pdf

## Installation and Setup

<b>Clone the repository git clone https://github.com/roy845/Facebook-clone-MERN.git</b>

### Client

Prepare .env file in the root frontend directory with the following details:
REACT_APP_PUBLIC_FOLDER = http://localhost:8800/images/
//Firebase connection - create firebase project through firebase console site - https://console.firebase.google.com/u/0/

REACT_APP_APIKEY=
REACT_APP_AUTHDOMAIN=
REACT_APP_PROJECTID=
REACT_APP_STORAGEBUCKET=
REACT_APP_MESSAGINGSENDERID=
REACT_APP_APPID=
REACT_APP_MEASUREMENTID=

<b>Install the dependencies and start the client</b>

1. Open a new terminal in VSCODE.
2. Navigate to the frontend directory: cd frontend.
3. Install dependencies: npm/yarn install.
4. Run the client: npm/yarn start.

### Server

Prepare .env file in the root backend directory with the following details:
PORT=
MONGO_URL=
JWT_SECRET_KEY=
EMAIL_USERNAME=
EMAIL_PASSWORD=

Here is how you can generate a JWT key:

Open a terminal.

Type the following command and press Enter to generate a random JWT secret key

require('crypto').randomBytes(32).toString('hex')

Copy the generated secret key.

Open the .env file in the server directory.

Set the JWT_SECRET_KEY variable by pasting the generated secret key.

For example:

JWT_SECRET_KEY=generated_secret_key

<b>Install the dependencies and start the server</b>

1. Open a new terminal in VSCODE.
2. Navigate to the backend directory: cd backend.
3. Install dependencies: npm/yarn install.
4. Run the server: npm/yarn start.

<b>Run in docker environment</b>
Open Dockerfile file in the root of the backend directory
and put this content in there:

FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 8800

CMD ["npm", "start"]

Open .dockerignore file in the root of the backend directory and put this content in there:
node_modules

#### Build the docker image

1. Open a new terminal in VSCODE.
2. Type docker build -t imagename:latest .

#### Run the docker image

1. docker run --name containername -p portnumber:portnumber -d imagename
2. open the browser and type http://localhost:8800

#### Stop the docker container

1. Open a new terminal in VSCODE.
1. list all the running containers with the command: docker ps -a
1. Stop the container with the command: docker container stop container_name_or_id

## Features

- <b>User Authentication</b>
  Users can sign up, log in, and log out securely using jwt authentication system and also reset their password.

<br/>

- <b>Login</b>
  <a href="https://ibb.co/FwFbDZb"><img src="https://i.ibb.co/VSsWqnW/Signin.png" alt="Signin" border="1"></a>

- <b>Register</b>
  <a href="https://ibb.co/wd5zrGh"><img src="https://i.ibb.co/zmq4H9V/Signup.png" alt="Signup" border="1"></a>

- <b>Forgot password</b>
  <a href="https://ibb.co/Rggw8cb"><img src="https://i.ibb.co/p11Fqdw/Forgot-password.png" alt="Forgot-password" border="1"></a>
- <b>Reset Password</b>
  <a href="https://ibb.co/ZMbFckf"><img src="https://i.ibb.co/fxTyrPX/Reset-password.png" alt="Reset-password" border="1"></a>

- <b>Menu navigation</b>
  Users can navigate through two user navigations

  <br/>
  <a href="https://ibb.co/kHHcRhK"><img src="https://i.ibb.co/TvvhVHc/Menu-navigation.png" alt="Menu-navigation" border="1"></a>

- <b>User profile page</b>
  Users can view and update their information and information about other users they choose to follow in their profile page.
  They can also view and post new posts and filter their posts by range of dates.

  \*The posts are shown two at the time and when the user wants to load more there is a load more button at the bottom of the feed

  <a href="https://ibb.co/Sd5SgYD"><img src="https://i.ibb.co/s6b74xp/Load-more-posts-button-profile-page.png" alt="Load-more-posts-button-profile-page" border="0"></a>

- <b>Profile page</b>
  <a href="https://ibb.co/8Nkrdp2"><img src="https://i.ibb.co/PFkc9n4/User-profile.png" alt="User-profile" border="1"></a>

- <b>Update cover picture</b>
  <a href="https://ibb.co/GCV6snw"><img src="https://i.ibb.co/KV9PNbZ/Update-cover-picture.png" alt="Update-cover-picture" border="1"></a>

- <b>Update profile information</b>
  <a href="https://ibb.co/52sVnqt"><img src="https://i.ibb.co/Pt189B3/Update-profile.png" alt="Update-profile" border="1"></a>

- <b>Users search</b>
  Users can search other users using the search field found at the top bar and navigate to their profile page
  <a href="https://ibb.co/Zh0SJt3"><img src="https://i.ibb.co/rZV3tTg/Users-search.png" alt="Users-search" border="1"></a>

- <b>Other user profile page</b>
  Users can follow/unfollow other users using the Follow/Unfollow button
  <a href="https://ibb.co/NtDz88x"><img src="https://i.ibb.co/xX9Qpph/other-user-profile-page.png" alt="other-user-profile-page" border="1"></a>

- <b>Once they follow a user they can view all the user information and their posts and all the user's posts is added to their feed</b>
  <a href="https://ibb.co/5hsSW1n"><img src="https://i.ibb.co/d4kV0fL/follow-other-user.png" alt="follow-other-user" border="1"></a>

  <b> \*\* Admins can update the cover image and user profile details of other users</b>

- <b>Settings</b>
  Users can enable/disable getting notifications and can block/unblock other users
  <a href="https://ibb.co/xfvJfgB"><img src="https://i.ibb.co/VQy2QCz/Settings.png" alt="Settings" border="1"></a>

- <b>Block users</b>
  To block a user simply search them and click on them to add it to the user's blocked list if you want to remove them from the list click on the X button

  after all the changes been made click save to save the changes
  <a href="https://ibb.co/fM99S0b"><img src="https://i.ibb.co/K6DDGyY/Block-users.png" alt="Block-users" border="1"></a>

- <b>Unblock users</b>
  To unblock a user simply search them and click on them to add them to the user's unblocked list if you want to remove them from the list click on the X button

  after all the changes been made click save to save the changes

  <a href="https://ibb.co/RhzqJds"><img src="https://i.ibb.co/rb4VXNz/Unblock-users.png" alt="Unblock-users" border="1"></a>

- <b>Feed</b>
  Users can share on this page their thoughts/feelings/activities and locations through posting new posts. all their posts and their friends are in this page.
  Users can also attach files to the newly creatd post (files supported are images,videos,songs)
  Users can also tag another user they follow in a post or comment and the mentioned user will get a notification about it
  Posts filtering by range of dates is also available and users can see which friends are online in real time
  Users can also upload and create/update and view their story and view other friends stories

- <b>Online Friends</b>
  <a href="https://imgbb.com/"><img src="https://i.ibb.co/5YGkZ0p/Online-friends.png" alt="Online-friends" border="1"></a>

- <b>Thoughts sharing</b>
  <a href="https://ibb.co/VHtzwmc"><img src="https://i.ibb.co/xmDBFHt/Thougs-sharing-feed-page.png" alt="Thougs-sharing-feed-page" border="1"></a>

- <b>Attaching files</b>
  <a href="https://ibb.co/3rgbTwv"><img src="https://i.ibb.co/sm84ghC/attaching-files.png" alt="attaching-files" border="1"></a>

- <b>Location sharing</b>
  <a href="https://ibb.co/2hN52XM"><img src="https://i.ibb.co/SyrJTqm/Location-sharing.png" alt="Location-sharing" border="1"></a>

- <b>Activity sharing</b>
  <a href="https://ibb.co/RHnz407"><img src="https://i.ibb.co/w6HMrWY/Sharing-activity.png" alt="Sharing-activity" border="1"></a>

- <b>Feeling sharing</b>
  <a href="https://ibb.co/nn4PMzW"><img src="https://i.ibb.co/0F1syhw/Sharing-feeling.png" alt="Sharing-feeling" border="1"></a>

<b>Tagging user in a post</b>
Users can tag a friend user in a post by using the @ sign
once they write @ a popover of user friends will pop to choose from
<a href="https://ibb.co/nBq4jGM"><img src="https://i.ibb.co/dtsXDT4/friends-tagging-in-a-post.png" alt="friends-tagging-in-a-post" border="1"></a>

Once the friend is tagged in a post he/she will get notification about it

<a href="https://ibb.co/dkCy1fg"><img src="https://i.ibb.co/CVCFNw2/Post-tag-notification.png" alt="Post-tag-notification" border="1"></a>

<b>Tagging user in a comment</b>
Users can tag a friend user in a comment by using the @ sign
once they write @ a popover of user friends will pop to choose from
<a href="https://ibb.co/JzSjnNq"><img src="https://i.ibb.co/0fzyqkK/comment-tag.png" alt="comment-tag" border="1"></a>
<a href="https://ibb.co/KVGjygt"><img src="https://i.ibb.co/QYcFmVW/tag-user-in-a-comment.png" alt="tag-user-in-a-comment" border="1"></a>

Once the user is tegged he/she will get a notification
<a href="https://ibb.co/ctWbss8"><img src="https://i.ibb.co/sQT5XX1/tag-user-in-a-comment2.png" alt="tag-user-in-a-comment2" border="1"></a>

Clicking on the notification will remove it from the list menu and will navigate to the relevant post page
<a href="https://ibb.co/HY1Cvmv"><img src="https://i.ibb.co/RPZNnLn/post-page.png" alt="post-page" border="1"></a>

- <b>Post filtering</b>
  <a href="https://ibb.co/D934PxM"><img src="https://i.ibb.co/McqnyY1/Post-filtering.png" alt="Post-filtering" border="1"></a>

- <b>Post actions</b>
  Users can Delete/Update Like/Dislike a post and view comments (Admin can update and delete other user's post)
  <a href="https://ibb.co/nk75r8S"><img src="https://i.ibb.co/6sHfYJ5/Post-actions.png" alt="Post-actions" border="1"></a>

- <b>Like/Dislike post</b>
  <a href="https://imgbb.com/"><img src="https://i.ibb.co/Nj794zR/post-like-dislike.png" alt="post-like-dislike" border="1"></a>

- <a href="https://ibb.co/QQsdRtF"><img src="https://i.ibb.co/C8x2ZD5/Posts-likes.png" alt="Posts-likes" border="0"></a>

- <b>Delete post</b>
  <a href="https://ibb.co/b66kh8X"><img src="https://i.ibb.co/kGGtnWX/Delete-post.png" alt="Delete-post" border="1"></a>

- <b>Update post</b>
  <a href="https://ibb.co/S3760Ym"><img src="https://i.ibb.co/3CYTW6F/Update-post.png" alt="Update-post" border="1"></a>

- <b>Post comments</b>
  <a href="https://ibb.co/G0tPgsz"><img src="https://i.ibb.co/Dt8K3G0/Post-comments.png" alt="Post-comments" border="0"></a>

- <b>Comment like/dislike</b>
  <a href="https://imgbb.com/"><img src="https://i.ibb.co/GWtdTFq/Comment-likingdisliking.png" alt="Comment-likingdisliking" border="1"></a>
- <a href="https://ibb.co/PGCBkfF"><img src="https://i.ibb.co/jk47t1b/Comment-likes.png" alt="Comment-likes" border="0"></a>

- <b>Delete comment</b>
  <a href="https://ibb.co/bHcnqcg"><img src="https://i.ibb.co/1sFxhFf/Delete-comment.png" alt="Delete-comment" border="1"></a>

- <b>Update comment</b>
  <a href="https://ibb.co/BzyWD3d"><img src="https://i.ibb.co/K024ZhR/Update-comment.png" alt="Update-comment" border="1"></a>

- <b>Create/Update story</b>
  <a href="https://ibb.co/V2j9rHP"><img src="https://i.ibb.co/GcxpBsb/Create-Update-story.png" alt="Create-Update-story" border="1"></a>

- <b>Story</b>
  <a href="https://imgbb.com/"><img src="https://i.ibb.co/98vyCF5/Story-image.png" alt="Story-image" border="1"></a>
- <b>View story</b>
  The story is divided into 3 sections and users can upload all 3 kinds of files to their story to be watched by themselves/others: - Images - Songs - Videos
  <a href="https://ibb.co/NFPPcN2"><img src="https://i.ibb.co/L0WWVgd/View-story.png" alt="View-story" border="1"></a>

- <b>Statistics</b>
  Users can view their time spent in app statistics either in graphs or a table

- <b>Graph view</b>
  <a href="https://ibb.co/FxFdWkx"><img src="https://i.ibb.co/GxqrJfx/User-statistics.png" alt="User-statistics" border="1"></a>

- <b>Table view</b>
  <a href="https://ibb.co/1m1R2Zb"><img src="https://i.ibb.co/S3bVvNJ/User-statistics-table.png" alt="User-statistics-table" border="1"></a>

- <b>Device info</b>
  Users can view information about their device (memory/disk space / architechture)
  <a href="https://ibb.co/9nnBTZM"><img src="https://i.ibb.co/hssrWYq/Device-info.png" alt="Device-info" border="1"></a>

- <b>Speed test</b>
  Users can perform speed test via external website (ookla speed test)
  <a href="https://ibb.co/5kpsbyY"><img src="https://i.ibb.co/VxnMfZH/speed-test.png" alt="speed-test" border="1"></a>

- <b>Messenger</b>
  There is a messenger chat app which users can sends messages to each other and attach files
  <a href="https://ibb.co/HhGBtyF"><img src="https://i.ibb.co/fDrqkW1/Chats-nav.png" alt="Chats-nav" border="1"></a>

  <a href="https://ibb.co/Qpg3CFq"><img src="https://i.ibb.co/Jm1wyRb/messenger-page.png" alt="messenger-page" border="1"></a>

  <b>Add users to chats</b>
  Users can add new users to chat
  <a href="https://ibb.co/RHs284V"><img src="https://i.ibb.co/h84s01t/Add-users-to-chat.png" alt="Add-users-to-chat" border="1"></a>

  <b>Search chats</b>
  Users can search users to chat with
  <a href="https://ibb.co/br9WShC"><img src="https://i.ibb.co/tbrm7fv/Search-chats.png" alt="Search-chats" border="1"></a>
  <b>Send message</b>
  <a href="https://ibb.co/2SgCrsf"><img src="https://i.ibb.co/qCkc8WP/send-chat-message.png" alt="send-chat-message" border="1"></a>
  <b>Attach files</b>
  <a href="https://ibb.co/yBSYSt6"><img src="https://i.ibb.co/tPXxXgq/Attach-chat-files.png" alt="Attach-chat-files" border="1"></a>
  <b>Send emoji's</b>
  <a href="https://ibb.co/VjCQq5Q"><img src="https://i.ibb.co/C19MHDM/Send-emoji-s.png" alt="Send-emoji-s" border="1"></a>
  <b>Search messages</b>
  Users can search messages and the part that being searched will glow in yellow background
  <a href="https://ibb.co/XF71wfZ"><img src="https://i.ibb.co/BTyb1HV/search-messages.png" alt="search-messages" border="1"></a>
  <b>Chat notifications</b>
  Users can get chat notifications when their friend's chat is not selected/focused. clicking on the message notification will remove it from the list menu
  <a href="https://ibb.co/YbjhzVS"><img src="https://i.ibb.co/3khcDPb/Chat-notifications.png" alt="Chat-notifications" border="1"></a>

- <b>Market place</b>
  Users can view/buy items/vehicles/apartments for sale/rent
  <a href="https://imgbb.com/"><img src="https://i.ibb.co/48cr29t/Market-place-nav.png" alt="Market-place-nav" border="1"></a>

  <a href="https://ibb.co/F8jTGGd"><img src="https://i.ibb.co/DwS233j/Market-place.png" alt="Market-place" border="1"></a>

  <b> Create new item/vehicle/house for sale/rent</b>
  <a href="https://ibb.co/7QK2spW"><img src="https://i.ibb.co/jzDgnwM/Create-item-vehicle-house-for-sale.png" alt="Create-item-vehicle-house-for-sale" border="1"></a>

- <b>Search items</b>
  Users can search items via the search field
  <a href="https://ibb.co/x8CDb7Y"><img src="https://i.ibb.co/5xM63Rk/search-items.png" alt="search-items" border="1"></a>

- <b>Create item for sale/rent</b>
  <a href="https://ibb.co/8XpDH3c"><img src="https://i.ibb.co/TrSBsXL/Create-item-for-sale.png" alt="Create-item-for-sale" border="1"></a>

- <b>Items filters</b>
  Users can filter/reset filters items by specific filters
  <a href="https://ibb.co/yWb770Q"><img src="https://i.ibb.co/Ln2HHSZ/Items-filters.png" alt="Items-filters" border="1"></a>

- <b>Item information</b>
  User can view item information and its image gallery uploaded by the seller
  <a href="https://ibb.co/0YscWB9"><img src="https://i.ibb.co/CVPzXJ9/Item-info.png" alt="Item-info" border="1"></a>

- <b> Send message to seller</b>
  Other users (who are not the item owner can send a message to the item's seller about the item via messenger and he/she will get a notification about it)
  <a href="https://ibb.co/b27nNz3"><img src="https://i.ibb.co/5n2VsB9/send-message-to-item-seller.png" alt="send-message-to-item-seller" border="1"></a>

  <a href="https://ibb.co/9WfRj7x"><img src="https://i.ibb.co/gJXsCx0/product-notification.png" alt="product-notification" border="1"></a>
  <a href="https://ibb.co/vvCXrr8"><img src="https://i.ibb.co/cXKYppd/product-message.png" alt="product-message" border="1"></a>

- <b>Delete items</b>
  Users who sell/rent this item can delete it from the market
  <a href="https://ibb.co/fX4p2m4"><img src="https://i.ibb.co/3TBN7tB/Delete-item.png" alt="Delete-item" border="1"></a>

- <b>Update items</b>
  Users who sell/rent this item can update its information
  <a href="https://ibb.co/XxqX4sp"><img src="https://i.ibb.co/WvLn3yF/Update-Item.png" alt="Update-Item" border="1"></a>

- <b>Search vehicles</b>
  Users can search vehicles via the search field
  <a href="https://ibb.co/LRM1BwX"><img src="https://i.ibb.co/8sJ9G3L/Search-vehicles.png" alt="Search-vehicles" border="1"></a>

- <b>Create vehicle for sale/rent</b>
  <a href="https://ibb.co/g4Qt6cv"><img src="https://i.ibb.co/wc8pY2J/Create-vehicle-for-sale.png" alt="Create-vehicle-for-sale" border="1"></a>

- <b>Vehicles filters</b>
  Users can filter/reset filters vehicles by specific filters
  <a href="https://imgbb.com/"><img src="https://i.ibb.co/rQ5VVqF/vehicles-filters.png" alt="vehicles-filters" border="1"></a>

- <b>Vehicle information</b>
  User can view vehicle information and its image gallery uploaded by the seller
  <a href="https://ibb.co/7kF4vCS"><img src="https://i.ibb.co/PD8Qxjr/Vehicle-information.png" alt="Vehicle-information" border="1"></a>

- <b> Send message to seller</b>
  Other users (who are not the vehicle owner can send a message to the item's seller about the vehicle via messenger and he/she will get a notification about it)
  <a href="https://ibb.co/wQbYtL5"><img src="https://i.ibb.co/kDrMZyN/send-message-to-vehicle-seller.png" alt="send-message-to-vehicle-seller" border="1"></a>

  <a href="https://ibb.co/CKVh0wf"><img src="https://i.ibb.co/4R4PNFH/vehicle-notification.png" alt="vehicle-notification" border="1"></a>

  <a href="https://ibb.co/99M1LjM"><img src="https://i.ibb.co/Rp5smW5/vehicle-message.png" alt="vehicle-message" border="1"></a>

- <b>Delete vehicle</b>
  Users who sell/rent this vehicle can delete it from the market
  <a href="https://ibb.co/NyWX7qf"><img src="https://i.ibb.co/1mR3bNB/delete-vehicle.png" alt="delete-vehicle" border="1"></a>

- <b>Update vehicle</b>
  Users who sell/rent this vehicle can update its information
  <a href="https://ibb.co/R2hywtk"><img src="https://i.ibb.co/0qBtb1R/update-vehicle.png" alt="update-vehicle" border="1"></a>

- <b>Search houses</b>
  Users can search houses via the search field
  <a href="https://ibb.co/xS0tLFP"><img src="https://i.ibb.co/C5Z38PN/House-search.png" alt="House-search" border="1"></a>

- <b>Create house for sale/rent</b>
  <a href="https://ibb.co/bbmbCJt"><img src="https://i.ibb.co/FH3HyVp/Create-house-for-sale.png" alt="Create-house-for-sale" border="1"></a>

- <b>Apartments filters</b>

  Users can filter/reset filters apartments by specific filters
  <a href="https://ibb.co/27N0fDj"><img src="https://i.ibb.co/Z6mRknh/Apartment-filters.png" alt="Apartment-filters" border="1"></a>

- <b>house information</b>
  User can view house information and its image gallery uploaded by the seller
  <a href="https://ibb.co/94NpKkq"><img src="https://i.ibb.co/n1bwdND/house-information.png" alt="house-information" border="1"></a>

- <b> Send message to seller</b>
  Other users (who are not the house owner can send a message to the item's seller about the vehicle via messenger and he/she will get a notification about it)
  <a href="https://ibb.co/bK6Tgj9"><img src="https://i.ibb.co/DR1hDP2/send-message-to-house-seller.png" alt="send-message-to-house-seller" border="1"></a>

  <a href="https://ibb.co/Kyr6Wzg"><img src="https://i.ibb.co/PC6xgzy/house-notification.png" alt="house-notification" border="1"></a>
  <a href="https://ibb.co/jVFkyT1"><img src="https://i.ibb.co/CJFKbzT/house-message.png" alt="house-message" border="1"></a>

- <b>Delete house</b>
  Users who sell/rent this house can delete it from the market
  <a href="https://ibb.co/G3dhw6s"><img src="https://i.ibb.co/bR6fh0H/Delete-house.png" alt="Delete-house" border="1"></a>

- <b>Update house</b>
  Users who sell/rent this house can update its information
  <a href="https://ibb.co/XkxS8BM"><img src="https://i.ibb.co/n8MzC2t/Update-house.png" alt="Update-house" border="1"></a>

- <b>Admin dashboard</b>
  Admin users can manage the system: delete/update/create new users
  view users analytics and view how much users connected to the app in real time
  <a href="https://ibb.co/QpWhqtP"><img src="https://i.ibb.co/7j3BTLn/Admin-dashboard.png" alt="Admin-dashboard" border="1"></a>

- <b> Users management </b>
  <a href="https://ibb.co/DbxKFnX"><img src="https://i.ibb.co/TTVhG5X/Users-management.png" alt="Users-management" border="1"></a>
- <b> Search Users </b>
  <a href="https://ibb.co/f9cqq4t"><img src="https://i.ibb.co/pQmbbJZ/Search-users.png" alt="Search-users" border="0"></a>

- <b>Delete user</b>
  When deleting a user all its information in the app is deleted (posts/comments/files/stories)
  <a href="https://ibb.co/bdJMXV5"><img src="https://i.ibb.co/zfJTZgV/Delete-user.png" alt="Delete-user" border="1"></a>

- <b>Update user information</b>
  <a href="https://ibb.co/zZMMrzk"><img src="https://i.ibb.co/tDGG49d/Update-user.png" alt="Update-user" border="1"></a>

- <b>User analytics</b>
  This page divided into 3 sections:
  <b> 1. How much users registered to the app per month</b>
  <a href="https://ibb.co/Xjg83fj"><img src="https://i.ibb.co/mbw8Xrb/how-much-users-per-month-registered.png" alt="how-much-users-per-month-registered" border="1"></a>

<b> 2. User analysis - each row in the table is a link to user statistics page which shows how much time(in minutes) he spent in the app</b>
<a href="https://ibb.co/ypk7SVs"><img src="https://i.ibb.co/8bxtcX8/User-analysis.png" alt="User-analysis" border="1"></a>

<b>3. New registered users (the 5 new recent)</b>
<a href="https://ibb.co/2sDkFQR"><img src="https://i.ibb.co/nnHLwv4/new-users-registered.png" alt="new-users-registered" border="1"></a>

in each of the sections the admin can search/filter the relevant users by username / email.

<b>Active users</b>
Admin users can view how much users in real time are active in the app (logged in). when a user logged out its immediately reflected in the table
<a href="https://ibb.co/QXMwDkY"><img src="https://i.ibb.co/JCHJ3qr/Active-users.png" alt="Active-users" border="1"></a>

each admin can search/filter the relevant users by username / email.
