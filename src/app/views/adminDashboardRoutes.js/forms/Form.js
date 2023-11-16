import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MenuItem, Select, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  DialogTitle,
  RadioGroup,
  styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
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
  student_name: "",
  classname: "",
  address: "",
  parentName: "",
  phone: "",
  rollNo: "",
  birthday: "",
  gender: "",
  age: "",
  email: "",
  password: "",
};
const Form = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ date: new Date() });
  const [formData, setformData] = useState(initialState);
  const {
    studentName,
    classname,
    address,
    parentName,
    phone,
    rollNo,
    birthday,
    gender,
    age,
    email,
    password,
  } = formData;
  const [classs, setClasss] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      studentName,
      classname,
      address,
      parentName,
      phone,
      gender,
      birthday,
      rollNo,
      age,
      email,
      password,
    };
    try {
      await axios.post(
        "https://edu-3cb7e7c6ba61.herokuapp.com/api/userrs/register",
        formData
      );

      navigate("admin/dashboard");
    } catch (err) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const {} = state;

  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "Material", path: "/material" },
              { name: "Form" },
            ]}
          />
        </Box>

        <Stack spacing={3}>
          <SimpleCard title="Simple Form">
            <DialogTitle id="form-dialog-title"> Add new Student</DialogTitle>
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="studentName"
                    value={studentName}
                    placeholder="Enter the name"
                    type="text"
                    onChange={handleChange}
                    fullWidth
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    name="parentName"
                    value={parentName}
                    onChange={handleChange}
                    errorMessages={["this field is required"]}
                    placeholder="Parent name"
                  />

                  <TextField
                    type="text"
                    name="rollNo"
                    autoFocus
                    margin="dense"
                    onChange={handleChange}
                    value={rollNo}
                    placeholder="ID No"
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextField
                    type="date"
                    name="birthday"
                    autoFocus
                    margin="dense"
                    onChange={handleChange}
                    value={birthday}
                    placeholder="Birthday"
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <RadioGroup
                    row
                    name="gender"
                    value={gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                  <TextField
                    type="text"
                    name="address"
                    autoFocus
                    margin="dense"
                    onChange={handleChange}
                    value={address}
                    placeholder="Enter your address"
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <Select
                    autoFocus
                    value={classname}
                    onChange={handleChange}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select a class
                    </MenuItem>
                    <MenuItem value="Class A">Class A</MenuItem>
                    <MenuItem value="Class B">Class B</MenuItem>
                    <MenuItem value="Class C">Class C</MenuItem>
                    {/* Add more classes as needed */}
                  </Select>

                  <TextField
                    autoFocus
                    margin="dense"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "email is not valid",
                    ]}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    type="number"
                    name="phone"
                    value={phone}
                    placeholder="Enter your phone number"
                    onChange={handleChange}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />{" "}
                  {/* <RadioGroup
                    row
                    name="gender"
                    sx={{ mb: 2 }}
                    value={gender || ""}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Male"
                      label="Male"
                      labelPlacement="end"
                      control={<Radio color="secondary" />}
                    />

                    <FormControlLabel
                      value="Female"
                      label="Female"
                      labelPlacement="end"
                      control={<Radio color="secondary" />}
                    />
                  </RadioGroup> */}
                </Grid>
              </Grid>

              <Button color="primary" variant="contained" type="submit">
                <Icon>send</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
              </Button>
            </ValidatorForm>
          </SimpleCard>
        </Stack>
      </Container>
    </div>
  );
};

export default Form;
