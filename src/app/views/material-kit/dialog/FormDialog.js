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

import axios from "axios";
const initialState = {
  username: "",
  email: "",
  password: "",
  phone: "",
  address: "",
};
export default function FormDialog({ history }) {
  const [formData, setformData] = useState(initialState);
  const { username, email, password, phone, address } = formData;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
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
      await axios.post("http://localhost:5000/api/ad/register", userData);

      navigate("/dashboard/default");
    } catch (err) {}
  };

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new Admin
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Add new Admin</DialogTitle>
        <DialogContent>
          <DialogContentText>Add Admin</DialogContentText>

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
          <TextField
            autoFocus
            margin="dense"
            name="address"
            value={address}
            placeholder="address"
            onChange={handleChange}
            type="text"
            fullWidth
          />
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
    </Box>
  );
}
