import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import React from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  grade_name: "",
  gradepoint: "",
  markupto: "",
  markfrom: "",
  comment: "",
};
const FormDialog16 = ({ setGradesData }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const { grade_name, gradepoint, markupto, markfrom, comment } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/grade`, formData);
      const newGrade = response.data;
      toast.success(`Grade ${newGrade.grade_name} created successfully`);

      // Reset the form and close the dialog
      setFormData(initialState);
      setOpen(false);

      navigate("/dashboard/grade");

      // Optionally, you can also update the gradesData state in Grade component
      if (setGradesData) {
        setGradesData((prevData) => [...prevData, newGrade]);
      }
    } catch (error) {
      // Handle error and show an error notification
      toast.error("Error creating grade. Please try again.");
      console.error("Error creating grade:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New Grades
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Add new grade</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="grade_name"
            value={grade_name}
            placeholder="Grade name"
            type="text"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="gradepoint"
            value={gradepoint}
            placeholder="Enter grade point"
            type="number"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            type="number"
            name="markfrom"
            autoFocus
            margin="dense"
            onChange={handleChange}
            value={markfrom}
            placeholder="Enter Mark from"
            validators={["required"]}
            errorMessages={["this field is required"]}
            fullWidth
          />
          <TextField
            type="number"
            name="markupto"
            autoFocus
            margin="dense"
            onChange={handleChange}
            value={markupto}
            placeholder="Enter Mark Up to"
            validators={["required"]}
            errorMessages={["this field is required"]}
            fullWidth
          />
          <TextField
            type="text"
            name="comment"
            autoFocus
            margin="dense"
            onChange={handleChange}
            value={comment}
            placeholder="Enter Comment"
            validators={["required"]}
            errorMessages={["this field is required"]}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Grade
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default FormDialog16;
