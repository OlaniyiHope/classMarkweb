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
  ListItemIcon,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";
import RowCards from "../shared/RowCards";
import { Breadcrumb } from "app/components";
import FormDialog2 from "app/views/material-kit/dialog/FormDialog2";
import useFetch from "hooks/useFetch";
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

const Info = () => {
  const { data, loading, error } = useFetch("/student/JS1");

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
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "Material", path: "/material" },
              { name: "Student Information" },
            ]}
          />
          <Link to="admin/dashboard/student_add">
            <FormDialog2 />
          </Link>
        </Box>

        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID No</TableCell>
                <TableCell align="left">Photo</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Email/Username</TableCell>

                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align="center">{item._id}</TableCell>
                    <TableCell align="center"></TableCell>

                    <TableCell align="left">{item.studentName}</TableCell>
                    <TableCell align="center">{item.address}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>

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
                            to={`/dashboard/student_mark_sheet/${item._id}`}
                          >
                            Mark Sheet
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon></ListItemIcon>

                          <Link to={`/dashboard/view-result/${item._id}`}>
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
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>
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
      </ContentBox>
    </Fragment>
  );
};

export default Info;
