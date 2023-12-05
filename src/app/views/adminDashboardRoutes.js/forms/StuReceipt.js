// import { DatePicker } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import { MenuItem, Select, Stack } from "@mui/material";
// import { Box } from "@mui/system";
// import { Breadcrumb, SimpleCard } from "app/components";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import useFetch from "hooks/useFetch";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Grid,
//   Icon,
//   Radio,
//   RadioGroup,
//   styled,
// } from "@mui/material";
// import { Span } from "app/components/Typography";
// import { useEffect, useState } from "react";
// import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
// import { useReceipt } from "./receiptContext";
// import axios from "axios";

// const Container = styled("div")(({ theme }) => ({
//   margin: "30px",
//   [theme.breakpoints.down("sm")]: { margin: "16px" },
//   "& .breadcrumb": {
//     marginBottom: "30px",
//     [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
//   },
// }));

// const TextField = styled(TextValidator)(() => ({
//   width: "100%",
//   marginBottom: "16px",
// }));

// const StuReceipt = () => {
//   const {
//     data: classData,
//     loading: classLoading,
//     error: classError,
//   } = useFetch("/class");
//   const navigate = useNavigate();

//   const [state, setState] = useState({ date: new Date() });
//   const [selectedDate, setSelectedDate] = useState(""); // Initialize selectedDate state
//   const [selectedClass, setSelectedClass] = useState("");
//   const [typeOfPayment, setTypeOfPayment] = useState("");
//   const [selectedName, setSelectedName] = useState("");
//   const [subjectData, setSubjectData] = useState([]); // Initialize subject data as an empty array

//   useEffect(() => {
//     ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
//       if (value !== state.password) return false;

//       return true;
//     });
//     return () => ValidatorForm.removeValidationRule("isPasswordMatch");
//   }, [state.password]);

//   const handleChange = (event) => {
//     event.persist();
//     setState({ ...state, [event.target.name]: event.target.value });
//   };

//   const handleDateChange = (date) => setState({ ...state, date });

//   useEffect(() => {
//     if (selectedClass) {
//       // Fetch the authentication token from wherever you've stored it (e.g., local storage)
//       const token = localStorage.getItem("jwtToken");

//       // Include the token in the request headers
//       const headers = new Headers();
//       headers.append("Authorization", `Bearer ${token}`);

//       // Make an API call to fetch subjects for the selected class with the authorization token
//       fetch(`http://localhost:3003/api/students/${selectedClass}`, {
//         headers,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setSubjectData(data);
//         })
//         .catch((error) => {
//           console.error("Error fetching students:", error);
//         });
//     } else {
//       // Clear the subjects if no class is selected
//       setSubjectData([]);
//     }
//   }, [selectedClass]);

// //   const { StudentName, Classname, amount, balance, reason, Trstatus, date } =
// //     state;
// //   console.log(selectedDate);

// //   const newItem = {
// //     studentName: selectedName,
// //     classname: selectedClass,
// //     reason,
// //     date: selectedDate,
// //     amount,
// //     balance,
// //     typeOfPayment,
// //     status: Trstatus,
// //   };

//   const handleClassChange = (event) => {
//     const newSelectedClass = event.target.value;
//     setSelectedClass(newSelectedClass);

//     // Clear the selected subject when the class changes
//     setSelectedName("");
//   };
//   const handleSubjectChange = (event) => {
//     setSelectedName(event.target.value);
//   };

//   const token = localStorage.getItem("jwtToken");

//   if (!token) {
//     // Handle the case where the token is missing or expired, e.g., redirect to login
//     return;
//   }

//   //   const handleSubmit = (event) => {
//   //     fetch("http://localhost:3003/api/receipt/", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
//   //       },
//   //       body: JSON.stringify(newItem),
//   //     })
//   //       .then((response) => response.json())
//   //       .then((data) => {
//   //         navigate("/dashboard/student-payment");
//   //         // console.log(data)
//   //       })
//   //       .catch((error) => {
//   //         console.log(error);
//   //       });
//   //     // .finally(() => {
//   //     //   setisLoading(false);
//   //     // });
//   //   };

//   const { dispatch } = useReceipt();

//   const [formData, setFormData] = useState({
//     typeOfPayment: "",
//     status: "",
//     reason: "",
//     studentName: "",
//     classname: "",
//     balance: 0,
//     amount: 0,
//     date: "",
//   });

//   const handlereceiptChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Dispatch Context action to handle loading state
//       dispatch({ type: "CREATE_RECEIPT_START" });

//       // Make API request to create a receipt
//       const response = await axios.post(
//         "http://localhost:3003/api/receipt",
//         formData
//       );

//       // Handle successful response
//       console.log("Receipt created:", response.data);

//       // Clear form data
//       setFormData({
//         typeOfPayment: "",
//         status: "",
//         reason: "",
//         studentName: "",
//         classname: "",
//         balance: 0,
//         amount: 0,
//         date: "",
//       });

