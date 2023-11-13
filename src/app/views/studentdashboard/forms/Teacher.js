import React, { Fragment, useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Icon,
  styled,
  Table,
  TableBody,
  MenuItem,
  Menu,
  TableCell,
  TableHead,
  TableRow,
  ListItemIcon,
} from "@mui/material";

import FormDialog3 from "app/views/material-kit/dialog/FormDialog3";
import { TablePagination } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";
import useFetch from "hooks/useFetch";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const Teacher = () => {
  const { data, loading, error } = useFetch("/get-teachers");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [action, setAction] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // Fetch the JWT token from your storage (localStorage or cookies)
    const token = localStorage.getItem("jwtToken");

    // Make an API call with the JWT token
    fetch("/get-teachers", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the headers
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the data here
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Box className="breadcrumb">
        <FormDialog3 />
      </Box>
      <ContentBox className="analytics">
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
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>

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
                            <img
                              src="images/trans/10.jpg"
                              alt=""
                              class="avatar me-3"
                            />
                          </span>
                        </td>
                        <td>
                          <span class="text-primary font-w600">
                            {item.username}
                          </span>
                        </td>
                        <td>
                          <div class="date">{item.email}</div>
                        </td>
                        <td>
                          <h6 class="mb-0">{item.phone}</h6>
                        </td>

                        <td>
                          <TableCell align="right">
                            <IconButton
                              aria-controls="action-menu"
                              aria-haspopup="true"
                              onClick={handleOpenMenu}
                            >
                              <MoreVertIcon /> {/* MoreVertIcon for the menu */}
                            </IconButton>
                            <Menu
                              id="action-menu"
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleCloseMenu}
                            >
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
                      No Teacher to display.
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
            count={data ? data.length : 0}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ "aria-label": "Next Page" }}
            backIconButtonProps={{ "aria-label": "Previous Page" }}
          />
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default Teacher;
