import "./usersTable.css";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import NoUsersFound from "../../../../components/noUsersFound/NoUsersFound";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Badge, Button } from "@mui/material";
import DeleteUserModal from "../../modals/deleteUserModal/DeleteUserModal";
import { useNavigate } from "react-router";
import { useAuth } from "../../../../context/auth/AuthContext";
import { defaultProfilePic } from "../../../../context/users/UsersConstants";
import { useUser } from "../../../../context/users/UsersContext";
import { withStyles } from "@mui/styles";

const GreenBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "green",
    color: "white",
    overlap: "circular",
  },
}))(Badge);

const RedBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "red",
    color: "white",
    overlap: "circular",
  },
}))(Badge);

export default function UsersTable({
  searchResults,
  fetchAgain,
  analysis,
  setFetchAgain,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);

  const { auth } = useAuth();
  const { activeUsers } = useUser();

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const navigateToEditUser = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  const navigateToUserAnalytics = (userId) => {
    analysis && navigate(`/timeSpentAnalytics/${userId}`);
  };

  const rowsToDisplay = searchResults.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const rowsPerPageOptions = [5, 10, 15];

  return (
    <>
      {searchResults.length === 0 ? (
        <NoUsersFound />
      ) : (
        <>
          {searchResults.length > 0 && (
            <div>
              <strong>Total users found:</strong> {searchResults.length}
            </div>
          )}
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
                  {!analysis && (
                    <TableCell align="center">
                      <strong>Actions</strong>&nbsp;
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsToDisplay?.map((row) => (
                  <TableRow
                    onClick={() => navigateToUserAnalytics(row._id)}
                    key={row._id}
                    className="table-row"
                  >
                    <TableCell component="th" scope="row" align="center">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {activeUsers.some(
                          (active) => active?.userInfo?._id === row._id
                        ) ? (
                          <GreenBadge color="secondary" badgeContent="">
                            <Avatar
                              src={
                                row?.profilePicture?.url || defaultProfilePic
                              }
                              alt={row.username}
                              width="32"
                              height="32"
                              style={{ marginRight: "8px" }}
                            />
                          </GreenBadge>
                        ) : (
                          <RedBadge color="secondary" badgeContent="">
                            <Avatar
                              src={
                                row?.profilePicture?.url || defaultProfilePic
                              }
                              alt={row.username}
                              width="32"
                              height="32"
                              style={{ marginRight: "8px" }}
                            />
                          </RedBadge>
                        )}

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
                    {!analysis && (
                      <TableCell
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        <Button
                          color="primary"
                          variant="contained"
                          style={{
                            marginRight: "10px",
                            backgroundColor: "purple",
                            color: "white",
                          }}
                          onClick={() => navigateToEditUser(row?._id)}
                          endIcon={<EditIcon />}
                        >
                          Edit
                        </Button>

                        {auth?.userInfo?.isAdmin !== row.isAdmin && (
                          <Button
                            style={{ backgroundColor: "red", color: "white" }}
                            variant="contained"
                            onClick={() => handleOpenDeleteModal(row)}
                            endIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={searchResults.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
            />
          </TableContainer>
        </>
      )}
      {openDeleteModal && (
        <DeleteUserModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          user={selectedUser}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
        />
      )}
    </>
  );
}
