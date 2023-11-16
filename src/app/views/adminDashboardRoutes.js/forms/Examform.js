import { Box, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import useFetch from "hooks/useFetch";

const initialState = {
  name: "",
  date: "",
  comment: "",
};

export default function Examform() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, comment, date } = formData;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the authentication token from wherever you've stored it (e.g., local storage)
      const token = localStorage.getItem("jwtToken");

      // Include the token in the request headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make an API call to create a subject
      await axios.post("http://localhost:3003/api/offlineexam", formData, {
        headers, // Include the headers in the request
      });

      // Handle successful subject creation
      navigate("/dashboard/examlist");
    } catch (err) {
      // Handle errors
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
        Add Exam
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Add Exam</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            value={name}
            placeholder="Exam Name"
            type="text"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="date"
            value={date}
            placeholder="Exam Date"
            type="Date"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="comment"
            value={comment}
            placeholder="Comment"
            type="text"
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Exam
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
