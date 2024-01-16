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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
const initialState = {
  name: "",
  teacher: "",
};

export default function FormClass() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { name, teacher } = formData;
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      teacher,
    };
    try {
      const response = await axios.post(
        `https://hlhsapi-ecaf5e7a2f6f.herokuapp.com/api/class`,
        formData
      );

      if (response.status === 200) {
        // Class successfully created
        toast.success("Class successfully created");

        // Manually trigger data refetch or navigation logic
        // Example: reFetch();

        // Close the dialog
        handleClose();
      } else {
        // Handle other status codes if necessary
        toast.error("Failed to create class");
      }
    } catch (err) {
      console.error("Error creating class:", err);
      toast.error("Unable to create class");
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
        Add new Class
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Add new Class </DialogTitle>
        <DialogTitle id="form-dialog-title" style={{ fontSize: "14px" }}>
          {" "}
          ( Note: Use Capital Letter to create class and no space: e.g JS1,JS2,
          SS1)
        </DialogTitle>

        <DialogContent>
          <label>Class Name</label>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            value={name}
            placeholder="Enter class name"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <label>Class Teacher</label>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            name="teacher"
            placeholder="Enter teacher's name"
            value={teacher}
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Class
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}
