// import { MenuItem, Select, Stack } from "@mui/material";
// import { Box } from "@mui/system";
// import { Breadcrumb, SimpleCard } from "../../../../app/components";
// import { format } from "date-fns";

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
// import { DateAdapter, LocalizationProvider } from "@mui/x-date-pickers";
// import { useNavigate } from "react-router-dom";

// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// import DateFnsUtils from "@mui/x-date-pickers/AdapterDateFns";
// import { TimePicker } from "@mui/x-date-pickers";
// import { Span } from "../../../../app/components/Typography";
// import { useContext, useEffect, useState } from "react";
// import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
// import useFetch from "../../../../hooks/useFetch";
// import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
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

// const CreateJamb = () => {
//   const className = "JAMB"; // Specify the class name here
//   const { data, loading, fetchedData, error, reFetch } = useFetch(
//     currentSession ? `/get-subject/${className}/${currentSession._id}` : null
//   );
//   const { currentSession } = useContext(SessionContext);
//   const {
//     data: classData,
//     loading: classLoading,
//     error: classError,
//   } = useFetch(`/class/${currentSession._id}`);
//   const [subjectData, setSubjectData] = useState([]); // Initialize subject data as an empty array
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [selectedDate, setSelectedDate] = useState(""); // Initialize selectedDate state

//   const [title, setTitle] = useState(""); // Add state for title
//   const [percent, setPercent] = useState(0); // Add state for percent
//   const [instruction, setInstruction] = useState(""); // Add state for instruction
//   // ...
//   const apiUrl = process.env.REACT_APP_API_URL;

//   const currentDate = new Date();
//   const formattedDate = currentDate.toJSON().slice(0, 10); // Format the date (yyyy-MM-dd)

//   const navigate = useNavigate();

//   const [state, setState] = useState({ date: new Date() });
//   const formatTime = (time) => {
//     const options = { hour: "2-digit", minute: "2-digit", hour12: true };
//     return new Date(time).toLocaleTimeString([], options);
//   };

//   useEffect(() => {
//     ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
//       if (value !== state.password) return false;

//       return true;
//     });
//     return () => ValidatorForm.removeValidationRule("isPasswordMatch");
//   }, [state.password]);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Convert selectedDate to a Date object
//     const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

//     const token = localStorage.getItem("jwtToken");

//     if (!token) {
//       console.error("Token is missing or expired");
//       // Redirect to login or show an error message
//       return;
//     }

//     // Ensure sessionId is correctly fetched from context or state
//     const sessionId = currentSession?._id;
//     if (!sessionId) {
//       console.error("Session ID is missing");
//       return;
//     }

//     // Format fromTime and toTime
//     const formattedFromTime = formatTime(fromTime);
//     const formattedToTime = formatTime(toTime);

//     // Construct exam data object
//     const examData = {
//       subject: selectedSubject,
//       year: selectedYear,
//       date: formattedDate,
//       fromTime: formattedFromTime,
//       toTime: formattedToTime,

//       instruction: instruction,
//       sessionId: sessionId,
//     };

//     // Send POST request to backend
//     fetch(`${apiUrl}/api/create-jamb-exam`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
//       },
//       body: JSON.stringify(examData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // Handle success, e.g., navigate to another page
//         navigate("/dashboard/jamb-past-question");
//       })
//       .catch((error) => {
//         console.error("Error creating exam:", error);
//         // Handle the error, e.g., show an error message
//       });
//   };

//   useEffect(() => {
//     // Fetch class data here if needed
//   }, []);

//   useEffect(() => {
//     if (selectedClass && currentSession) {
//       const token = localStorage.getItem("jwtToken");

//       const headers = new Headers();
//       headers.append("Authorization", `Bearer ${token}`);

//       // Fetch subjects for the selected class and session
//       fetch(
//         `${apiUrl}/api/get-subject/${selectedClass}/${currentSession._id}`, // Include sessionId here
//         { headers }
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           setSubjectData(data);
//         })
//         .catch((error) => {
//           console.error("Error fetching subjects:", error);
//         });
//     } else {
//       setSubjectData([]);
//     }
//   }, [selectedClass, currentSession]); // Re-fetch when class or session changes

//   const handleClassChange = (event) => {
//     const newSelectedClass = event.target.value;
//     setSelectedClass(newSelectedClass);

//     // Clear the selected subject when the class changes
//     setSelectedSubject("");
//   };

//   const handleSubjectChange = (event) => {
//     setSelectedSubject(event.target.value);
//   };

//   const [fromTime, setFromTime] = useState(null);
//   const [toTime, setToTime] = useState(null);

//   const handleFromTimeChange = (newTime) => {
//     setFromTime(newTime);
//   };

//   const handleToTimeChange = (newTime) => {
//     setToTime(newTime);
//   };

//   return (
//     <div>
//       <Container>
//         <Box className="breadcrumb">
//           <Breadcrumb
//             routeSegments={[
//               // { name: "Material", path: "/material" },
//               { name: "Add Exam" },
//             ]}
//           />
//         </Box>

//         <Stack spacing={3}>
//           <SimpleCard title="Add Exam">
//             <ValidatorForm onError={() => null}>
//               <Grid container spacing={6}>
//                 <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
//                   {/*} <TextField select label="Select a Section" variant="outlined">
//                     <MenuItem value="Class A"> A</MenuItem>
//                     <MenuItem value="Class B"> B</MenuItem>
//                     <MenuItem value="Class C"> C</MenuItem>

//           </TextField>*/}

