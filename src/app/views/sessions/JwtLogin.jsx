import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pic from "./one.jpg";
import pic1 from "./two.jpg";
import logo from "./logohlhs.png";
import pic3 from "./pic-2.png";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";

import "./style.css";

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const JustifyBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "center",
}));

const ContentBox = styled(Box)(({ theme }) => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRoot = styled(JustifyBox)(({ theme }) => ({
  background: "#1A2038",
  minHeight: "100% !important",
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
  password: "",
};
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});
const JwtLogin = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    console.log("handleFormSubmit is triggered");

    try {
      // Assuming your login function returns a JWT token upon successful login
      const response = await login(values.email, values.password);
      if (response.status === 200) {
        // Successful login
        // Redirect the user after successful login
        checkUserRoleAndRedirect();
      } else {
        // Handle other status codes (e.g., 401 for unauthorized)
        console.error("Login failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  const getUserRoleFromToken = () => {
    // Implement this function to extract the user's role from the JWT token.
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      return decodedToken.role;
    }
    return "guest"; // Return a default role for unauthenticated users
  };

  const checkUserRoleAndRedirect = () => {
    const userRole = getUserRoleFromToken();

    if (userRole === "admin") {
      navigate("/dashboard/admin");
    } else if (userRole === "teacher") {
      navigate("/teacher/dashboard/default");
    } else if (userRole === "student") {
      navigate("/student/dashboard/default");
    } else {
      navigate("/session/signin"); // Redirect unauthenticated users to sign-in page
    }
  };

  return (
    <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
      <div
        className="login-aside text-center d-flex flex-column flex-row-auto"
        style={{ backgroundColor: "#000080 !important" }}
      >
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <div className="text-center mb-lg-4 mb-2 pt-5 logo">
            <img src={logo} alt="" style={{ height: "100px" }} />
          </div>
          <h3 className="mb-2 text-white">HEAVENLY LOVE HIGH SCHOOL</h3>
          <p className="mb-4" style={{ color: "white" }}>
            Welcome!...Log in to your School Dashboard. 📚💡
            <br />
          </p>
        </div>
      </div>
      <div
        className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto"
        style={{ width: "95%" }}
      >
        <div className="d-flex justify-content-center h-100 align-items-center">
          <div className="authincation-content style-2">
            <div className="row no-gutters">
              <div className="col-xl-12 tab-content">
                <div
                  id="sign-up"
                  className="auth-form tab-pane fade show active form-validation"
                >
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
                        <div className="text-center mb-4">
                          <h3 className="text-center mb-2 text-black">
                            Sign In
                          </h3>
                          <span>Your Social Campaigns</span>
                        </div>
                        <div className="row mb-4">
                          <div className="col-xl-6 col-6">
                            <Button
                              href="https://www.google.com/"
                              className="btn btn-outline-light d-block social-bx"
                            >
                              <FontAwesomeIcon
                                icon={faGoogle}
                                className="me-2"
                              />
                              <span>Sign in with Google</span>
                            </Button>
                          </div>
                          <div className="col-xl-6 col-6">
                            <Button
                              href="https://www.apple.com/"
                              className="btn btn-outline-light d-block social-bx"
                            >
                              <FontAwesomeIcon
                                icon={faApple}
                                className="me-2"
                              />
                              <span>Sign in with Apple</span>
                            </Button>
                          </div>
                        </div>
                        <div className="sepertor">
                          <span className="d-block mb-4 fs-13">
                            Or with email
                          </span>
                        </div>

                        <div className="mb-3">
                          <TextField
                            fullWidth
                            type="email"
                            name="email"
                            label="Email"
                            onBlur={handleBlur}
                            value={values.email}
                            onChange={handleChange}
                            helperText={touched.email && errors.email}
                            error={Boolean(errors.email && touched.email)}
                          />
                        </div>
                        <div className="mb-3">
                          <TextField
                            fullWidth
                            name="password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            variant="outlined"
                            onBlur={handleBlur}
                            value={values.password}
                            onChange={handleChange}
                            helperText={touched.password && errors.password}
                            error={Boolean(errors.password && touched.password)}
                            sx={{ mb: 1.5 }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
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
                        </div>
                        <a
                          href="javascript:void(0);"
                          className="float-end mb-4"
                          style={{
                            color: "red !important",
                            fontSize: "15px",
                            fontWeight: "800",
                          }}
                        >
                          Forgot Password?
                        </a>
                        <LoadingButton
                          type="submit"
                          color="primary"
                          loading={loading}
                          variant="contained"
                          sx={{ my: 2 }}
                          className="btn btn-block btn-primary"
                          style={{ paddingTop: "20px", paddingBottom: "20px" }}
                        >
                          Sign In
                        </LoadingButton>

                        <Paragraph>
                          Don't have an account?
                          <NavLink
                            to="/session/signup"
                            style={{
                              color: theme.palette.primary.main,
                              marginLeft: 5,
                            }}
                          >
                            Register
                          </NavLink>
                          Do you want to the home page?
                          <NavLink
                            to="https://kubiquee.vercel.app"
                            style={{
                              color: theme.palette.primary.main,
                              marginLeft: 5,
                            }}
                          >
                            Home
                          </NavLink>
                        </Paragraph>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JwtLogin;
