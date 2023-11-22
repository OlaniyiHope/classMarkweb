import {} from "@mui/material";
import { Fragment, React, useState } from "react";
import { Box } from "@mui/system";
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
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import RowCards from "../shared/RowCards";
import { Breadcrumb } from "app/components";

import useFetch from "hooks/useFetch";
import FormDialog4 from "app/views/material-kit/dialog/FormDialog4";
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

const Sub1 = () => {
  const { data, loading, error } = useFetch("/subject/JS1");

  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
              // { name: "Material", path: "/material" },
              { name: "Subject" },
            ]}
          />
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
                    <th>Subject Name</th>
                    <th>Teacher</th>
                    <th>Class</th>

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
                          <span class="text-primary font-w600">{item._id}</span>
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
                          <div class="date">{item.name}</div>
                        </td>
                        <td>
                          <h6 class="mb-0">{item.teacher}</h6>
                        </td>
                        <td>
                          <h6 class="mb-0">{item.classname}</h6>
                        </td>
                      </tr>
                    </tbody>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No Subject to display.
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
      </ContentBox>
    </Fragment>
  );
};

export default Sub1;
