import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MenuItem, Select, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Breadcrumb, SimpleCard } from "../../../../app/components";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Checkbox,
  Grid,
  Icon,
  DialogTitle,
  styled,
  IconButton,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Span } from "../../../../app/components/Typography";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Navigate, useNavigate } from "react-router-dom";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const Account = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    principalName: "",
    resumptionDate: "",
    signature: null, // File field
  });

  const apiUrl = process.env.REACT_APP_API_URL.trim();

  useEffect(() => {
    // Fetch classes from your API
    fetch(`${apiUrl}/api/class`)
      .then((response) => response.json())
      .then((data) => {
        // Handle class data if needed
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for sending files
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("principalName", formData.principalName);
    formDataToSend.append("resumptionDate", formData.resumptionDate);

    if (formData.signature) {
      formDataToSend.append("signature", formData.signature);
    }

    try {
      // await axios.post(
      //   `https://hlhs-98d6f8c9ac3a.herokuapp.com/api/setting`,
      //   formDataToSend
      // );
      await axios.post(`${apiUrl}/api/setting`, formDataToSend);
      toast.success("School profile updated successfully");
    } catch (err) {
      console.error("Error updating school profile:", err);
      toast.error("Unable to update school profile");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div>
      <Container>
        <Stack spacing={3}>
          <SimpleCard>
            <DialogTitle id="form-dialog-title"> Profile Setting</DialogTitle>

            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <label>Name of School</label>
                  <TextField
                    fullWidth
                    autoFocus
                    margin="dense"
                    size="small"
                    type="text"
                    name="name"
                    placeholder="Enter the name"
                    label="Full Name"
                    variant="outlined"
                    value={formData.name}
                    id="name"
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                  />
                  <label>Principal Name</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="principalName"
                    label="Principal Name"
                    variant="outlined"
                    id="principalName"
                    value={formData.principalName}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <label>Resumption Date</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    name="resumptionDate"
                    variant="outlined"
                    value={formData.resumptionDate}
                    id="resumptionDate"
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                  />

                  <label>Signature</label>
                  <input
                    type="file"
                    name="signature"
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>
              <Button color="primary" variant="contained" type="submit">
                <Icon>send</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
              </Button>
            </ValidatorForm>
          </SimpleCard>
        </Stack>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Account;