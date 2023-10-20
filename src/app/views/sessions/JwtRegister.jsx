import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  Checkbox,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

// inital login credentials
const initialValues = {
  email: "",
  phone: "",
  password: "",
  address: "",
  username: "",
  classname: "",
  parentsName: "",
  studentName: "",
  date: "",
  role: "",
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});
const roles = ["admin", "teacher", "student"]; // Define the available roles

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (values) => {
    setLoading(true);

    try {
      register(
        values.email,
        values.phone,
        values.password,
        values.address,
        values.username,
        values.role,
        values.classname,
        values.parentsName,
        values.studentName,
        values.date
      );
      navigate("/");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(""); // State to hold the selected role

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="60%"
                alt="Register"
                src="/assets/images/illustrations/save.png"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <bold>
                      <h5 style={{ fontWeight: "700", fontSize: "25px" }}>
                        Register
                      </h5>
                    </bold>

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="username"
                      label="Full Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.username}
                      id="username"
                      onChange={handleChange}
                      helperText={touched.fullname && errors.username}
                      error={Boolean(errors.fullname && touched.username)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="phone"
                      name="phone"
                      label="Phone Number"
                      variant="outlined"
                      id="phone"
                      onBlur={handleBlur}
                      value={values.phone}
                      onChange={handleChange}
                      helperText={touched.phone && errors.phone}
                      error={Boolean(errors.phone && touched.phone)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="address"
                      label=" Address"
                      variant="outlined"
                      id="address"
                      onBlur={handleBlur}
                      value={values.address}
                      onChange={handleChange}
                      helperText={touched.address && errors.address}
                      error={Boolean(errors.address && touched.address)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      id="password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 2 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormControl component="fieldset" sx={{ mb: 3 }}>
                      <FormLabel component="legend">Select a Role</FormLabel>
                      <RadioGroup
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                      >
                        {roles.map((role) => (
                          <FormControlLabel
                            key={role}
                            value={role}
                            control={<Radio />}
                            label={role}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                    {values.role === "student" && (
                      <div>
                        <TextField
                          fullWidth
                          size="small"
                          type="text"
                          name="studentName"
                          label="Student Name"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.studentName}
                          id="studentName"
                          onChange={handleChange}
                          helperText={touched.studentName && errors.studentName}
                          error={Boolean(
                            errors.studentName && touched.studentName
                          )}
                          sx={{ mb: 3 }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          type="text"
                          name="classname"
                          label="Class Name"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.classname}
                          id="classname"
                          onChange={handleChange}
                          helperText={touched.classname && errors.classname}
                          error={Boolean(errors.classname && touched.classname)}
                          sx={{ mb: 3 }}
                        />
                        <TextField
                          fullWidth
                          size="small"
                          type="text"
                          name="parentsName"
                          label="Parent Name"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.parentsName}
                          id="parentsName"
                          onChange={handleChange}
                          helperText={touched.parentsName && errors.parentsName}
                          error={Boolean(
                            errors.parentsName && touched.parentsName
                          )}
                          sx={{ mb: 3 }}
                        />
                        <TextField
                          fullWidth
                          size="small"
                          type="date"
                          name="date"
                          label="Date of birth"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.date}
                          id="date"
                          onChange={handleChange}
                          helperText={touched.date && errors.date}
                          error={Boolean(errors.date && touched.date)}
                          sx={{ mb: 3 }}
                        />

                        {/* Add more student-specific fields as needed */}
                      </div>
                    )}

                    <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        I have read and agree to the terms of service.
                      </Paragraph>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Register
                    </LoadingButton>

                    <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/session/signin"
                        style={{
                          color: theme.palette.primary.main,
                          marginLeft: 5,
                        }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
