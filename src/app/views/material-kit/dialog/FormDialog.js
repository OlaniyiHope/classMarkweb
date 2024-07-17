// import { Box, InputAdornment, IconButton } from "@mui/material";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import TextField from "@mui/material/TextField";
// import * as Yup from "yup";
// import { Field, Formik } from "formik";
// import { React, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";

// import axios from "axios";
// import CustomLabel from "app/views/sessions/CustomLabel";
// const initialState = {
//   username: "",
//   email: "",
//   password: "",
//   phone: "",
//   address: "",
// };

// const validationSchema = Yup.object().shape({
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters long")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//     .matches(/[0-9]/, "Password must contain at least one number")
//     .matches(
//       /[@$!%*?&#]/,
//       "Password must contain at least one special character"
//     )
//     .required("Password is required!"),
//   email: Yup.string()
//     .email("Invalid Email address")
//     .required("Email is required!"),
//   phone: Yup.string().matches(
//     /^\d{11}$/,
//     "Phone number must be exactly 11 digits"
//   ),
//   role: Yup.string().required("Role is required!"),
// });
// export default function FormDialog({ updateTableData }) {
//   const [formData, setformData] = useState(initialState);
//   const { username, email, password, phone, address } = formData;
//   const [open, setOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   function handleClickOpen() {
//     setOpen(true);
//   }
//   const apiUrl = process.env.REACT_APP_API_URL;

