import {} from "@mui/material";
import { Fragment, React, useState, useEffect } from "react";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon

import {
  Card,
  Button,
  Grid,
  styled,
  useTheme,
  Icon,
  IconButton,
  Table,
  ListItemIcon,
  Menu,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";
import RowCards from "../shared/RowCards";
import { Breadcrumb } from "app/components";
import FormDialog2 from "app/views/material-kit/dialog/FormDialog2";
import useFetch from "hooks/useFetch";
import axios from "axios";
import { Link } from "react-router-dom";

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

const Info11 = () => {
  const { data, loading, error, reFetch } = useFetch("/student/S.S.3.C");
  console.log("Data:", data);

  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editStudentData, setEditStudentData] = useState(null);
  const [anchorElMap, setAnchorElMap] = useState({});
  const [newPassword, setNewPassword] = useState("");

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL.trim();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const handleOpenMenu = (event, examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: event.currentTarget,
    }));
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/grade`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle closing the context menu for a specific exam
  const handleCloseMenu = (examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: null,
    }));
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

  const handleEditStudent = (studentId) => {
    // Find the selected student by ID
    const selectedStudent = data.find((student) => student?._id === studentId);

    if (!selectedStudent) {
      console.error("Selected student not found for ID:", studentId);
      // Optionally, you can choose to return or handle this error gracefully
      return;
    }

    // Open the edit dialog with the selected student data
    setEditStudentData(selectedStudent);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      const token = localStorage.getItem("jwtToken");

      // Check if editStudentData is not null and has the _id property
      if (editStudentData?._id) {
        // Log the payload before sending the request
        console.log("Payload before sending:", {
          studentName: updatedData.studentName,
          address: updatedData.address,
          // Add other fields as needed
        });

        const response = await axios.put(
          `${apiUrl}/api/students/${editStudentData._id}`,
          {
            studentName: updatedData.studentName,
            address: updatedData.address,
            AdmNo: updatedData.AdmNo,
            email: updatedData.email,
            username: updatedData.username,
            phone: updatedData.phone,
            password: newPassword || updatedData.password,
            // Add other fields as needed
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Student updated successfully:", response.data);
        setEditDialogOpen(false);
        reFetch(); // Manually trigger data refetch
      } else {
        console.error("Invalid or missing _id property in editStudentData");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Student Information" }]} />
          </Box>

          <Box width="100%" overflow="auto">
            <div class="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
              <div class="table-responsive full-data">
                <div style={{ overflowX: "auto", maxWidth: "100%" }}>
                  <table
                    style={{ overflowX: "auto", maxWidth: "100%" }}
                    class="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
                    id="example-student"
                  >
                    <thead>
                      <tr>
                        <th>S/N</th>
                        <th>Adm No</th>

                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    {data && data.length > 0 ? (
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={item._id}>
                            <td>
                              <div class="trans-list">
                                <h4>{index + 1}</h4>
                              </div>
                            </td>
                            <td>
                              <span class="text-primary font-w600">
                                {item.AdmNo}
                              </span>
                            </td>

                            <td>
                              <div class="date">{item.studentName}</div>
                            </td>
                            <td>
                              <h6 class="mb-0">{item.address}</h6>
                            </td>
                            <td>
                              <h6 class="mb-0">{item.email}</h6>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No Student to display.
                        </TableCell>
                      </TableRow>
                    )}
                  </table>
                </div>
              </div>
            </div>

            <TablePagination
              sx={{ px: 2 }}
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={data.length}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              nextIconButtonProps={{ "aria-label": "Next Page" }}
              backIconButtonProps={{ "aria-label": "Previous Page" }}
            />
          </Box>

          {/* <TopSellingTable />
            <StatCards2 />

            <H4>Ongoing Projects</H4>
            <RowCards />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Traffic Sources</Title>
              <SubTitle>Last 30 days</SubTitle>

              <DoughnutChart
                height="300px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>

            <UpgradeCard />
            <Campaigns />*/}
        </Container>
      </ContentBox>
    </Fragment>
  );
};

export default Info11;