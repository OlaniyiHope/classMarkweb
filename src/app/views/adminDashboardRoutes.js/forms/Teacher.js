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
import useFetch from "hooks/useFetch";
import FormDialog3 from "app/views/material-kit/dialog/FormDialog3";
import { TablePagination } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";

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
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="left">Photo</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">[Add Photo Here]</TableCell>
                      <TableCell align="left">{item.username}</TableCell>
                      <TableCell align="center">{item.email}</TableCell>
                      <TableCell align="center">{item.phone}</TableCell>
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
                    </TableRow>
                  ))}
            </TableBody>
          </StyledTable>

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
