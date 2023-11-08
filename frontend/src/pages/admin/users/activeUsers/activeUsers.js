import "./activeUsers.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Avatar, Badge, Button, TextField } from "@mui/material";
import { defaultProfilePic } from "../../../../context/users/UsersConstants";
import { useUser } from "../../../../context/users/UsersContext";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Topbar from "../../../../components/topbar/Topbar";
import { withStyles } from "@mui/styles";
import { useState } from "react";
import { ArrowBackIos, Search } from "@mui/icons-material";
import NoUsersFound from "../../../../components/noUsersFound/NoUsersFound";
import { useAuth } from "../../../../context/auth/AuthContext";
import { useNavigate } from "react-router";
import SwipeableTemporaryDrawer from "../../../../components/SwipeableDrawer/SwipeableDrawer";
import { Text } from "@chakra-ui/react";

const GreenBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "green",
    color: "white",
    overlap: "circular",
  },
}))(Badge);

export default function ActiveUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const { activeUsers: users } = useUser();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const isUserActive = users.some(
    (active) => active?.userInfo?._id === auth?.userInfo?._id
  );

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users?.filter(
    (user) =>
      user?.userInfo?.username
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user?.userInfo?.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            marginTop: "10px",
          }}
        >
          <Text fontSize={28} fontWeight="bold">
            Active Users
          </Text>

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <TextField
              type="text"
              placeholder="Search by username or an email"
              value={searchQuery}
              style={{ width: "320px" }}
              onChange={handleSearchInputChange}
              InputProps={{
                startAdornment: <Search color="action" />,
                disableUnderline: true,
              }}
            />
          </div>

          {filteredUsers.length === 0 ? (
            <NoUsersFound />
          ) : (
            <>
              <div>
                <strong>Total users found:</strong> {filteredUsers.length}
              </div>

              <TableContainer component={Paper}>
                <Table className="table" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <strong>Username</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Email</strong>&nbsp;
                      </TableCell>
                      <TableCell align="center">
                        <strong>Is Admin</strong>&nbsp;
                      </TableCell>
                      <TableCell align="center">
                        <strong>Created At</strong>&nbsp;
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers
                      ?.sort(
                        (a, b) =>
                          new Date(b?.userInfo?.createdAt) -
                          new Date(a?.userInfo?.createdAt)
                      )
                      .map((row) => (
                        <TableRow
                          key={row?.userInfo?._id}
                          className="table-row"
                        >
                          <TableCell component="th" scope="row" align="center">
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {isUserActive ? (
                                <GreenBadge color="secondary" badgeContent="">
                                  <Avatar
                                    src={
                                      row?.userInfo?.profilePicture?.url ||
                                      defaultProfilePic
                                    }
                                    alt={row?.userInfo?.username}
                                    width="32"
                                    height="32"
                                    style={{ marginRight: "8px" }}
                                  />
                                </GreenBadge>
                              ) : (
                                <Badge color="secondary" badgeContent="">
                                  <Avatar
                                    src={
                                      row?.userInfo?.profilePicture?.url ||
                                      defaultProfilePic
                                    }
                                    alt={row?.userInfo?.username}
                                    width="32"
                                    height="32"
                                    style={{ marginRight: "8px" }}
                                  />
                                </Badge>
                              )}

                              {row?.userInfo?.username}
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            {row?.userInfo?.email}
                          </TableCell>
                          <TableCell align="center">
                            {!row?.userInfo?.isAdmin ? (
                              <CloseIcon sx={{ color: "red" }} />
                            ) : (
                              <CheckIcon sx={{ color: "green" }} />
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {new Date(
                              row?.userInfo?.createdAt
                            ).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
}