//       // Dispatch Context action for success
//       dispatch({ type: "CREATE_RECEIPT_SUCCESS" });
//     } catch (error) {
//       // Handle error
//       console.error("Error creating receipt:", error);

//       // Dispatch Context action for error
//       dispatch({ type: "CREATE_RECEIPT_ERROR" });
//     }
//   };
//   return (
//     <div>
//       <Container>
//         <Box className="breadcrumb">
//           <Breadcrumb
//             routeSegments={[
//               { name: "Material", path: "/material" },
//               { name: "Form" },
//             ]}
//           />
//         </Box>

//         <Stack spacing={3}>
//           <SimpleCard title="Simple Form">
//             <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
//               <Grid container spacing={6}>
//                 <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
//                   <TextField
//                     select
//                     label="Select a class"
//                     variant="outlined"
//                     value={formData.classname} // Bind the selected value
//                     onChange={handleClassChange} // Handle the change
//                   >
//                     {classData &&
//                       classData.map((item) => (
//                         <MenuItem key={item.id} value={item.name}>
//                           {item.name}
//                         </MenuItem>
//                       ))}
//                   </TextField>
//                   <TextField
//                     select
//                     label="Select the Student"
//                     variant="outlined"
//                     value={formData.studentName}
//                     onChange={handleSubjectChange}
//                   >
//                     {Array.isArray(subjectData) &&
//                       subjectData.map((item) => (
//                         <MenuItem key={item.id} value={item.studentName}>
//                           {item.studentName}
//                         </MenuItem>
//                       ))}
//                   </TextField>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     type="date"
//                     label=" Date"
//                     variant="outlined"
//                     sx={{ mb: 3 }}
//                     value={formData.date}
//                     onChange={(e) => setSelectedDate(e.target.value)} // Update the selectedDate when the user selects a date
//                   />

//                   <TextField
//                     sx={{ mb: 4 }}
//                     type="number"
//                     name="amount"
//                     label="Amount"
//                     onChange={handlereceiptChange}
//                     value={formData.amount}
//                     errorMessages={["this field is required"]}
//                     validators={[
//                       "required",
//                       "minStringLength:4",
//                       "maxStringLength: 16",
//                     ]}
//                   />
//                 </Grid>

//                 <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
//                   <TextField
//                     sx={{ mb: 4 }}
//                     type="number"
//                     name="balance"
//                     label="Balance"
//                     value={formData.balance}
//                     onChange={handlereceiptChange}
//                     errorMessages={["this field is required"]}
//                     validators={[
//                       "required",
//                       "minStringLength:4",
//                       "maxStringLength: 16",
//                     ]}
//                   />
//                   <TextField
//                     name="reason"
//                     type="text"
//                     label="Reason"
//                     value={formData.reason}
//                     onChange={handlereceiptChange}
//                     validators={["required"]}
//                     errorMessages={["this field is required"]}
//                   />{" "}
//                   <RadioGroup
//                     row
//                     name="status"
//                     value={formData.status}
//                     onChange={handlereceiptChange}
//                     sx={{ mb: 2 }}
//                   >
//                     <FormControlLabel
//                       value="Pending"
//                       label="Pending"
//                       labelPlacement="end"
//                       control={<Radio color="secondary" />}
//                     />

//                     <FormControlLabel
//                       value="Success"
//                       label="Success"
//                       labelPlacement="end"
//                       control={<Radio color="secondary" />}
//                     />
//                   </RadioGroup>
//                   <Select
//                     autoFocus
//                     type="text"
//                     id="typeOfPayment"
//                     name="typeOfPayment"
//                     value={formData.typeOfPayment}
//                     onChange={handleChange}
//                     fullWidth
//                   >
//                     <MenuItem value="Cash">Cash</MenuItem>
//                     <MenuItem value="Cheque"> Cheque</MenuItem>
//                     <MenuItem value="Transfer">Transfer</MenuItem>
//                     {/* Add more classes as needed */}
//                   </Select>
//                   <FormControlLabel
//                     control={<Checkbox />}
//                     label="I have read and agreed to the terms of service."
//                   />
//                 </Grid>
//               </Grid>

//               <Button color="primary" variant="contained" type="submit">
//                 <Icon>send</Icon>
//                 <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
//               </Button>
//             </ValidatorForm>
//           </SimpleCard>
//         </Stack>
//       </Container>
//     </div>
//   );
// };

// export default StuReceipt;

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
import { Breadcrumb, SimpleCard } from "app/components";
import { useReceipt } from "./receiptContext"; // Import your context hook
import useFetch from "hooks/useFetch";

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
  const apiUrl = process.env.REACT_APP_API_URL;

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
    balance: 0,
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
        balance: 0,
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
              <Grid item xs={6}>
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
              </Grid>
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
              <TextField
                fullWidth
                size="small"
                type="date"
                label=" Date"
                variant="outlined"
                sx={{ mb: 3 }}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <TextField
                sx={{ mb: 4 }}
                type="number"
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
                type="number"
                name="balance"
                label="Amount Paid"
                value={formData.balance}
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

              <Button
                color="primary"
                variant="contained"
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
