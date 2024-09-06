import { TextField } from "@mui/material";
import { Fragment, React, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  Button,
  Grid,
  styled,
  useTheme,
  Icon,
  Table,
  TableBody,
  TableCell,
  IconButton,
  Dialog,
  DialogActions,
  Container,
  DialogContent,
  DialogTitle,
  ListItemIcon,
  Menu,
  MenuItem,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";

import FormDialog from "../../../../app/views/material-kit/dialog/FormDialog";
import { Breadcrumb } from "../../../../app/components";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "./style.css";
import axios from "axios";
import EditAdmin from "../forms/EditAdmin";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const ViewAdmin = () => {
  const { data, loading, error, reFetch } = useFetch("/get-admin");
  const { palette } = useTheme();
  const [editAdminData, setEditAdminData] = useState(null);
  const [anchorElMap, setAnchorElMap] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL.trim();
  const [tableData, setTableData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [action, setAction] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOpenMenu = (event, examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: event.currentTarget,
    }));
  };

  // Function to handle closing the context menu for a specific exam
  const handleCloseMenu = (examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: null,
    }));
  };
  const handleOpenDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setUserToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/users/${userToDelete._id}`
      );

      console.log("Response from delete API:", response.data);

      if (response.status === 200) {
        console.log("User deleted successfully");

        // Manually trigger data refetch
        reFetch();
      } else {
        console.error("Failed to delete User");
      }
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };
  const updateTableData = (newSubject) => {
    // Assuming data is an array
    setTableData([...data, newSubject]);
    reFetch(); // Trigger data refetch after updating tableData1
  };

  const handleEditAdmin = (adminId) => {
    // Find the selected student by ID
    const selectedAdmin = data.find((admin) => admin?._id === adminId);

    if (!selectedAdmin) {
      console.error("Selected admin not found for ID:", adminId);
      // Optionally, you can choose to return or handle this error gracefully
      return;
    }

    // Open the edit dialog with the selected student data
    setEditAdminData(selectedAdmin);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      const token = localStorage.getItem("jwtToken");

      // Check if editStudentData is not null and has the _id property
      if (editAdminData?._id) {
        // Log the payload before sending the request
        // console.log("Payload before sending:", {
        //   studentName: updatedData.studentName,
        //   address: updatedData.address,
        //   // Add other fields as needed
        // });

        const response = await axios.put(
          `${apiUrl}/api/admin/${editAdminData._id}`,
          {
            email: updatedData.email,
            username: updatedData.username,
            phone: updatedData.phone,
            address: updatedData.address,
            password: newPassword || updatedData.password,
            // Add other fields as needed
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Admin updated successfully:", response.data);
        setEditDialogOpen(false);
        reFetch(); // Manually trigger data refetch
      } else {
        console.error("Invalid or missing _id property in editAdminData");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Manage Admin" }]} />
          </Box>
          <Box className="breadcrumb">
            <FormDialog updateTableData={updateTableData} />
          </Box>
          <div>
            <div class="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
              <div class="table-responsive full-data">
                <table
                  style={{ overflowX: "auto", maxWidth: "100%" }}
                  class="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
                  id="example-student"
                >
                  <thead>
                    <tr>
                      <th></th>
                      <th>S/N</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>

                      <th class="text-end">Action</th>
                    </tr>
                  </thead>
                  {Array.isArray(data) &&
                    data?.map((item, index) => (
                      <tbody>
                        <tr key={item?._id}>
                          <td>
                            <div class="checkbox me-0 align-self-center"></div>
                          </td>

                          <td>{index + 1}</td>
                          <td>
                            <div class="trans-list">
                              <h4>{item?.username}</h4>
                            </div>
                          </td>
                          <td>
                            <span class="text-primary font-w600">
                              {item?.email}
                            </span>
                          </td>
                          <td>
                            <div class="date">{item?.phone}</div>
                          </td>
                          <td>
                            <h6 class="mb-0">{item?.address}</h6>
                          </td>

                          <td>
                            <TableCell align="right">
                              <IconButton
                                aria-controls={`action-menu-${item?._id}`}
                                aria-haspopup="true"
                                onClick={(event) =>
                                  handleOpenMenu(event, item?._id)
                                } // Pass item._id
                              >
                                <MoreVertIcon />{" "}
                                {/* MoreVertIcon for the menu */}
                              </IconButton>
                              <Menu
                                id={`action-menu-${item?._id}`}
                                anchorEl={anchorElMap[item?._id]}
                                open={Boolean(anchorElMap[item?._id])}
                                onClose={() => handleCloseMenu(item?._id)}
                              >
                                <MenuItem
                                  onClick={() => handleEditAdmin(item?._id)}
                                >
                                  <ListItemIcon>
                                    <EditIcon /> {/* Use an Edit icon */}
                                  </ListItemIcon>
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    handleOpenDeleteConfirmation(item)
                                  }
                                >
                                  <ListItemIcon>
                                    <DeleteIcon />
                                  </ListItemIcon>
                                  Delete
                                </MenuItem>
                              </Menu>
                            </TableCell>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
                {editAdminData && (
                  <EditAdmin
                    open={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    adminId={editAdminData._id}
                    onSave={handleSaveEdit}
                  />
                )}
                <Dialog
                  open={deleteConfirmationOpen}
                  onClose={handleCloseDeleteConfirmation}
                >
                  <DialogTitle>Delete Confirmation</DialogTitle>
                  <DialogContent>
                    Are you sure you want to delete {userToDelete?.username}?
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDeleteConfirmation}>
                      Cancel
                    </Button>
                    <Button
                      onClick={async () => {
                        await handleDeleteUser(); // Call the asynchronous function
                        handleCloseDeleteConfirmation();
                      }}
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>

            <Box width="100%" overflow="auto">
              <TablePagination
                sx={{ px: 2 }}
                page={page}
                component="div"
                rowsPerPage={rowsPerPage}
                // count={data.length}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                nextIconButtonProps={{ "aria-label": "Next Page" }}
                backIconButtonProps={{ "aria-label": "Previous Page" }}
              />
            </Box>
          </div>
        </Container>
      </ContentBox>
    </Fragment>
  );
};

export default ViewAdmin;
