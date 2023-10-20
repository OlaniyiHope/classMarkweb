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
const initialState = {
  grade_name: "",
  gradepoint: "",
  markupto: "",
  markfrom: "",
  comment: "",
};
export default function FormDialog16() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState({ date: new Date() });
  const [formData, setformData] = useState(initialState);
  const { grade_name, gradepoint, markupto, markfrom, comment } = formData;
  const [classs, setClasss] = useState();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      grade_name,
      gradepoint,
      markupto,
      markfrom,
      comment,
    };
    try {
      await axios.post("http://localhost:3003/api/userrs/register", formData);

      navigate("/dashboard/default");
    } catch (err) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
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
        Add new Grades
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
            name="gradename"
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
          <Button onClick={handleClose} color="primary">
            Add Grade
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
