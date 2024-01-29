import React, { Fragment, useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  MenuItem,
  ListItemIcon,
  Tooltip,
  Menu,
  Icon,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios"; // Import Axios for making API requests
import { useTheme } from "@mui/material/styles"; // Import useTheme
import FormDialog4 from "app/views/material-kit/dialog/FormDialog4";
import moment from "moment-timezone";

import useAuth from "app/hooks/useAuth";
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon
import { Breadcrumb } from "app/components";
// ... other imports ...
const isWithinExamTimeRange = (fromTimeStr, toTimeStr) => {
  const currentDateTime = new Date();
  const fromTime = parseTimeString(fromTimeStr);
  const toTime = parseTimeString(toTimeStr);

  console.log("Current DateTime:", currentDateTime);
  console.log("Start Time:", fromTime);
  console.log("End Time:", toTime);

  if (!fromTime || !toTime) {
    console.error("Invalid time format");
    return false;
  }

  const isWithinRange =
    currentDateTime >= fromTime && currentDateTime <= toTime;
  console.log("Is Within Exam Time Range:", isWithinRange);

  return isWithinRange;
};

const parseTimeString = (timeStr) => {
  // Extract hours, minutes, and AM/PM from the time string
  const [timePart, meridiem] = timeStr.split(" ");
  const [hours, minutes] = timePart.split(":").map(Number);

  // Convert hours to 24-hour format if necessary
  const formattedHours = meridiem === "PM" && hours < 12 ? hours + 12 : hours;

  // Create a new Date object with the parsed time
  const currentTime = new Date();
  currentTime.setHours(formattedHours);
  currentTime.setMinutes(minutes);
  currentTime.setSeconds(0);

  // Set the timezone offset to West Africa Standard Time (WAT)
  const offsetInMinutes = -60; // WAT is UTC+1
  const timeZoneOffset = offsetInMinutes * 60000; // Convert minutes to milliseconds
  const parsedTime = new Date(currentTime.getTime() + timeZoneOffset);

  return parsedTime;
};

const Manage = () => {
  const { palette } = useTheme(); // Define palette from useTheme
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]); // State to store fetched exams
  const [resultData, setresultData] = useState([]); // State to store fetched exams
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMap, setAnchorElMap] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;
  const [dialogOpen, setDialogOpen] = useState(false);
  console.log("Data:", data);
  // Function to fetch exams
  const fetchExams = async () => {
    try {
      // Fetch the authentication token from local storage
      const token = localStorage.getItem("jwtToken");

      // Include the token in the request headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `https://hlhs-3ff6501095d6.herokuapp.com/api/get-exams-by-class/${user.classname}`,
        { headers } // Include the headers in the request
      );

      setData(response.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };
  console.log("Data:", data);

  useEffect(() => {
    fetchExams(); // Fetch exams when the component mounts
  }, []); // Empty dependency array ensures the effect runs once

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
  // const handleOpenMenu = (event, examId, examTime) => {
  //   const currentTime = moment();
  //   const formattedExamTime = moment(examTime).tz("Africa/Lagos");

  //   console.log("Current Time:", currentTime.format());
  //   console.log("Exam Time:", formattedExamTime.format());

  //   if (currentTime.isBefore(formattedExamTime)) {
  //     // If it's not yet time for the exam, open the dialog
  //     console.log("Not yet time for the exam. Opening dialog...");
  //     setDialogOpen(true);
  //   } else {
  //     // If it's time for the exam, navigate to the Manage Questions page
  //     console.log(
  //       "It's time for the exam. Navigating to Manage Questions page..."
  //     );
  //     handleCloseMenu(examId); // Close the menu
  //   }
  // };

  // Function to handle closing the context menu for a specific exam
  const handleCloseMenu = (examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: null,
    }));
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Fragment>
      {/* ... your other JSX for Breadcrumb and FormDialog4 ... */}

      <Box
        className="breadcrumb"
        style={{ marginTop: "40px", marginBottom: "30px", paddingLeft: "20px" }}
      >
        <Breadcrumb
          routeSegments={[
            // { name: "Material", path: "/material" },
            { name: "Manage Online Exam" },
          ]}
        />
      </Box>
      <div class="table-responsive full-data">
        <table
          class="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
          id="example-student"
        >
          <thead>
            <tr>
              <th>S/N</th>
              <th>Exam Name</th>
              <th>Class Name</th>
              <th>Subject</th>
              <th>Exam Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>

          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tbody>
                <tr key={item._id}>
                  <td>
                    <div class="trans-list">
                      <h4>{index + 1}</h4>
                    </div>
                  </td>

                  <td>
                    <div class="date">{item.title}</div>
                  </td>
                  <td>
                    <h6 class="mb-0">{item.className}</h6>
                  </td>
                  <td>
                    <h6 class="mb-0">{item.subject}</h6>
                  </td>
                  <td>
                    <h6 class="mb-0">
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : ""}
                    </h6>
                  </td>
                  <td>
                    <h6 class="mb-0">
                      {" "}
                      {item.fromTime} --
                      {item.toTime}
                    </h6>
                  </td>

                  <td>
                    <TableCell align="right">
                      {isWithinExamTimeRange(item.fromTime, item.toTime) ? ( // Check if it's time for the exam
                        <IconButton
                          aria-controls={`action-menu-${item._id}`}
                          aria-haspopup="true"
                          onClick={(event) => handleOpenMenu(event, item._id)} // Pass item._id
                        >
                          <MoreVertIcon /> {/* MoreVertIcon for the menu */}
                        </IconButton>
                      ) : (
                        <Tooltip title="Not yet time for the exam">
                          <span>
                            <IconButton disabled>
                              <MoreVertIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                      <Menu
                        id={`action-menu-${item._id}`}
                        anchorEl={anchorElMap[item._id]}
                        open={Boolean(anchorElMap[item._id])}
                        onClose={() => handleCloseMenu(item._id)}
                      >
                        <MenuItem>
                          <ListItemIcon></ListItemIcon>
                          <Link
                            to={`/student/dashboard/manage-online-exam/${item._id} `}
                          >
                            Manage Questions
                          </Link>
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
                No Exam to display.
              </TableCell>
            </TableRow>
          )}
        </table>
        {/* Dialog for displaying the message */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>{"Not Allowed"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              It's not yet time for the exam!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>OK</Button>
          </DialogActions>
        </Dialog>
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
    </Fragment>
  );
};

export default Manage;