//                   <TextField
//                     select
//                     label="Select the subject"
//                     variant="outlined"
//                     value={selectedSubject}
//                     onChange={handleSubjectChange}
//                   >
//                     {Array.isArray(subjectData) &&
//                       subjectData.map((item) => (
//                         <MenuItem key={item.id} value={item.name}>
//                           {item.name}
//                         </MenuItem>
//                       ))}
//                   </TextField>
//                   <TextField
//                     select
//                     label="Select Exam Year"
//                     variant="outlined"
//                     value={selectedYear} // Bind the selected value
//                     onChange={handleYearChange} // Handle the change
//                   >
//                     {yearData &&
//                       yearData.map((item) => (
//                         <MenuItem key={item.id} value={item.name}>
//                           {item.name}
//                         </MenuItem>
//                       ))}
//                   </TextField>
//                 </Grid>

//                 <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
//                   <label>Exam Date</label>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     type="date"
//                     label="Exam Date"
//                     variant="outlined"
//                     sx={{ mb: 3 }}
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)} // Update the selectedDate when the user selects a date
//                   />

//                   <LocalizationProvider dateAdapter={AdapterDateFns}>
//                     <TimePicker
//                       label="From"
//                       value={fromTime}
//                       onChange={handleFromTimeChange}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label="Exam Time (From)"
//                           placeholder="hh:mm AM/PM"
//                         />
//                       )}
//                     />
//                   </LocalizationProvider>

//                   <LocalizationProvider dateAdapter={AdapterDateFns}>
//                     <TimePicker
//                       label="To"
//                       value={toTime}
//                       onChange={handleToTimeChange}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label="Exam Time (To)"
//                           placeholder="hh:mm AM/PM"
//                         />
//                       )}
//                     />
//                   </LocalizationProvider>

//                   <TextField
//                     type="text"
//                     multiline // Enable multiline mode
//                     rows={4}
//                     value={instruction}
//                     id="standard-basic"
//                     errorMessages={["this field is required"]}
//                     onChange={(e) => setInstruction(e.target.value)}
//                     label=""
//                     placeholder="Instruction"
//                   />
//                 </Grid>
//               </Grid>

//               <Button
//                 color="primary"
//                 variant="contained"
//                 type="submit"
//                 onClick={handleSubmit}
//               >
//                 <Span sx={{ pl: 1, textTransform: "capitalize" }}>
//                   Add Exam
//                 </Span>
//               </Button>
//             </ValidatorForm>
//           </SimpleCard>
//         </Stack>
//       </Container>
//     </div>
//   );
// };

// export default CreateJamb;

import { MenuItem, Select, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Breadcrumb, SimpleCard } from "../../../../app/components";
import { format } from "date-fns";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { DateAdapter, LocalizationProvider } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import DateFnsUtils from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers";
import { Span } from "../../../../app/components/Typography";
import { useContext, useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import useFetch from "../../../../hooks/useFetch";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
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

const CreateJamb = () => {
  const className = "JAMB"; // Default class name
  const { currentSession } = useContext(SessionContext);
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  // State variables
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [instruction, setInstruction] = useState("");

  // Fetch subjects for JAMB class
  // const {
  //   data: subjectData,
  //   loading,
  //   error,
  // } = useFetch(
  //   currentSession
  //     ? `${apiUrl}/api/get-subject/${className}/${currentSession._id}`
  //     : null
  // );
  const {
    data: subjectData,
    loading,
    error,
  } = useFetch(
    currentSession ? `/get-subject/${className}/${currentSession._id}` : null
  );

  useEffect(() => {
    console.log("Fetched subject data:", subjectData);
  }, [subjectData]);

  const { data: yearData } = useFetch(`${apiUrl}/api/get-exam-years`);

  const formatTime = (time) => {
    if (!time) return "";
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return new Date(time).toLocaleTimeString([], options);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("Token is missing or expired");
      return;
    }

    if (!currentSession?._id) {
      console.error("Session ID is missing");
      return;
    }

    // Prepare exam data
    const examData = {
      subject: selectedSubject,
      year: selectedYear,
      date: new Date(selectedDate).toISOString().split("T")[0],
      fromTime: formatTime(fromTime),
      toTime: formatTime(toTime),
      instruction,
      sessionId: currentSession._id,
    };

    // API call to create JAMB exam
    fetch(`${apiUrl}/api/create-jamb-exam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(examData),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(() => navigate("/dashboard/jamb-past-question"))
      .catch((error) => console.error("Error creating exam:", error));
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Add Exam" }]} />
      </Box>

      <Stack spacing={3}>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              {/* Subject Selection */}
              <TextField
                select
                label="Select Subject"
                variant="outlined"
                fullWidth
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {Array.isArray(subjectData) &&
                  subjectData.map((item) => (
                    <MenuItem key={item._id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </TextField>

              {/* Year Selection */}
              {/*} <TextField
                select
                label="Select Exam Year"
                variant="outlined"
                fullWidth
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {yearData &&
                  yearData.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </TextField>*/}
              <TextField
                select
                label="Select Exam Year"
                variant="outlined"
                fullWidth
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {[1999, 2021, 2022, 2023, 2024].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              {/* Exam Date */}
              <TextField
                fullWidth
                type="date"
                label="Exam Date"
                variant="outlined"
                sx={{ mb: 3 }}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              {/* From Time Picker */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="From"
                  value={fromTime}
                  onChange={(newTime) => setFromTime(newTime)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>

              {/* To Time Picker */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="To"
                  value={toTime}
                  onChange={(newTime) => setToTime(newTime)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>

              {/* Instruction Field */}
              <TextField
                fullWidth
                multiline
                rows={4}
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                label="Instruction"
                placeholder="Enter instructions for the exam"
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Button color="primary" variant="contained" type="submit">
            Add Exam
          </Button>
        </ValidatorForm>
      </Stack>
    </Container>
  );
};

export default CreateJamb;
