import { Button, TextField } from "@mui/material";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import { ArrowBackIos, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { searchUsers } from "../../../Api/ServerAPI";
import debounce from "lodash/debounce";
import Spinner from "../../../components/Spinner/Spinner";
import UsersTable from "../components/usersTable/UsersTable";
import { useNavigate } from "react-router";
import SwipeableTemporaryDrawer from "../../../components/SwipeableDrawer/SwipeableDrawer";
import { Text } from "@chakra-ui/react";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const navigate = useNavigate();

  const debouncedSearch = debounce(async (query) => {
    try {
      setLoading(true);
      const { data } = await searchUsers(query);
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      console.error("Error searching users:", error);
      setLoading(false);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, fetchAgain]);

  return (
    <>
      <SwipeableTemporaryDrawer />
      <Topbar />
      <div className="adminContainer" style={{ display: "flex" }}>
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
            Users
          </Text>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              marginTop: "20px",
            }}
          >
            {" "}
            <TextField
              placeholder="Search users"
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: null,
                startAdornment: <Search color="action" />,
                disableUnderline: true,
              }}
            />
          </div>
          {loading ? (
            <Spinner text="Search results" />
          ) : (
            <>
              <UsersTable
                searchResults={searchResults}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
              <Button
                sx={{ marginTop: "10px" }}
                variant="contained"
                startIcon={<ArrowBackIos />}
                onClick={() => navigate(-1)}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
