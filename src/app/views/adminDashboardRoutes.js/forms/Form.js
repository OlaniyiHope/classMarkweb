import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MenuItem, Select, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
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
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Navigate, useNavigate } from "react-router-dom";
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
const initialState = {
  studentName: "",
  classname: "",
  address: "",
  parentsName: "",
  phone: "",

  email: "",
  username: "",
  date: "",
  password: "",
};

const Form = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ date: new Date() });
  const [showPassword, setShowPassword] = useState(false);
  const [classData, setClassData] = useState([]); // To store the list of classes

  const [formData, setFormData] = useState(initialState);
  const {
    studentName,
    classname,
    address,
    parentsName,
    phone,
    AdmNo,
    birthday,
    username,
    date,

    email,
    password,
  } = formData;

  const apiUrl = process.env.REACT_APP_API_URL.trim();

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);
  useEffect(() => {
    // Assuming you have the JWT token stored in localStorage
    const token = localStorage.getItem("jwtToken");
    // Fetch classes from your API
    fetch(`${apiUrl}/api/class`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include your authentication token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClassData(data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      studentName,
      classname,
      address,
      parentsName,
      username,
      phone,
      AdmNo,
      email,
      password,
    };
    try {
      await axios.post(`${apiUrl}/api/register`, {
        ...formData,
        role: "student",
      });

      // navigate("/dashboard/admin");
      toast.success("User successfully created");
    } catch (err) {
      console.error("Error registering student:", err);
      toast.error("Unable to create user");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              // { name: "Material", path: "/material" },
              { name: "Add New Students" },
            ]}
          />
        </Box>

        <Stack spacing={3}>
          <SimpleCard>
            <DialogTitle id="form-dialog-title"> Add new Student</DialogTitle>

            <ValidatorForm onSubmit={handleSubmit}>
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
                    value={username}
                    id="username"
                    onChange={handleChange}
                    // helperText={touched.fullname && errors.username}
                    // error={Boolean(errors.fullname && touched.username)}
                    sx={{ mb: 3 }}
                  />
                  <label>Email Address</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    // helperText={touched.email && errors.email}
                    // error={Boolean(errors.email && touched.email)}
                    sx={{ mb: 3 }}
                  />
                  <label>Phone Number</label>

                  <TextField
                    fullWidth
                    size="small"
                    type="tel" // Use type "tel" to indicate a telephone number input
                    name="phone"
                    label="Phone Number"
                    variant="outlined"
                    value={phone}
                    id="phone"
                    onChange={handleChange}
                    // helperText={touched.phone && errors.phone}
                    // error={Boolean(errors.phone && touched.phone)}
                    sx={{ mb: 3 }}
                    inputProps={{ pattern: "[0-9]*" }} // Allow only numeric input
                  />
                  <label>Home Address</label>

                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="address"
                    label=" Address"
                    variant="outlined"
                    id="address"
                    value={address}
                    onChange={handleChange}
                    // helperText={touched.address && errors.address}
                    // error={Boolean(errors.address && touched.address)}
                    sx={{ mb: 3 }}
                  />
                  <label>Admission No</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="AdmNo"
                    label=" Admission No"
                    variant="outlined"
                    id="AdmNo"
                    value={AdmNo}
                    onChange={handleChange}
                    // helperText={touched.address && errors.address}
                    // error={Boolean(errors.address && touched.address)}
                    sx={{ mb: 3 }}
                  />
                  <label>Password</label>
                  <TextField
                    fullWidth
                    size="small"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    id="password"
                    variant="outlined"
                    value={password}
                    onChange={handleChange}
                    // helperText={touched.password && errors.password}
                    // error={Boolean(errors.password && touched.password)}
                    sx={{ mb: 2 }}
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
                    value={studentName}
                    id="studentName"
                    onChange={handleChange}
                    // helperText={touched.studentName && errors.studentName}
                    // error={Boolean(errors.studentName && touched.studentName)}
                    sx={{ mb: 3 }}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <label>Class</label>
                  <TextField
                    fullWidth
                    select
                    label="Select a class"
                    variant="outlined"
                    name="classname" // Make sure the name matches your form field
                    value={classname}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                  >
                    {classData.map((classItem) => (
                      <MenuItem key={classItem._id} value={classItem.name}>
                        {classItem.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <label>Parent Name</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="parentsName"
                    label="Parent Name"
                    variant="outlined"
                    value={parentsName}
                    id="parentsName"
                    onChange={handleChange}
                    // helperText={touched.parentsName && errors.parentsName}
                    // error={Boolean(errors.parentsName && touched.parentsName)}
                    sx={{ mb: 3 }}
                  />
                  <label>Date of Birth</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    name="date"
                    variant="outlined"
                    value={date}
                    id="date"
                    onChange={handleChange}
                    // helperText={touched.date && errors.date}
                    // error={Boolean(errors.date && touched.date)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>
              <Button color="primary" variant="contained" type="submit">
                <Icon>send</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
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
