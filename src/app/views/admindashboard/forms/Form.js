import { DatePicker } from "@mui/lab";

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MenuItem, Select, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Breadcrumb, SimpleCard } from "../../../../app/components";
import {
  Button,
  Checkbox,
  Grid,
  Icon,
  DialogTitle,
  styled,
  IconButton,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Span } from "../../../../app/components/Typography";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Navigate, useNavigate } from "react-router-dom";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const initialValues = {
  studentName: "",
  classname: "",
  address: "",
  parentsName: "",
  phone: "",
  AdmNo: "",
  date: "",
  username: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  studentName: Yup.string().required("Student Name is required"),
  classname: Yup.string().required("Class is required"),
  address: Yup.string().required("Address is required"),
  parentsName: Yup.string().required("Parent's Name is required"),
  phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Phone Number must be only digits")
    .min(10, "Phone Number must be at least 11 digits")
    .max(15, "Phone Number must be at most 11 digits"),
  AdmNo: Yup.string().required("Admission Number is required"),
  birthday: Yup.date().required("Date of Birth is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { currentSession } = useContext(SessionContext);
  const [classData, setClassData] = useState([]);

  const navigate = useNavigate();
  const [state, setState] = useState({ date: new Date() });
  const apiUrl = process.env.REACT_APP_API_URL;

  // useEffect(() => {
  //   const token = localStorage.getItem("jwtToken");
  //   fetch(`${apiUrl}/api/class`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setClassData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching classes:", error);
  //     });
  // }, [apiUrl]);
  useEffect(() => {
    if (currentSession) {
      // Ensure currentSession is available
      const token = localStorage.getItem("jwtToken");
      fetch(`${apiUrl}/api/class/${currentSession._id}`, {
        // Use currentSession._id as sessionId
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setClassData(data);
          } else {
            console.error("Invalid data format:", data);
            setClassData([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }
  }, [apiUrl, currentSession]); // Depend on currentSession
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const dataToSubmit = {
          ...values,
          role: "student",
          sessionId: currentSession._id,
        };

        console.log("Submitting values:", dataToSubmit); // Log the data to be submitted

        await axios.post(`${apiUrl}/api/register`, dataToSubmit);

        toast.success("Student successfully created");
      } catch (err) {
        console.error("Error registering student:", err);
        toast.error("Unable to create user");
      }
    },
  });

  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Add New Students" }]} />
        </Box>

        <Stack spacing={3}>
          <SimpleCard>
            <DialogTitle id="form-dialog-title"> Add new Student</DialogTitle>
            <ValidatorForm onSubmit={formik.handleSubmit}>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <label>Username</label>
                  <TextField
                    fullWidth
                    autoFocus
                    margin="dense"
                    size="small"
                    type="text"
                    name="username"
                    placeholder="Username"
                    label="User Name"
                    variant="outlined"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />
                  <label>Email Address</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <label>Phone Number</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="tel"
                    name="phone"
                    label="Phone Number"
                    variant="outlined"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    inputProps={{ pattern: "[0-9]*" }}
                  />
                  <label>Home Address</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="address"
                    label=" Address"
                    variant="outlined"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />
                  <label>Admission No</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="AdmNo"
                    label=" Admission No"
                    variant="outlined"
                    value={formik.values.AdmNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.AdmNo && Boolean(formik.errors.AdmNo)}
                    helperText={formik.touched.AdmNo && formik.errors.AdmNo}
                  />
                  <label>Password</label>
                  <TextField
                    fullWidth
                    size="small"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <label>Student Name</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="studentName"
                    label="Student Name"
                    variant="outlined"
                    value={formik.values.studentName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.studentName &&
                      Boolean(formik.errors.studentName)
                    }
                    helperText={
                      formik.touched.studentName && formik.errors.studentName
                    }
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <label>Class</label>
                  <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                    <Select
                      name="classname"
                      value={formik.values.classname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.classname &&
                        Boolean(formik.errors.classname)
                      }
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select a class</em>
                      </MenuItem>
                      {classData?.map((classItem) => (
                        <MenuItem key={classItem._id} value={classItem.name}>
                          {classItem.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <label>Parent Name</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="parentsName"
                    label="Parent Name"
                    variant="outlined"
                    value={formik.values.parentsName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.parentsName &&
                      Boolean(formik.errors.parentsName)
                    }
                    helperText={
                      formik.touched.parentsName && formik.errors.parentsName
                    }
                  />
                  <label>Date of Birth</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    name="birthday"
                    variant="outlined"
                    value={formik.values.birthday}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.birthday && Boolean(formik.errors.birthday)
                    }
                    helperText={
                      formik.touched.birthday && formik.errors.birthday
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Button color="primary" variant="contained" type="submit">
                <Icon>send</Icon>
                <span style={{ paddingLeft: 10, textTransform: "capitalize" }}>
                  Submit
                </span>
              </Button>
            </ValidatorForm>
          </SimpleCard>
        </Stack>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Form;
