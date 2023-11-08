import { useEffect, useMemo, useState } from "react";
import {
  findAllUsers,
  getNewUsers,
  getUsersStats,
} from "../../../../Api/ServerAPI";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Topbar from "../../../../components/topbar/Topbar";
import Chart from "../../components/chart/Chart";
import NewUsersTable from "../newUsersTable/NewUsersTable";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { Button, TextField } from "@mui/material";
import SwipeableTemporaryDrawer from "../../../../components/SwipeableDrawer/SwipeableDrawer";
import UsersTable from "../../components/usersTable/UsersTable";
import { Search } from "@mui/icons-material";
import { Text } from "@chakra-ui/react";

const UserStatistics = () => {
  const [usersStats, setUsersStats] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = allUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await findAllUsers();
        setAllUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchUsersStats = async () => {
      try {
        const { data } = await getUsersStats();
        setUsersStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsersStats();
  }, []);

  useEffect(() => {
    const fetchNewUsers = async () => {
      try {
        const { data } = await getNewUsers();
        setNewUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNewUsers();
  }, []);

  useEffect(() => {
    if (usersStats.length > 0) {
      setUserStats(
        usersStats
          .sort((a, b) => a._id - b._id)
          .map((item) => ({
            name: MONTHS[item._id - 1],
            "New User": item.total,
          }))
      );
    }
  }, [usersStats, MONTHS]);

  return (
    <>
      <SwipeableTemporaryDrawer />
      <Topbar />
      <div className="editUserContainer" style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="content"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Text fontWeight="bold" fontSize={28}>
            Users statistics
          </Text>

          <Chart
            title="New Users Per Month"
            data={userStats}
            dataKey="New User"
            grid
          />

          <>
            <Text fontWeight="bold" fontSize={28}>
              Users analytics{" "}
            </Text>
            <TextField
              type="text"
              placeholder="Search by username or an email"
              value={searchQuery}
              style={{ width: "320px" }}
              onChange={handleSearchInputChange}
              InputProps={{
                endAdornment: null,
                startAdornment: <Search color="action" />,
                disableUnderline: true,
              }}
            />
            <UsersTable searchResults={filteredUsers} analysis />
            <Text fontWeight="bold" fontSize={28}>
              New Users (5 recent)
            </Text>
            <NewUsersTable newUsers={newUsers} />

            <Button
              sx={{ marginTop: "10px" }}
              variant="contained"
              startIcon={<ArrowBackIos />}
              onClick={() => navigate(-1)}
            />
          </>
        </div>
      </div>
    </>
  );
};

export default UserStatistics;
