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

// import { useNavigate } from "react-router-dom";

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

// const Curriculum = () => {
//   const { currentSession } = useContext(SessionContext);
//   const {
//     data: classData,
//     loading: classLoading,
//     error: classError,
//   } = useFetch(`/class/${currentSession._id}`);
//   const [subjectData, setSubjectData] = useState([]); // Initialize subject data as an empty array

//   const [title, setTitle] = useState("");
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");

//   const [fromTime, setFromTime] = useState(null);
//   const [toTime, setToTime] = useState(null);
//   const [suggestions, setSuggestions] = useState([]); // New state for suggestions
//   const [previewContent, setPreviewContent] = useState(""); // New state for preview content

//   // New state variables for topic, difficulty, and number of questions
//   const [topic, setTopic] = useState("");
//   const [difficulty, setDifficulty] = useState("");
//   const [numberOfQuestions, setNumberOfQuestions] = useState(0);

//   const [percent, setPercent] = useState(0); // Add state for percent
//   const [instruction, setInstruction] = useState(""); // Add state for instruction
//   // ...
//   const apiUrl = process.env.REACT_APP_API_URL;

//   const navigate = useNavigate();

//   const handleSubmit = (event, preview = false) => {
//     event.preventDefault();

//     const token = localStorage.getItem("jwtToken");

//     if (!token) {
//       console.error("Token is missing or expired");
//       return;
//     }

//     const examData = {
//       title,
//       className: selectedClass,
//       subject: selectedSubject,

//       session: currentSession._id,
//       topic,
//       difficulty,
//       numberOfQuestions,
//       preview,
//     };

//     fetch(`${apiUrl}/api/generate-curriculum`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
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
//         if (preview) {
//           setPreviewContent(data.questions.join("\n")); // Update preview content with generated questions
//         } else {
//           navigate("/dashboard/manage-online-exam");
//         }
//       })
//       .catch((error) => {
//         console.error("Error generating exam questions:", error);
//       });
//   };

//   // Call handleSubmit with preview set to true to preview
//   const handlePreview = (event) => handleSubmit(event, true);

//   // Call handleSubmit with preview set to false to save
//   const handleSave = (event) => handleSubmit(event, false);

//   // useEffect(() => {
//   //   if (selectedClass) {
//   //     // Fetch the authentication token from wherever you've stored it (e.g., local storage)
//   //     const token = localStorage.getItem("jwtToken");

//   //     // Include the token in the request headers
//   //     const headers = new Headers();
//   //     headers.append("Authorization", `Bearer ${token}`);

//   //     // Make an API call to fetch subjects for the selected class with the authorization token
//   //     fetch(`${apiUrl}/api/get-subject/${selectedClass}`, {
//   //       headers,
//   //     })
//   //       .then((response) => response.json())
//   //       .then((data) => {
//   //         setSubjectData(data);
//   //       })
//   //       .catch((error) => {
//   //         console.error("Error fetching subjects:", error);
//   //       });
//   //   } else {
//   //     // Clear the subjects if no class is selected
//   //     setSubjectData([]);
//   //   }
//   // }, [selectedClass]);
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

//   // const handleClassChange = (event) => {
//   //   setSelectedClass(event.target.value);
//   // };
//   // const handleSubjectChange = (event) => {
//   //   setSelectedSubject(event.target.value);
//   // };

//   const handleClassChange = (event) => {
//     const newSelectedClass = event.target.value;
//     setSelectedClass(newSelectedClass);

//     // Clear the selected subject when the class changes
//     setSelectedSubject("");
//   };

//   const handleSubjectChange = (event) => {
//     setSelectedSubject(event.target.value);
//   };

//   const handleFromTimeChange = (newTime) => {
//     setFromTime(newTime);
//   };

//   const handleToTimeChange = (newTime) => {
//     setToTime(newTime);
//   };
//   // Handle topic input change and update suggestions
//   const handleTopicChange = (event) => {
//     const value = event.target.value;
//     setTopic(value);

//     // Replace this with your logic to fetch or filter suggestions
//     const allTopics = ["Math", "Science", "History", "Geography"]; // Example topics
//     const filteredSuggestions = allTopics.filter((t) =>
//       t.toLowerCase().includes(value.toLowerCase())
//     );
//     setSuggestions(filteredSuggestions);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setTopic(suggestion);
//     setSuggestions([]); // Clear suggestions after selection
//   };

//   return (
//     <div>
//       <Container>
//         <Box className="breadcrumb">
//           <Breadcrumb
//             routeSegments={[
//               // { name: "Material", path: "/material" },
//               { name: "Questions Generator" },
//             ]}
//           />
//         </Box>

//         <Stack spacing={3}>
//           <SimpleCard title="">
//             <ValidatorForm onError={() => null}>
//               <Grid container spacing={6}>
//                 <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
//                   {/*} <TextField
//                     type="text"
//                     name="title"
//                     value={title}
//                     label="Exam title"
//                     placeholder="Exam title"
//                     onChange={(e) => setTitle(e.target.value)}
//                   />*/}

//                   {/*} <TextField select label="Select a Section" variant="outlined">
//                     <MenuItem value="Class A"> A</MenuItem>
//                     <MenuItem value="Class B"> B</MenuItem>
//                     <MenuItem value="Class C"> C</MenuItem>

//           </TextField>*/}

//                   <TextField
//                     select
//                     label="Select a class"
//                     variant="outlined"
//                     value={selectedClass} // Bind the selected value
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
//                 </Grid>

