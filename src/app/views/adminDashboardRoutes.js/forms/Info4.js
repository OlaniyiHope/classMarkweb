import {} from "@mui/material";
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
  Table,
  TableBody,
  ListItemIcon,
  Menu,
  MenuItem,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";
import RowCards from "../shared/RowCards";
import { Breadcrumb } from "app/components";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import useFetch from "hooks/useFetch";
import FormDialog2 from "app/views/material-kit/dialog/FormDialog2";
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

const Info4 = () => {
  const { data, loading, error } = useFetch("/student/SS1");

  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorElMap, setAnchorElMap] = useState({});
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

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Student Information" }]} />
          </Box>
          <Box className="breadcrumb">
            <FormDialog2 />
          </Box>

          <Box width="100%" overflow="auto">
            <div class="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
              <div class="table-responsive full-data">
                <table
                  class="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
                  id="example-student"
                >
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="checkAll"
                          required=""
                        />
                      </th>
                      <th>S/N</th>
                      <th>Adm No</th>
                      <th>Photo</th>
                      <th> Name</th>
                      <th>Address</th>
                      <th>Email</th>
                      <th class="text-end">Action</th>
                    </tr>
                  </thead>
                  {data && data.length > 0 ? (
                    data.map((item, index) => (
                      <tbody>
                        <tr key={item._id}>
                          <td>
                            <div class="checkbox me-0 align-self-center">
                              <div class="custom-control custom-checkbox ">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  id="check16"
                                  required=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="check16"
                                ></label>
                              </div>
                            </div>
                          </td>
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
                            <div class="date">
                              {" "}
                              <img
                                src="images/trans/10.jpg"
                                alt=""
                                class="avatar me-3"
                              />
                            </div>
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

                          <td>
                            <TableCell align="right">
                              <IconButton
                                aria-controls={`action-menu-${item._id}`}
                                aria-haspopup="true"
                                onClick={(event) =>
                                  handleOpenMenu(event, item._id)
                                } // Pass item._id
                              >
                                <MoreVertIcon />{" "}
                                {/* MoreVertIcon for the menu */}
                              </IconButton>
                              <Menu
                                id={`action-menu-${item._id}`}
                                anchorEl={anchorElMap[item._id]}
                                open={Boolean(anchorElMap[item._id])}
                                onClose={() => handleCloseMenu(item._id)}
                              >
                                <MenuItem>
                                  <ListItemIcon></ListItemIcon>
                                  <Link
                                    to={`/dashboard/student_mark_sheet/${item._id}`}
                                  >
                                    Mark Sheet
                                  </Link>
                                </MenuItem>
                                <MenuItem>
                                  <ListItemIcon></ListItemIcon>

                                  <Link
                                    to={`/dashboard/view-result/${item._id}`}
                                  >
                                    View Result
                                  </Link>
                                </MenuItem>
                                <MenuItem>
                                  <ListItemIcon>
                                    <EditIcon /> {/* Use an Edit icon */}
                                  </ListItemIcon>
                                  Edit
                                </MenuItem>
                                <MenuItem>
                                  <ListItemIcon>
                                    <DeleteIcon /> {/* Use a Delete icon */}
                                  </ListItemIcon>
                                  Delete
                                </MenuItem>
                              </Menu>
                            </TableCell>
                          </td>
                        </tr>
                      </tbody>
                    ))
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

export default Info4;
