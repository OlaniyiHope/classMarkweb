import { Container } from "@mui/material";
import { Fragment, React, useState } from "react";
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
  ListItemIcon,
  Table,
  Dialog,
  Menu,
  MenuItem,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import RowCards from "../shared/RowCards";
import { Breadcrumb } from "app/components";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";

import useFetch from "hooks/useFetch";
import FormDialog4 from "app/views/material-kit/dialog/FormDialog4";
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Sub10 = () => {
  const className = "S.S.3.S"; // Specify the class name here

  const { data, loading, error, reFetch } = useFetch(
    `/get-subject/${className}`
  ); // Use the specified class name in the URL
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorElMap, setAnchorElMap] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
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
        `https://hlhs-3ff6501095d6.herokuapp.com/api/delete-subject/${userToDelete._id}`
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
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Subjects" }]} />
          </Box>
          <Box className="breadcrumb">
            <FormDialog4 />
          </Box>

          <div class="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
            <div class="table-responsive full-data">
              <table
                class="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
                id="example-student"
              >
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Class</th>

                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                {data && data.length > 0 ? (
                  data.map((item, index) => (
                    <tbody>
                      <tr key={item?._id}>
                        <td>
                          <div class="trans-list">
                            <h4>{index + 1}</h4>
                          </div>
                        </td>
                        <td>
                          <span class="text-primary font-w600">
                            {item.name}
                          </span>
                        </td>
                        <td>
                          <div class="date">{item.teacher}</div>
                        </td>
                        <td>
                          <h6 class="mb-0">{item.classname}</h6>
                        </td>

                        <td>
                          <IconButton
                            aria-controls={`action-menu-${item._id}`}
                            aria-haspopup="true"
                            onClick={(event) => handleOpenMenu(event, item._id)} // Pass item._id
                          >
                            <MoreVertIcon /> {/* MoreVertIcon for the menu */}
                          </IconButton>
                          <Menu
                            id={`action-menu-${item._id}`}
                            anchorEl={anchorElMap[item._id]}
                            open={Boolean(anchorElMap[item._id])}
                            onClose={() => handleCloseMenu(item._id)}
                          >
                            <MenuItem>
                              <ListItemIcon>
                                <EditIcon /> {/* Use an Edit icon */}
                              </ListItemIcon>
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleOpenDeleteConfirmation(item)}
                            >
                              <ListItemIcon>
                                <DeleteIcon />
                              </ListItemIcon>
                              Delete
                            </MenuItem>
                          </Menu>
                        </td>
                      </tr>
                    </tbody>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No subjects to display.
                    </TableCell>
                  </TableRow>
                )}
              </table>
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

export default Sub10;