//                 <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
//                   {/*}  <label>Exam Date</label>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     type="date"
//                     label="Exam Date"
//                     variant="outlined"
//                     sx={{ mb: 3 }}
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)} // Update the selectedDate when the user selects a date
//                   />*/}
//                   <TextField
//                     label="Enter Topic"
//                     variant="outlined"
//                     value={topic}
//                     onChange={handleTopicChange} // Handle topic input
//                   />
//                   {suggestions.length > 0 && (
//                     <ul>
//                       {suggestions.map((suggestion, index) => (
//                         <li
//                           key={index}
//                           onClick={() => handleSuggestionClick(suggestion)}
//                         >
//                           {suggestion}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                   {/*}  <TextField
//                     select
//                     label="Select Difficulty"
//                     variant="outlined"
//                     value={difficulty}
//                     onChange={(e) => setDifficulty(e.target.value)}
//                   >
//                     <MenuItem value="easy">Easy</MenuItem>
//                     <MenuItem value="medium">Medium</MenuItem>
//                     <MenuItem value="hard">Hard</MenuItem>
//                   </TextField>
//                   <TextField
//                     type="number"
//                     label="Number of Questions"
//                     variant="outlined"
//                     value={numberOfQuestions}
//                     onChange={(e) => setNumberOfQuestions(e.target.value)}
//                   />
//                <LocalizationProvider dateAdapter={AdapterDateFns}>
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
//                   </LocalizationProvider>*/}

//                   {/*}  <LocalizationProvider dateAdapter={AdapterDateFns}>
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
//                   </LocalizationProvider>*/}
//                   {/*} <TextField
//                     type="text"
//                     id="standard-basic"
//                     value={percent}
//                     errorMessages={[
//                       "This field is required",
//                       "Minimum length is 4",
//                       "Maximum length is 9",
//                     ]}
//                     label="Minimum percentage for passing(%)"
//                     placeholder="Minimum percentage for passing(%)"
//                     onChange={(e) => setPercent(e.target.value)}
//                   />

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
//                   />*/}
//                 </Grid>
//               </Grid>

//               <Button onClick={handlePreview}>Preview</Button>
//               <Button onClick={handleSave}>Save</Button>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={8}
//                 variant="outlined"
//                 label="Question Preview"
//                 value={previewContent} // Display the preview content
//                 InputProps={{ readOnly: true }} // Make it read-only
//               />
//             </ValidatorForm>
//           </SimpleCard>
//         </Stack>
//       </Container>
//     </div>
//   );
// };

// export default Curriculum;import { MenuItem, Select, Stack } from "@mui/material";import { MenuItem, Select, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Breadcrumb } from "../../../../app/components";
import {
  Button,
  Grid,
  styled,
  Typography,
  TextField as MuiTextField,
  Stack,
  MenuItem,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
import useFetch from "../../../../hooks/useFetch";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const TextField = styled(MuiTextField)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const PreviewBox = styled(Box)(() => ({
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "16px",
  marginTop: "16px",
  backgroundColor: "#f9f9f9",
  color: "black",
  minHeight: "200px",
  whiteSpace: "pre-wrap", // Preserve line breaks
  overflowY: "auto", // Add scroll if content exceeds box size
}));

const Curriculum = () => {
  const { currentSession } = useContext(SessionContext);
  const {
    data: classData,
    loading: classLoading,
    error: classError,
  } = useFetch(`/class/${currentSession._id}`);

  const [subjectData, setSubjectData] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedClass) {
      fetch(`${apiUrl}/api/get-subject/${selectedClass}/${currentSession._id}`)
        .then((res) => res.json())
        .then((data) => setSubjectData(data))
        .catch((err) => console.error("Error fetching subjects:", err));
    } else {
      setSubjectData([]);
    }
  }, [selectedClass, currentSession]);

  const handleSubmit = (event, preview = false) => {
    event.preventDefault();

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("Token is missing or expired");
      return;
    }

    const lessonNoteData = {
      topic,
      className: selectedClass,
      subject: selectedSubject,
      session: currentSession._id,
      preview,
    };

    fetch(`${apiUrl}/api/generate-lesson-note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(lessonNoteData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Generated content:", data.lessonNoteContent); // Log the generated content

        if (preview) {
          setPreviewContent(data.lessonNoteContent || "No content generated");
          setPreviewMode(true);
        } else {
          alert("Lesson note saved successfully!");
          navigate("/dashboard/lesson-notes");
        }
      })
      .catch((err) => console.error("Error generating lesson note:", err));
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Curriculum Generator" }]} />
      </Box>

      <Stack spacing={3}>
        <Box>
          <form onSubmit={(e) => handleSubmit(e, false)}>
            <Grid container spacing={4}>
              {/* Class Dropdown */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Select Class"
                  fullWidth
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  {classData?.map((item) => (
                    <MenuItem key={item._id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Subject Dropdown */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Select Subject"
                  fullWidth
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  {subjectData.map((item) => (
                    <MenuItem key={item._id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Topic Input */}
              <Grid item xs={12}>
                <TextField
                  label="Enter Topic"
                  fullWidth
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handleSubmit(e, true)}
              >
                Preview
              </Button>
              <Button variant="contained" color="secondary" type="submit">
                Save
              </Button>
            </Stack>
          </form>
        </Box>

        {/* Preview Content */}
        {previewMode && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              Preview
            </Typography>
            <PreviewBox>{previewContent}</PreviewBox>
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default Curriculum;
