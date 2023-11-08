import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import NotFound from "./pages/notfound/NotFound";
import RequireAuth from "./components/requireAuth/RequireAuth";
import UpdatePost from "./pages/updatePost/UpdatePost";
import { useAuth } from "./context/auth/AuthContext";
import { SocketProvider } from "./context/socket/SocketContext";
import PostPage from "./pages/post/PostPage";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import Users from "./pages/admin/users/Users";
import UpdateUserPage from "./pages/admin/users/updateUser/UpdateUserPage";
import UserStatistics from "./pages/admin/users/statistics/UserStatistics";
import ActiveUsers from "./pages/admin/users/activeUsers/activeUsers";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Statistics from "./pages/statistics/Statistics";
import TimeSpent from "./components/timeSpent/TimeSpent";
import AnalyticsDashboard from "./pages/statistics/analyticsDashboard/AnalyticsDashboard";
import MarketPlace from "./pages/marketPlace/MarketPlace";
import NewItemForSale from "./pages/marketPlace/pages/NewItemForSale";
import ItemPage from "./pages/marketPlace/pages/itemPage/ItemPage";
import EditItem from "./pages/marketPlace/pages/editItem/EditItem";
import NewVehicleForSale from "./pages/marketPlace/pages/NewVehicleForSale";
import VehiclePage from "./pages/marketPlace/pages/vehiclePage/VehiclePage";
import EditVehicle from "./pages/marketPlace/pages/editVehicle/EditVehicle";
import NewPropertyForSale from "./pages/marketPlace/pages/NewPropertyForSale";
import PropertyPage from "./pages/marketPlace/pages/propertyPage/PropertyPage";
import EditProperty from "./pages/marketPlace/pages/editProperty/EditProperty";
import ChatPage from "./pages/chats/ChatPage";

const AppRoutes = () => {
  const { auth } = useAuth();

  return (
    <SocketProvider auth={auth}>
      {/* {auth && <TimeSpent />} */}
      <Routes>
        <Route path="/" element={!auth ? <Login /> : <Home />} />
        <Route
          path="/register"
          element={auth ? <Navigate to="/" /> : <Register />}
        />

        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />

        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/updatePost/:postId" element={<UpdatePost />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/Post/:postId" element={<PostPage />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/marketPlace" element={<MarketPlace />} />
          <Route path="/item/:itemId" element={<ItemPage />} />
          <Route path="/vehicle/:vehicleId" element={<VehiclePage />} />
          <Route path="/property/:propertyId" element={<PropertyPage />} />
          <Route path="/item/editItem/:itemId" element={<EditItem />} />
          <Route
            path="/vehicle/editVehicle/:vehicleId"
            element={<EditVehicle />}
          />
          <Route
            path="/property/editProperty/:propertyId"
            element={<EditProperty />}
          />
          <Route path="/newItemForSale" element={<NewItemForSale />} />
          <Route path="/newVehicleForSale" element={<NewVehicleForSale />} />
          <Route path="/newPropertyForSale" element={<NewPropertyForSale />} />

          <Route
            path="/timeSpentAnalytics/:userId"
            element={<AnalyticsDashboard />}
          />
          <Route path="/chats" element={<ChatPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/users/:userId" element={<UpdateUserPage />} />
          <Route path="/admin/users/statistics" element={<UserStatistics />} />
          <Route path="/admin/users/activeUsers" element={<ActiveUsers />} />
        </Route>

        <Route path="/notfound" element={<NotFound />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </SocketProvider>
  );
};

export default AppRoutes;