//   function handleClose() {
//     setOpen(false);
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setformData({ ...formData, [name]: value });
//   };
//   // const handleClick = async (e) => {
//   //   e.preventDefault();
//   //   const userData = {
//   //     username,
//   //     email,
//   //     password,
//   //     phone,
//   //     address,
//   //   };
//   //   try {
//   //     await axios.post(`${apiUrl}/api/register`, {
//   //       ...formData,
//   //       role: "admin",
//   //     });
//   //     // navigate("/dashboard/admin");
//   //     toast.success("User successfully created");
//   //     handleClose();
//   //   } catch (err) {
//   //     console.error("Error registering student:", err);
//   //     toast.error("Unable to create user");
//   //   }
//   // };
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const userData = {
//       username,
//       email,
//       password,
//       phone,
//       address,
//     };
//     try {
//       const response = await axios.post(`${apiUrl}/api/register`, {
//         ...formData,
//         role: "admin",
//       });
//       // Assuming the response contains the new admin data
//       const newAdmin = response.data;
//       // Update the table data in the parent component (ViewAdmin)
//       updateTableData(newAdmin);
//       toast.success("User successfully created");
//       handleClose();
//     } catch (err) {
//       console.error("Error registering admin:", err);
//       toast.error("Unable to create user");
//     }
//   };

//   return (
//     <Box>
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Add New Admin
//       </Button>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="form-dialog-title"
//       >
//         <DialogTitle id="form-dialog-title"> Add new Admin</DialogTitle>
//         <Formik
//           onSubmit={handleFormSubmit}
//           initialValues={initialState}
//           validationSchema={validationSchema}
//         >
//           {({ values, errors, touched, handleChange, handleBlur }) => (
//             <DialogContent>
//               <label>Username</label>

//               <TextField
//                 fullWidth
//                 size="small"
//                 type="text"
//                 name="username"
//                 label={<CustomLabel label="Username" required />}
//                 variant="outlined"
//                 onBlur={handleBlur}
//                 value={values.username}
//                 id="username"
//                 onChange={handleChange}
//                 helperText={touched.fullname && errors.username}
//                 error={Boolean(errors.fullname && touched.username)}
//                 sx={{ mb: 3 }}
//               />

//               <label>Email</label>
//               <TextField
//                 autoFocus
//                 margin="dense"
//                 name="email"
//                 value={email}
//                 placeholder="Enter your email"
//                 type="email"
//                 onChange={handleChange}
//                 fullWidth
//               />
//               <TextField
//                 fullWidth
//                 size="small"
//                 type="email"
//                 name="email"
//                 label={<CustomLabel label="Email" required />}
//                 variant="outlined"
//                 onBlur={handleBlur}
//                 id="email"
//                 value={values.email}
//                 onChange={handleChange}
//                 helperText={touched.email && errors.email}
//                 error={Boolean(errors.email && touched.email)}
//                 sx={{ mb: 3 }}
//               />
//               <TextField
//                 fullWidth
//                 size="small"
//                 type="text" // Use type "tel" to indicate a telephone number input
//                 name="phone"
//                 label={<CustomLabel label="Phone Number" />}
//                 variant="outlined"
//                 onBlur={handleBlur}
//                 value={values.phone}
//                 id="phone"
//                 onChange={handleChange}
//                 helperText={touched.phone && errors.phone}
//                 error={Boolean(errors.phone && touched.phone)}
//                 sx={{ mb: 3 }}
//                 inputProps={{ pattern: "[0-9]*" }} // Allow only numeric input
//               />

//               <TextField
//                 fullWidth
//                 size="small"
//                 type="text"
//                 name="address"
//                 label={<CustomLabel label="Address" />}
//                 variant="outlined"
//                 id="address"
//                 onBlur={handleBlur}
//                 value={values.address}
//                 onChange={handleChange}
//                 helperText={touched.address && errors.address}
//                 error={Boolean(errors.address && touched.address)}
//                 sx={{ mb: 3 }}
//               />
//               <TextField
//                 fullWidth
//                 size="small"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 label={<CustomLabel label="Password" required />}
//                 id="password"
//                 variant="outlined"
//                 onBlur={handleBlur}
//                 value={values.password}
//                 onChange={handleChange}
//                 helperText={touched.password && errors.password}
//                 error={Boolean(errors.password && touched.password)}
//                 sx={{ mb: 2 }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </DialogContent>
//           )}
//         </Formik>
//         <DialogActions>
//           <Button variant="outlined" color="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button color="primary" type="submit">
//             Add Admin
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <ToastContainer />
//     </Box>
//   );
// }

// import { Box } from "@mui/material";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
// import { React, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import axios from "axios";
// const initialState = {
//   username: "",
//   email: "",
//   password: "",
//   phone: "",
//   address: "",
// };
// export default function FormDialog({ updateTableData }) {
//   const [formData, setformData] = useState(initialState);
//   const { username, email, password, phone, address } = formData;
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   function handleClickOpen() {
//     setOpen(true);
//   }
//   const apiUrl = process.env.REACT_APP_API_URL;

//   function handleClose() {
//     setOpen(false);
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setformData({ ...formData, [name]: value });
//   };
//   // const handleClick = async (e) => {
//   //   e.preventDefault();
//   //   const userData = {
//   //     username,
//   //     email,
//   //     password,
//   //     phone,
//   //     address,
//   //   };
//   //   try {
//   //     await axios.post(`${apiUrl}/api/register`, {
//   //       ...formData,
//   //       role: "admin",
//   //     });
//   //     // navigate("/dashboard/admin");
//   //     toast.success("User successfully created");
//   //     handleClose();
//   //   } catch (err) {
//   //     console.error("Error registering student:", err);
//   //     toast.error("Unable to create user");
//   //   }
//   // };
//   const handleClick = async (e) => {
//     e.preventDefault();
//     const userData = {
//       username,
//       email,
//       password,
//       phone,
//       address,
//     };
//     try {
//       const response = await axios.post(`${apiUrl}/api/register`, {
//         ...formData,
//         role: "admin",
//       });
//       // Assuming the response contains the new admin data
//       const newAdmin = response.data;
//       // Update the table data in the parent component (ViewAdmin)
//       updateTableData(newAdmin);
//       toast.success("User successfully created");
//       handleClose();
//     } catch (err) {
//       console.error("Error registering admin:", err);
//       toast.error("Unable to create user");
//     }
//   };

//   return (
//     <Box>
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Add New Admin
//       </Button>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="form-dialog-title"
//       >
//         <DialogTitle id="form-dialog-title"> Add new Admin</DialogTitle>
//         <DialogContent>
//           <label>Username</label>

//           <TextField
//             autoFocus
//             margin="dense"
//             name="username"
//             value={username}
//             placeholder="Enter your name"
//             type="text"
//             onChange={handleChange}
//             fullWidth
//           />
//           <label>Email</label>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="email"
//             value={email}
//             placeholder="Enter your email"
//             type="email"
//             onChange={handleChange}
//             fullWidth
//           />
//           <label>Phone Number</label>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="phone"
//             value={phone}
//             placeholder="Enter your phone number"
//             onChange={handleChange}
//             type="number"
//             fullWidth
//           />
//           <label>Home Address</label>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="address"
//             value={address}
//             placeholder="Add your address"
//             onChange={handleChange}
//             type="text"
//             fullWidth
//           />
//           <label>Password</label>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="password"
//             value={password}
//             placeholder="Enter your password"
//             onChange={handleChange}
//             type="password"
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button variant="outlined" color="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button color="primary" onClick={handleClick}>
//             Add Admin
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <ToastContainer />
//     </Box>
//   );
// }
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const initialState = {
  username: "",
  email: "",
  password: "",
  phone: "",
  address: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  phone: Yup.string().matches(
    /^\d{11}$/,
    "Phone number must be exactly 11 digits"
  ),
  address: Yup.string().required("Address is required"),
});

export default function FormDialog({ updateTableData }) {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New Admin
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Add new Admin</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await axios.post(`${apiUrl}/api/register`, {
                  ...values,
                  role: "admin",
                });
                const newAdmin = response.data;
                updateTableData(newAdmin);
                toast.success("User successfully created");
                handleClose();
              } catch (err) {
                console.error("Error registering admin:", err);
                toast.error("Unable to create user");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <label>Username</label>
                <TextField
                  autoFocus
                  margin="dense"
                  name="username"
                  value={values.username}
                  placeholder="Enter your name"
                  type="text"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.username && errors.username}
                  error={touched.username && Boolean(errors.username)}
                />
                <label>Email</label>
                <TextField
                  autoFocus
                  margin="dense"
                  name="email"
                  value={values.email}
                  placeholder="Enter your email"
                  type="email"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email && errors.email}
                  error={touched.email && Boolean(errors.email)}
                />
                <label>Phone Number</label>
                <TextField
                  autoFocus
                  margin="dense"
                  name="phone"
                  value={values.phone}
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  error={touched.phone && Boolean(errors.phone)}
                />
                <label>Home Address</label>
                <TextField
                  autoFocus
                  margin="dense"
                  name="address"
                  value={values.address}
                  placeholder="Add your address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  fullWidth
                  helperText={touched.address && errors.address}
                  error={touched.address && Boolean(errors.address)}
                />
                <label>Password</label>
                <TextField
                  autoFocus
                  margin="dense"
                  name="password"
                  value={values.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  helperText={touched.password && errors.password}
                  error={touched.password && Boolean(errors.password)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <DialogActions>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    Add Admin
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}
