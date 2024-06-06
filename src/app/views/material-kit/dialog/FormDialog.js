import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
const initialState = {
  username: "",
  email: "",
  password: "",
  phone: "",
  address: "",
};
export default function FormDialog({ updateTableData }) {
  const [formData, setformData] = useState(initialState);
  const { username, email, password, phone, address } = formData;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  function handleClickOpen() {
    setOpen(true);
  }
  const apiUrl = process.env.REACT_APP_API_URL;

  function handleClose() {
    setOpen(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   const userData = {
  //     username,
  //     email,
  //     password,
  //     phone,
  //     address,
  //   };
  //   try {
  //     await axios.post(`${apiUrl}/api/register`, {
  //       ...formData,
  //       role: "admin",
  //     });
  //     // navigate("/dashboard/admin");
  //     toast.success("User successfully created");
  //     handleClose();
  //   } catch (err) {
  //     console.error("Error registering student:", err);
  //     toast.error("Unable to create user");
  //   }
  // };
  const handleClick = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
      phone,
      address,
    };
    try {
      const response = await axios.post(`${apiUrl}/api/register`, {
        ...formData,
        role: "admin",
      });
      // Assuming the response contains the new admin data
      const newAdmin = response.data;
      // Update the table data in the parent component (ViewAdmin)
      updateTableData(newAdmin);
      toast.success("User successfully created");
      handleClose();
    } catch (err) {
      console.error("Error registering admin:", err);
      toast.error("Unable to create user");
    }
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
          <label>Username</label>

          <TextField
            autoFocus
            margin="dense"
            name="username"
            value={username}
            placeholder="Enter your name"
            type="text"
            onChange={handleChange}
            fullWidth
          />
          <label>Email</label>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            value={email}
            placeholder="Enter your email"
            type="email"
            onChange={handleChange}
            fullWidth
          />
          <label>Phone Number</label>
          <TextField
            autoFocus
            margin="dense"
            name="phone"
            value={phone}
            placeholder="Enter your phone number"
            onChange={handleChange}
            type="number"
            fullWidth
          />
          <label>Home Address</label>
          <TextField
            autoFocus
            margin="dense"
            name="address"
            value={address}
            placeholder="Add your address"
            onChange={handleChange}
            type="text"
            fullWidth
          />
          <label>Password</label>
          <TextField
            autoFocus
            margin="dense"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleChange}
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleClick}>
            Add Admin
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}
