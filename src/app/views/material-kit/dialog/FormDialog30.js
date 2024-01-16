import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const initialState = {
  username: "",
  email: "",
  password: "",
  address: "",
  phone: "",
};

export default function FormDialog3() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { username, email, password, address, phone } = formData;
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username,
      email,
      password,
      address,
      phone,
      role: "parent", // Hardcode the role to "teacher"
    };

    try {
      // Fetch the authentication token from local storage
      const token = localStorage.getItem("jwtToken");

      // Include the token in the request headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make an API call to create a teacher
      await axios.post(
        `https://hlhsapi-ecaf5e7a2f6f.herokuapp.com/api/create-parent`,
        formData,
        {
          headers, // Include the headers in the request
        }
      );

      // Handle successful teacher creation
      navigate("/dashboard/parent");
    } catch (err) {
      // Handle errors
      console.error("Error creating parent:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new Parent
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Add new parent</DialogTitle>
        <DialogContent>
          <label>User name</label>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            value={username}
            placeholder="Teachers name"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <label>Email address</label>
          <TextField
            autoFocus
            margin="dense"
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            fullWidth
            onChange={handleChange}
          />
          <label>Home Address</label>
          <TextField
            type="text"
            name="address"
            autoFocus
            margin="dense"
            value={address}
            placeholder="Address"
            fullWidth
            onChange={handleChange}
          />
          <label>Phone Number</label>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            name="phone"
            value={phone}
            placeholder="Phone Number"
            fullWidth
            onChange={handleChange}
          />
          <label>Password</label>
          <TextField
            autoFocus
            margin="dense"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Parent
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
