import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Icon,
  styled,
  Typography,
} from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Breadcrumb, SimpleCard } from "app/components";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

// Use styled component for TextValidator
const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const NoticeBoard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  // Using separate state for form data
  const [formData, setFormData] = useState({
    notice: "",
    posted_by: "",
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(`${apiUrl}/api/create-notice`, {
  //       ...formData,
  //       date: new Date(), // Provide the current date or the desired date
  //     });

  //     console.log("Notice created:", response.data);

  //     setFormData({
  //       notice: "",
  //       posted_by: "",
  //     });

  //     // Navigate to the desired route after successful submission
  //     navigate("/dashboard"); // Change this to the desired route
  //   } catch (error) {
  //     console.error("Error creating notice:", error);

  //     if (error.response) {
  //       console.error("Server responded with:", error.response.data);
  //     }
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data:", formData); // Add this log

    try {
      console.log("Inside try block...");

      const response = await axios.post(`${apiUrl}/api/create-notice`, {
        ...formData,
        date: new Date(),
      });

      console.log("Notice created:", response.data);

      setFormData({
        notice: "",
        posted_by: "",
      });

      console.log("Form data reset...");

      navigate("/");
    } catch (error) {
      console.error("Error creating notice:", error);

      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  return (
    <>
      <Box>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add new Notice
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"> Add new Notice</DialogTitle>
          <ValidatorForm onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="notice"
                label="Notice"
                variant="outlined"
                style={{ width: "100%" }}
                // sx={{ mb: 3 }}
                value={formData.notice}
                onChange={handleChange}
                required
              />
              <TextField
                // sx={{ mb: 4 }}
                fullWidth
                label="Posted by"
                variant="outlined"
                type="text"
                style={{ width: "100%" }}
                name="posted_by"
                value={formData.posted_by}
                onChange={handleChange}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Add Notice
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </Box>
    </>
  );
};

export default NoticeBoard;
