import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Avatar } from "@mui/material";
import { defaultProfilePic } from "../../../../context/users/UsersConstants";
import NoUsersFound from "../../../../components/noUsersFound/NoUsersFound";

export default function NewUsersTable({ newUsers }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredNewUsers = newUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
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
            endAdornment: null,
            startAdornment: <Search color="action" />,
            disableUnderline: true,
          }}
        />
      </div>

      {filteredNewUsers.length === 0 ? (
        <NoUsersFound />
      ) : (
        <>
          <div>
            <strong>Total users found:</strong> {filteredNewUsers.length}
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
                {filteredNewUsers?.map((row) => (
                  <TableRow key={row._id} className="table-row">
                    <TableCell component="th" scope="row" align="center">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={row?.profilePicture?.url || defaultProfilePic}
                          alt={row.username}
                          width="32"
                          height="32"
                          style={{ marginRight: "8px" }}
                        />
                        {row?.username}
                      </div>
                    </TableCell>
                    <TableCell align="center">{row?.email}</TableCell>
                    <TableCell align="center">
                      {!row?.isAdmin ? (
                        <CloseIcon sx={{ color: "red" }} />
                      ) : (
                        <CheckIcon sx={{ color: "green" }} />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(row?.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}
