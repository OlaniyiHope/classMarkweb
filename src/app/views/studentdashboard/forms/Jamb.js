import React, { useState, useContext, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  TablePagination,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Breadcrumb } from "../../../../app/components";
import useAuth from "../../../../app/hooks/useAuth";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
import { Link } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
const Jamb = () => {
  const { palette } = useTheme();
  const { currentSession } = useContext(SessionContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, loading, fetchedData, error, reFetch } = useFetch(
    currentSession ? `/jamb-exams` : null
  );
  // const [data, setData] = useState([]);
  const [anchorElMap, setAnchorElMap] = useState({});
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL.trim();

  // const { data, loading, error, reFetch } = useFetch("/get-exam");

  const handleManageQuestions = (examId) => {
    console.log(examId); // Add a log to check if examId is correct
    navigate(`/student/dashboard/jamb-past-questions/${examId}`);
  };

  const handleOpenMenu = async (event, item) => {
    try {
      // Get user's local time
      const userLocalTime = new Date();

      // Convert exam start time to Date object
      const startTime = new Date(item.date);
      const fromTime24Hours = convertTo24HourFormat(item.fromTime);
      const fromTimeParts = fromTime24Hours.split(":");
      startTime.setHours(parseInt(fromTimeParts[0], 10));
      startTime.setMinutes(parseInt(fromTimeParts[1], 10));

      // Convert exam end time to Date object
      const endTime = new Date(item.date);
      const toTime24Hours = convertTo24HourFormat(item.toTime);
      const toTimeParts = toTime24Hours.split(":");
      endTime.setHours(parseInt(toTimeParts[0], 10));
      endTime.setMinutes(parseInt(toTimeParts[1], 10));

      // Check if the student has submitted the exam
      const examTaken = item.submittedAnswers.some(
        (answer) => answer.userId === user._id // Compare logged-in user's ID with submittedAnswers userId
      );

      // If the exam has been submitted
      if (examTaken) {
        // Check if the exam time has elapsed
        if (userLocalTime > endTime) {
          alert(
            "You have already taken this exam, and the exam time has ended."
          );
          return; // Prevent further action if the time has elapsed
        } else {
          alert(
            "You have already taken this exam, but the exam time hasn't finished. You can continue."
          );
        }
      }

      // Check if it's still within the exam time window
      if (userLocalTime >= startTime && userLocalTime <= endTime) {
        setAnchorElMap((prev) => ({
          ...prev,
          [item._id]: event.currentTarget,
        }));
      } else {
        alert("It's not yet time for this exam, or the exam time has ended.");
      }
    } catch (error) {
      console.error("Error handling menu open event:", error);
    }
  };

  const handleCloseMenu = (examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: null,
    }));
  };

  // Function to get user's local time
  const getUserLocalTime = () => {
    try {
      const userLocalTime = new Date();
      return userLocalTime;
    } catch (error) {
      console.error("Failed to get user's local time:", error);
      throw new Error("Failed to get user's local time.");
    }
  };

  // Function to convert time to 24-hour format
  const convertTo24HourFormat = (time12Hour) => {
    const [time, modifier] = time12Hour.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  return (
    <Fragment>
      <Box
        className="breadcrumb"
        style={{ marginTop: "40px", marginBottom: "30px", paddingLeft: "20px" }}
      >
        <Breadcrumb routeSegments={[{ name: "Manage Online Exam" }]} />
      </Box>
      <div className="table-responsive full-data">
        <table
          className="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
          id="example-student"
        >
          <thead>
            <tr>
              <th>S/N</th>

              <th>Class Name</th>
              <th>Subject</th>
              <th>Exam Year</th>
              <th>Exam Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item._id}>
                <td>
                  <div className="trans-list">
                    <h4>{index + 1}</h4>
                  </div>
                </td>

                <td>
                  <h6 className="mb-0">{item.className}</h6>
                </td>
                <td>
                  <h6 className="mb-0">{item.subject}</h6>
                </td>

                <td>
                  <h6 className="mb-0">{item.year}</h6>
                </td>

                <td>
                  <h6 className="mb-0">
                    {item.date ? new Date(item.date).toLocaleDateString() : ""}
                  </h6>
                </td>
                <td>
                  <h6 className="mb-0">
                    {item.fromTime} -- {item.toTime}
                  </h6>
                </td>
                <td>
                  <IconButton
                    aria-controls={`action-menu-${item._id}`}
                    aria-haspopup="true"
                    onClick={(event) => handleOpenMenu(event, item)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`action-menu-${item._id}`}
                    anchorEl={anchorElMap[item._id]}
                    open={Boolean(anchorElMap[item._id])}
                    onClose={() => handleCloseMenu(item._id)}
                  >
                    <MenuItem onClick={() => handleManageQuestions(item._id)}>
                      <ListItemIcon></ListItemIcon>
                      Manage Questions
                    </MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={data?.length}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
        }}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Fragment>
  );
};

export default Jamb;
