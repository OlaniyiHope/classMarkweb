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
  Menu,
  Icon,
} from "@mui/material";
import axios from "axios"; // Import Axios for making API requests
import { useTheme } from "@mui/material/styles"; // Import useTheme
import FormDialog4 from "app/views/material-kit/dialog/FormDialog4";
import useAuth from "app/hooks/useAuth";
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon
// ... other imports ...

const Manage = () => {
  const { palette } = useTheme(); // Define palette from useTheme
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]); // State to store fetched exams
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMap, setAnchorElMap] = useState({});

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
        `http://localhost:3003/api/get-exams-by-class/${user.classname}`,
        { headers } // Include the headers in the request
      );

      setData(response.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

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

  // Function to handle closing the context menu for a specific exam
  const handleCloseMenu = (examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: null,
    }));
  };
  return (
    <Fragment>
      {/* ... your other JSX for Breadcrumb and FormDialog4 ... */}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Exam Name</TableCell>
            <TableCell align="center">ClassName</TableCell>
            <TableCell align="center">Subject</TableCell>
            <TableCell align="center">Exam Date</TableCell>
            <TableCell align="center">Time</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{item.className}</TableCell>
                <TableCell align="center">{item.subject}</TableCell>
                <TableCell align="center">{item.date}</TableCell>
                <TableCell align="center">
                  {item.fromTime} - {item.toTime}
                </TableCell>

                <TableCell align="right">
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
                      <ListItemIcon></ListItemIcon>
                      <Link
                        to={`/student/dashboard/manage-online-exam/${item._id} `}
                      >
                        {" "}
                        {/* Provide the relative path */}
                        Manage Questions
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
              </TableRow>
            ))}
        </TableBody>
      </Table>

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
