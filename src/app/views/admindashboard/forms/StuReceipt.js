import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Stack,
  Box,
  Button,
  Icon,
  Checkbox,
  styled,
  Grid,
  Select,
  InputLabel,
} from "@mui/material";
// Assuming you have a SimpleCard component
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { Breadcrumb, SimpleCard } from "../../../../app/components";
import { useReceipt } from "./receiptContext"; // Import your context hook
import useFetch from "../../../../hooks/useFetch";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));
const StuReceipt = () => {
  const { dispatch } = useReceipt();
  const {
    data: classData,
    loading: classLoading,
    error: classError,
  } = useFetch("/class"); // Assuming useFetch is correctly implemented

  const navigate = useNavigate();

  const [state, setState] = useState({ date: new Date() });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [typeOfPayment, setTypeOfPayment] = useState("");
  const [studentData, setStudentData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL.trim();

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;
      return true;
    });

    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStudentChange = (event) => {
    const selectedStudent = event.target.value;
    setSelectedName(selectedStudent);
  };

  useEffect(() => {
    if (selectedClass) {
      const token = localStorage.getItem("jwtToken");
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      fetch(`${apiUrl}/api/student/${selectedClass}`, {
        headers,
      })
        .then((response) => response.json())
        .then((data) => {
          setStudentData(data);
        })
        .catch((error) => {
          console.error("Error fetching subjects:", error);
        });
    } else {
      setStudentData([]);
    }
  }, [selectedClass]);

  const handleClassChange = (event) => {
    const newSelectedClass = event.target.value;
    setSelectedClass(newSelectedClass);
    setStudentData([]);
  };

  //   const handleSubjectChange = (event) => {
  //     setSelectedSubject(event.target.value);
  //   };

  const [formData, setFormData] = useState({
    typeOfPayment: "",
    status: "",
    reason: "",
    studentName: "",
    classname: "",
    paid: 0,
    amount: 0,
    date: "",
  });

  const handlereceiptChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClass || !selectedName) {
      console.error("Please select a class and student.");
      // You can also show an error message to the user
      return;
    }

    try {
      dispatch({ type: "CREATE_RECEIPT_START" });

      const response = await axios.post(`${apiUrl}/api/receipt`, {
        ...formData,
        studentName: selectedName,
        classname: selectedClass,
        date: selectedDate, // Set the date field
      });

      console.log("Receipt created:", response.data);

      setFormData({
        typeOfPayment: "",
        status: "",
        reason: "",
        studentName: selectedName,
        classname: selectedClass,
        paid: 0,
        amount: 0,
        date: "",
      });

      dispatch({ type: "CREATE_RECEIPT_SUCCESS" });
      // Step 3: Navigate to the desired route after successful submission
      navigate("/dashboard/student-payment");
    } catch (error) {
      console.error("Error creating receipt:", error);

      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }

      dispatch({ type: "CREATE_RECEIPT_ERROR" });
    }
  };

  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              // { name: "Receipt", path: "/material" },
              { name: "Student Receipt" },
            ]}
          />
        </Box>

        <Stack spacing={3}>
          <SimpleCard title="Student Receipt">
            <ValidatorForm onError={() => null}>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    select
                    label="Select a class"
                    variant="outlined"
                    value={selectedClass}
                    onChange={handleClassChange}
                  >
                    {classData &&
                      classData.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </TextField>

                  <TextField
                    select
                    label="Select the Student"
                    variant="outlined"
                    value={selectedName}
                    onChange={handleStudentChange}
                  >
                    {studentData.map((student) => (
                      <MenuItem key={student.id} value={student.studentName}>
                        {student.studentName}
                      </MenuItem>
                    ))}
                  </TextField>
                  <InputLabel>Date</InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    variant="outlined"
                    sx={{ mb: 3 }}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  <TextField
                    sx={{ mb: 4 }}
                    type="text"
                    name="amount"
                    label="Total Fees"
                    onChange={handleChange}
                    value={formData.amount}
                    errorMessages={["This field is required"]}
                    validators={[
                      "required",
                      "minStringLength:4",
                      "maxStringLength:16",
                    ]}
                  />

                  <TextField
                    sx={{ mb: 4 }}
                    type="text"
                    name="paid"
                    label="Amount Paid"
                    value={formData.paid}
                    onChange={handleChange}
                    errorMessages={["This field is required"]}
                    validators={[
                      "required",
                      "minStringLength:4",
                      "maxStringLength:16",
                    ]}
                  />
                  <TextField
                    name="reason"
                    type="text"
                    label="Reason"
                    value={formData.reason}
                    onChange={handleChange}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                  <InputLabel>Method of payment</InputLabel>
                  <Select
                    label="Type of Payment"
                    variant="outlined"
                    value={formData.typeOfPayment}
                    onChange={handleChange}
                    name="typeOfPayment"
                    fullWidth
                  >
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Transfer">Transfer</MenuItem>
                    <MenuItem value="Cheque">Cheque</MenuItem>
                  </Select>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    variant="outlined"
                    value={formData.status}
                    onChange={handleChange}
                    name="status"
                    fullWidth
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Success">Success</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Button
                color="primary"
                variant="contained"
                style={{ marginTop: "20px" }}
                type="submit"
                onClick={handleSubmit}
              >
                <Icon>send</Icon>
                Submit
              </Button>
            </ValidatorForm>
          </SimpleCard>
        </Stack>
      </Container>
    </div>
  );
};

export default StuReceipt;