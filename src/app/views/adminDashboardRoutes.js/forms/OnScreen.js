// // OnScreen.jsx
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const OnScreen = () => {
//   const { id } = useParams();
//   const [examData, setExamData] = useState(null);
//   const apiUrl = process.env.REACT_APP_API_URL.trim();
//   // useEffect(() => {
//   //   const fetchExamData = async () => {
//   //     try {
//   //       const response = await axios.get(`${apiUrl}/api/get-exam/${id}`);
//   //       setExamData(response.data);
//   //     } catch (error) {
//   //       console.error("Error fetching exam data:", error);
//   //     }
//   //   };

//   //   fetchExamData();
//   // }, [id]);

//   const { examId, studentId } = useParams();

//   useEffect(() => {
//     const fetchExamData = async () => {
//       try {
//         const response = await axios.get(
//           `${apiUrl}/api/get-exam/${examId}/student/${studentId}`
//         );

//         setExamData(response.data);
//       } catch (error) {
//         console.error("Error fetching exam data:", error);
//       }
//     };

//     fetchExamData();
//   }, [examId, studentId]);

//   //  const fetchExamAndQuestions = async () => {
//   //   try {
//   //     const examResponse = await axios.get(`${apiUrl}/api/get-exam/${id}`);
//   //     setExam(examResponse.data);
//   //     // Set the exam object before calling startTimer
//   //     console.log("Exam details:", examResponse.data);

//   //     const token = localStorage.getItem("jwtToken");
//   //     const headers = {
//   //       Authorization: `Bearer ${token}`,
//   //     };

//   //     const questionsResponse = await axios.get(
//   //       `${apiUrl}/api/questions/${id}`,
//   //       { headers }
//   //     );
//   //     const questionsData = questionsResponse.data;
//   //     console.log("Fetched questions:", questionsData);

//   //     const correctAnswersData = {};

//   //     questionsData.forEach((question) => {
//   //       if (question.questionType === "true_false") {
//   //         correctAnswersData[question._id] =
//   //           question.correctAnswer.toLowerCase(); // Convert to lowercase
//   //       } else if (question.questionType === "theory") {
//   //         // Handle theory questions
//   //         // For theory questions, correctAnswer might not be available
//   //         // You can set it to an empty string or handle it differently based on your requirements
//   //         correctAnswersData[question._id] = "";
//   //       } else {
//   //         correctAnswersData[question._id] =
//   //           question.options
//   //             .find((option) => option.isCorrect)
//   //             ?.option.toLowerCase() || "";
//   //       }
//   //     });
//   //     console.log("Correct Answers Data:", correctAnswersData);
//   //     setCorrectAnswers(correctAnswersData);

//   //     setQuestions(questionsData);

//   //     const calculatedTotalMark = questionsData.reduce(
//   //       (total, question) => total + parseInt(question.mark),
//   //       0
//   //     );
//   //     setTotalMark(calculatedTotalMark);
//   //     startTimer();
//   //   } catch (error) {
//   //     console.error("Error fetching exam or questions:", error);
//   //   }
//   // };

//   if (!examData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>{examData.title}</h2>
//       <h3>Student Answers:</h3>
//       {examData.submittedAnswers.map((answer, index) => (
//         <div key={index}>
//           <p>Answer: {answer.answers}</p>
//           {/* Add your marking tools here */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OnScreen;

// import { DatePicker } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import { Stack } from "@mui/material";
// import { Box } from "@mui/system";
// import { Breadcrumb, SimpleCard } from "app/components";
// import axios from "axios";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import {
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Grid,
//   Icon,
//   Radio,
//   MenuItem,
//   DialogTitle,
//   RadioGroup,
//   styled,
// } from "@mui/material";
// import useFetch from "hooks/useFetch";
// import { Span } from "app/components/Typography";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./form.css";
// import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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

// const OnScreen = () => {
//   const {
//     data: classData,
//     loading: classLoading,
//     error: classError,
//   } = useFetch("/class");
//   const { data: examData } = useFetch("/getofflineexam");
//   const [subjectData, setSubjectData] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [selectedExam, setSelectedExam] = useState("");
//   const [selectedName, setSelectedName] = useState("");
//   const [selectedStudent, setSelectedStudent] = useState("");
//   const [studentData, setStudentData] = useState([]);
//   const [theoryAnswer, setTheoryAnswer] = useState(null);
//   console.log("Current studentData state:", studentData);
//   const [selectedStudentId, setSelectedStudentId] = useState("");

//   const [subjectIdLookup, setSubjectIdLookup] = useState({});
//   const [showMarkManagement, setShowMarkManagement] = useState(false);
//   const apiUrl = process.env.REACT_APP_API_URL.trim();

//   const fetchStudentData = async (examId, subjectId) => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const headers = new Headers();
//       headers.append("Authorization", `Bearer ${token}`);

//       const response = await fetch(
//         `${apiUrl}/api/get-all-scores/${examId}/${subjectId}`,
//         {
//           headers,
//         }
//       );

//       if (!response.ok) {
//         console.error(
//           "Failed to fetch student data. Response details:",
//           response
//         );
//         throw new Error("Failed to fetch student data");
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching student data:", error);
//       return { scores: [] }; // Return empty array if there's an error
//     }
//   };

//   // const handleStudentChange = (event) => {
//   //   const selectedStudent = event.target.value;
//   //   setSelectedName(selectedStudent);
//   // };
//   const handleStudentChange = (event) => {
//     const selectedStudentName = event.target.value;
//     setSelectedName(selectedStudentName);

//     // Find the corresponding student object and set the selected student's ID
//     const selectedStudent = studentData.find(
//       (student) => student.studentName === selectedStudentName
//     );
//     if (selectedStudent) {
//       setSelectedStudentId(selectedStudent.id); // Ensure this line sets the correct student ID
//       console.log("Selected Student ID:", selectedStudent.id); // Add this line for debugging
//       setSelectedStudent(selectedStudent); // Optionally update to set the entire selected student object
//     }
//   };

//   // const handleManageMarkClick = async () => {
//   //   try {
//   //     if (!selectedExam || !selectedName || !selectedSubject) {
//   //       throw new Error("Please select an exam, student, and subject");
//   //     }

//   //     const token = localStorage.getItem("jwtToken");
//   //     const headers = new Headers();
//   //     headers.append("Authorization", `Bearer ${token}`);

//   //     // Fetch exam data for the selected student
//   //     const response = await fetch(
//   //       `${apiUrl}/api/get-theory-answer/:className${className}/:student${studentId}/subject/:{subject}`,

//   //       { headers }
//   //     );

//   //     if (!response.ok) {
//   //       throw new Error("Failed to fetch exam data");
//   //     }

//   //     const exam = await response.json();

//   //     // Update state with the fetched exam data
//   //     setStudentData(exam.studentAnswer);
//   //     setShowMarkManagement(true);
//   //   } catch (error) {
//   //     console.error("Error fetching exam data:", error);
//   //     // Handle error
//   //   }
//   // };
//   const handleManageMarkClick = async () => {
//     try {
//       // Check if all required fields are selected
//       if (!selectedClass || !selectedSubject || !selectedStudentId) {
//         throw new Error("Please select class, subject, and student");
//       }
//       console.log("Selected Class:", selectedClass);
//       console.log("Selected Subject:", selectedSubject);
//       console.log("Selected Student ID:", selectedStudentId);

//       // Fetch theory answer from the backend
//       const response = await fetch(
//         `${apiUrl}/api/get-theory-answer/className/${selectedClass}/${selectedStudentId}/${subjectIdLookup[selectedSubject]}`
//       );
//       console.log("Subject ID Lookup:", subjectIdLookup[selectedSubject]);

//       if (!response.ok) {
//         throw new Error("Failed to fetch theory answer");
//       }

//       const data = await response.json();
//       setTheoryAnswer(data.theoryAnswer);
//     } catch (error) {
//       console.error("Error fetching theory answer:", error);
//       // Handle error
//     }
//   };

//   useEffect(() => {
//     const fetchSubjectData = async () => {
//       try {
//         if (!selectedClass) {
//           setSubjectData([]);
//           setSubjectIdLookup({});
//           return;
//         }

//         const token = localStorage.getItem("jwtToken");
//         const headers = new Headers();
//         headers.append("Authorization", `Bearer ${token}`);

//         const response = await fetch(
//           `${apiUrl}/api/get-subject/${selectedClass}`,
//           {
//             headers,
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch subjects");
//         }

//         const data = await response.json();

//         setSubjectData(data);

//         // Create a subjectId lookup
//         const lookup = {};
//         data.forEach((subject) => {
//           lookup[subject.name] = subject._id;
//         });
//         setSubjectIdLookup(lookup);
//       } catch (error) {
//         console.error("Error fetching subjects:", error);
//       }
//     };

//     // Call the fetchSubjectData function
//     fetchSubjectData();
//   }, [selectedClass]);
//   // Include all dependencies used inside the useEffect

//   // const handleClassChange = (event) => {
//   //   const newSelectedClass = event.target.value;
//   //   setSelectedClass(newSelectedClass);
//   //   setSelectedSubject("");
//   // };
//   const handleClassChange = (event) => {
//     const newSelectedClass = event.target.value;
//     setSelectedClass(newSelectedClass);
//     setSelectedSubject("");
//     setSelectedExam("");
//   };

//   useEffect(() => {
//     if (selectedClass) {
//       const token = localStorage.getItem("jwtToken");
//       const headers = new Headers();
//       headers.append("Authorization", `Bearer ${token}`);

//       fetch(`${apiUrl}/api/student/${selectedClass}`, {
//         headers,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setStudentData(data);
//         })
//         .catch((error) => {
//           console.error("Error fetching subjects:", error);
//         });
//     } else {
//       setStudentData([]);
//     }
//   }, [selectedClass, selectedStudentId]); // Ensure selectedStudentId is included in the dependency array

//   const handleExamChange = (event) => {
//     const selectedExamId = event.target.value;
//     setSelectedExam(selectedExamId);
//   };

//   const getExamNameById = (examId) => {
//     const selectedExam = examData.find((item) => item._id === examId);
//     return selectedExam ? selectedExam.name : "";
//   };

//   const getSubjectById = (subjectId) => {
//     const selectedSubject = subjectData.find((item) => item._id === subjectId);
//     return selectedSubject ? selectedSubject.name : "";
//   };

//   const handleSubjectChange = (event) => {
//     setSelectedSubject(event.target.value);
//   };

//   const handleSaveChanges = async () => {
//     try {
//       const marks = studentData.map((student) => {
//         const { studentId, testscore = 0, examscore = 0 } = student;
//         const marksObtained = testscore + examscore;

//         return {
//           studentId,
//           subjectId: subjectIdLookup[selectedSubject],
//           testscore,
//           examscore,
//           marksObtained,
//         };
//       });

//       console.log("Updated Marks:", marks);

//       const token = localStorage.getItem("jwtToken");
//       const headers = new Headers();
//       headers.append("Authorization", `Bearer ${token}`);

//       // Check if there are existing marks by verifying the examId and subjectId
//       if (selectedExam && subjectIdLookup[selectedSubject]) {
//         const responseCheckMarks = await fetch(
//           `${apiUrl}/api/get-all-scores/${selectedExam}/${subjectIdLookup[selectedSubject]}`,
//           {
//             headers,
//           }
//         );

//         console.log("Response from Check Marks:", responseCheckMarks);

//         if (responseCheckMarks.ok) {
//           const responseData = await responseCheckMarks.json();
//           const existingMarks = responseData.scores || [];

//           // Check if there are existing marks
//           if (existingMarks.length > 0) {
//             // Existing marks found, proceed with updating
//             const responseUpdateMarks = await fetch(
//               `${apiUrl}/api/update-all-marks`,
//               {
//                 method: "PUT",
//                 headers: {
//                   ...headers,
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   examId: selectedExam,
//                   subjectId: subjectIdLookup[selectedSubject],
//                   updates: marks,
//                 }),
//               }
//             );

//             console.log("Request Payload:", {
//               examId: selectedExam,
//               subjectId: subjectIdLookup[selectedSubject],
//               updates: marks,
//             });

//             console.log("Response from Update Marks:", responseUpdateMarks);

//             if (!responseUpdateMarks.ok) {
//               const errorMessage = await responseUpdateMarks.text();
//               console.error(
//                 `Failed to update marks. Server response: ${errorMessage}`
//               );
//               throw new Error("Failed to update marks");
//             } else {
//               // Notify success using toast
//               toast.success("Marks updated successfully!");
//             }
//           } else {
//             // No existing marks found, proceed to create new marks
//             const responseSaveMarks = await fetch(`${apiUrl}/api/save-marks`, {
//               method: "POST",
//               headers: {
//                 ...headers,
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 examId: selectedExam,
//                 subjectId: subjectIdLookup[selectedSubject],
//                 updates: marks,
//               }),
//             });

//             console.log("Response from Save Marks:", responseSaveMarks);

//             if (!responseSaveMarks.ok) {
//               const errorMessage = await responseSaveMarks.text();

//               console.error(
//                 `Failed to save marks. Server response: ${errorMessage}`
//               );
//               throw new Error("Failed to save marks");
//             } else {
//               // Notify success using toast
//               toast.success("Marks saved successfully!");
//             }
//           }
//         } else {
//           // Handle other response statuses
//           // ...
//         }
//       }
//       // ... (remaining code)
//     } catch (error) {
//       console.error("Error saving marks:", error);
//       // ... (error handling)
//     }
//   };

//   const handleScoreChange = (index, scoreType, value) => {
//     // Assuming studentData is an array
//     const updatedStudents = [...studentData];

//     // Update the corresponding score
//     if (scoreType === "testscore") {
//       updatedStudents[index].testscore = parseInt(value, 10) || 0;
//     } else if (scoreType === "examscore") {
//       updatedStudents[index].examscore = parseInt(value, 10) || 0;
//     }

//     // Update marksObtained by adding test score and exam score
//     updatedStudents[index].marksObtained =
//       (updatedStudents[index].testscore || 0) +
//       (updatedStudents[index].examscore || 0);

//     // Update state with the modified students
//     setStudentData(updatedStudents);
//   };

//   return (
//     <div>
//       <Container>
//         <ValidatorForm onError={() => null}>
//           <Box className="breadcrumb">
//             <Breadcrumb routeSegments={[{ name: "Manage Exam Mark" }]} />
//           </Box>
//           <Grid container spacing={6}>
//             <Grid item xs={4}>
//               <TextField
//                 select
//                 label="Select a class"
//                 variant="outlined"
//                 value={selectedClass}
//                 onChange={handleClassChange}
//               >
//                 {classData &&
//                   classData.map((item) => (
//                     <MenuItem key={item.id} value={item.name}>
//                       {item.name}
//                     </MenuItem>
//                   ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={4}>
//               <TextField
//                 select
//                 label="Select the Student"
//                 variant="outlined"
//                 value={selectedName}
//                 onChange={handleStudentChange}
//               >
//                 {studentData.map((student) => (
//                   <MenuItem key={student.id} value={student.studentName}>
//                     {student.studentName}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             <Grid item xs={4}>
//               <TextField
//                 select
//                 label="Select the subject"
//                 variant="outlined"
//                 value={selectedSubject}
//                 onChange={handleSubjectChange}
//               >
//                 {subjectData &&
//                   subjectData.map((item) => (
//                     <MenuItem key={item.id} value={item.name}>
//                       {item.name}
//                     </MenuItem>
//                   ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={4}>
//               <Button
//                 color="primary"
//                 variant="contained"
//                 type="submit"
//                 onClick={handleManageMarkClick}
//               >
//                 View Answer
//               </Button>
//             </Grid>
//           </Grid>

//           {theoryAnswer && (
//             <div>
//               <h2>Student Theory Answer</h2>
//               {/* Render student answer and any marking tools */}
//               <p>Answer: {theoryAnswer.answers}</p>
//               {/* Add your marking tools or additional information here */}
//             </div>
//           )}
//           <>
//             <div className="col-sm-4">
//               <div className="tile-stats tile-gray">
//                 <div className="icon">
//                   <i className="entypo-chart-bar"></i>
//                 </div>
//                 <h3 style={{ color: "#696969" }}>Awarded Mark Summary</h3>
//                 <h3 style={{ color: "#696969" }}>
//                   Marks For: {getExamNameById(selectedExam)}
//                 </h3>

//                 <h4 style={{ color: "#696969" }}>Class: {selectedClass}</h4>
//                 <h4 style={{ color: "#696969" }}>
//                   Subject: {getSubjectById(subjectIdLookup[selectedSubject])}
//                 </h4>
//               </div>
//             </div>
//             <div class="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
//               <div class="table-responsive full-data">
//                 <table
//                   class="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
//                   id="example-student"
//                 >
//                   <thead>
//                     <tr>
//                       <th>Question Number</th>
//                       <th>A</th>
//                       <th>B</th>
//                       <th>C</th>
//                       <th>D</th>
//                       <th>Total</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>12</td>

//                       {/*}  <td id={`subjectId_${index}`} style={{ display: "none" }}>
// {subjectIdLookup[student.subjectName]}
// </td>*/}
//                       <td>23</td>

//                       <td>32</td>
//                       <td>32</td>
//                       {/* Fix the nesting issue for marksObtained */}
//                       <td>32</td>
//                       {/*} <td>
// <TextField
// name={`comment_${index}`}
// id={`comment_${index}`}
// value={student.comment || ""}
// onChange={(e) =>
//   handleScoreChange(index, "comment", e.target.value)
// }
// />
// </td>*/}
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <Button
//               color="primary"
//               variant="contained"
//               type="button"
//               onClick={handleSaveChanges}
//             >
//               Save Changes
//             </Button>
//           </>
//         </ValidatorForm>
//         <ToastContainer />
//       </Container>
//     </div>
//   );
// };

// export default OnScreen;
import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, TextField, MenuItem, Button } from "@mui/material";
import { ValidatorForm } from "react-material-ui-form-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/system";
import useFetch from "hooks/useFetch";
import {
  Check,
  Close,
  Edit,
  Brush,
  Highlight,
  ArrowForward,
  RadioButtonUnchecked,
  CloseOutlined,
  Clear,
  Create,
  Undo,
  Star,
} from "@material-ui/icons";

const OnScreen = () => {
  // const [classData, setClassData] = useState([]);
  const {
    data: classData,
    loading: classLoading,
    error: classError,
  } = useFetch("/class"); // Assuming useFetch is correctly implemented

  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

  const [subjectData, setSubjectData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [currentTool, setCurrentTool] = useState("");
  const [currentMousePosition, setCurrentMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [correctSymbolPosition, setCorrectSymbolPosition] = useState({
    x: 0,
    y: 0,
  });

  const [correctColor, setCorrectColor] = useState("green");

  const [questionDetails, setQuestionDetails] = useState([]);

  const [theoryAnswer, setTheoryAnswer] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL.trim();
  const handleStudentChange = (event) => {
    const selectedStudent = event.target.value;
    setSelectedName(selectedStudent);
  };

  useEffect(() => {
    if (selectedClass) {
      const token = localStorage.getItem("jwtToken");

      fetch(`${apiUrl}/api/student/${selectedClass}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch student data");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Student Data Received:", data);
          setStudentData(data);
        })
        .catch((error) => console.error("Error fetching student data:", error));

      // Fetch subjects based on the selected class
      fetch(`${apiUrl}/api/get-subject/${selectedClass}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch subject data");
          }
          return response.json();
        })
        .then((data) => setSubjectData(data))
        .catch((error) => console.error("Error fetching subject data:", error));
    } else {
      setStudentData([]);
      setSubjectData([]);
    }
  }, [selectedClass]);

  const handleClassChange = (event) => {
    const newSelectedClass = event.target.value;
    setSelectedClass(newSelectedClass);
    setStudentData([]);
  };

  const handleMarkSelection = (mark) => {
    // Handle mark selection
  };

  // const fetchQuestionTitle = async (questionId) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/${questionId}`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch question details");
  //     }
  //     const data = await response.json();
  //     return data.questionTitle;
  //   } catch (error) {
  //     console.error("Error fetching question details:", error);
  //     return "N/A";
  //   }
  // };
  const [questionData, setQuestionData] = useState([
    { question: "1", originalMark: "10", scoreGiven: "5" },
    { question: "1a", originalMark: "5", scoreGiven: "3" },
    { question: "2", originalMark: "15", scoreGiven: "10" },
    // Add more question data as needed
  ]);

  const totalOriginalScore = questionData.reduce(
    (acc, curr) => acc + parseInt(curr.originalMark),
    0
  );
  const totalScoreGiven = questionData.reduce(
    (acc, curr) => acc + parseInt(curr.scoreGiven),
    0
  );

  const handleScoreChange = (index, value) => {
    const updatedQuestionData = [...questionData];
    updatedQuestionData[index].scoreGiven = value;
    setQuestionData(updatedQuestionData);
  };

  const fetchQuestionTitles = async (questionIds) => {
    try {
      const promises = questionIds.map(async (questionId) => {
        const response = await fetch(`${apiUrl}/api/${questionId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch question details");
        }
        const data = await response.json();
        return { id: questionId, title: data.questionTitle };
      });
      const resolvedTitles = await Promise.all(promises);
      return resolvedTitles;
    } catch (error) {
      console.error("Error fetching question titles:", error);
      return [];
    }
  };

  useEffect(() => {
    if (theoryAnswer) {
      const questionIds = Object.keys(theoryAnswer.answers);
      fetchQuestionTitles(questionIds)
        .then((titles) => {
          setQuestionDetails(titles);
        })
        .catch((error) => {
          console.error("Error fetching question titles:", error);
          setQuestionDetails([]);
        });
    }
  }, [theoryAnswer]);
  const handleManageMarkClick = async () => {
    try {
      if (!selectedClass || !selectedSubject || !selectedName) {
        throw new Error("Please select class, subject, and student");
      }

      // Fetch theory answer from the backend
      const response = await fetch(
        `${apiUrl}/api/get-theory-answer-by-name/className/${selectedClass}/student/${encodeURIComponent(
          selectedName
        )}/subject/${selectedSubject}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch theory answer");
      }

      const data = await response.json();
      setTheoryAnswer(data.theoryAnswer);
    } catch (error) {
      console.error("Error fetching theory answer:", error);
      // Handle error
    }
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCtx(context);
  }, []);
  const handleMarkingToolClick = (tool) => {
    setCurrentTool(tool);
    // Remove event listeners for all tools
    canvasRef.current.removeEventListener("mousedown", handleMouseDown);
    canvasRef.current.removeEventListener("mousemove", handleMouseMove);
    canvasRef.current.removeEventListener("mouseup", handleMouseUp);

    if (tool === "ruler" || tool === "correct") {
      // Attach event listeners for drawing tool
      canvasRef.current.addEventListener("mousedown", handleMouseDown);
      canvasRef.current.addEventListener("mousemove", handleMouseMove);
      canvasRef.current.addEventListener("mouseup", handleMouseUp);
    }
    // if (tool === "correct") {
    //   setCorrectColor("green");
    // } else {
    //   setCorrectColor(""); // Reset color for other tools
    // }
  };

  // const handleMouseDown = (event) => {
  //   const rect = canvasRef.current.getBoundingClientRect();
  //   const x = event.clientX - rect.left;
  //   const y = event.clientY - rect.top;
  //   setIsDrawing(true);
  //   setStartPoint({ x, y });
  //   if (currentTool === "correct") {
  //     const rect = canvasRef.current.getBoundingClientRect();
  //     const x = event.clientX - rect.left;
  //     const y = event.clientY - rect.top;
  //     setCorrectSymbolPosition({ x, y });
  //   }
  // };

  const handleMouseMove = (event) => {
    if (!isDrawing || !ctx) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCurrentMousePosition({ x, y });
    ctx.strokeStyle = "red";

    switch (currentTool) {
      case "ruler":
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        setStartPoint({ x, y });
        break;
      case "correct":
        setCorrectSymbolPosition({ x, y }); // Update the position of the correct symbol
        break;

      // Add cases for other drawing tools if needed

      default:
        break;
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseDown = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (currentTool === "correct") {
      setCorrectSymbolPosition({ x, y });
    } else {
      // Handle ruler/drawing tool
      setIsDrawing(true);
      setStartPoint({ x, y });
    }
  };
  useEffect(() => {
    if (ctx && currentTool === "correct") {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Draw the check icon
      ctx.fillStyle = "green";
      ctx.font = "30px FontAwesome"; // Assuming FontAwesome is used for the check icon
      ctx.fillText("\uf00c", correctSymbolPosition.x, correctSymbolPosition.y);
    }
  }, [ctx, currentTool, correctSymbolPosition]);

  // useEffect(() => {
  //   if (ctx) {
  //     // Clear the canvas before drawing
  //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //     // Draw text
  //     if (theoryAnswer) {
  //       Object.entries(theoryAnswer.answers).forEach(([questionId, answer]) => {
  //         const questionTitle =
  //           questionDetails.find((detail) => detail.id === questionId)?.title ||
  //           "N/A";
  //         ctx.fillStyle = "black";
  //         ctx.font = "12px Arial";
  //         ctx.fillText(`Question Title: ${questionTitle}`, 20, 20);
  //         ctx.fillText(`Answer: ${answer}`, 20, 40);
  //       });
  //     }
  //   }
  // }, [ctx, theoryAnswer, questionDetails]);

  useEffect(() => {
    if (ctx) {
      // Clear the canvas before drawing
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // Draw text
      if (theoryAnswer) {
        Object.entries(theoryAnswer.answers).forEach(([questionId, answer]) => {
          const questionTitle =
            questionDetails.find((detail) => detail.id === questionId)?.title ||
            "N/A";
          ctx.fillStyle = "black";
          ctx.font = "12px Arial";
          ctx.fillText(`Question Title: ${questionTitle}`, 20, 20);
          ctx.fillText(`Answer: ${answer}`, 20, 40);
        });
      }
      // Draw correct symbol
      if (currentTool === "correct") {
        ctx.fillStyle = correctColor;
        ctx.beginPath();
        ctx.arc(
          correctSymbolPosition.x,
          correctSymbolPosition.y,
          5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  }, [ctx, theoryAnswer, questionDetails, correctSymbolPosition, correctColor]);

  return (
    <div>
      <Container>
        <ValidatorForm onError={() => null}>
          <Box className="breadcrumb">{/* Breadcrumb component */}</Box>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                select
                label="Select a class"
                variant="outlined"
                value={selectedClass}
                onChange={handleClassChange}
                fullWidth
              >
                {classData.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Select the Student"
                variant="outlined"
                value={selectedName}
                onChange={handleStudentChange}
                fullWidth
              >
                {studentData.map((student) => (
                  <MenuItem key={student.id} value={student.studentName}>
                    {student.studentName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Select the subject"
                variant="outlined"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                fullWidth
              >
                {subjectData.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={handleManageMarkClick}
              >
                View Answer
              </Button>
            </Grid>
          </Grid>

          <div style={{ display: "flex", height: "100%", marginTop: "50px" }}>
            {/* Left Section (20% flex) */}
            <div
              style={{
                flex: "20%",
                borderRight: "1px solid #ccc",
                padding: "20px",
              }}
            >
              {/* Marking tools */}
              {/* Marks */}
              <div>
                <Button
                  onClick={() => handleMarkSelection("0")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  0
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  1/2
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  1
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  {" "}
                  2
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  3
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  4
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  5
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  6
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  7
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  8
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  9
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  10
                </Button>
                {/* Add more marks here */}
              </div>
              (
              <div>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("correct")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Check />
                    </Button>
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("wrong")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Close />
                    </Button>
                  </div>
                </div>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("ruler")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Create />
                    </Button>
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("brush")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Brush />
                    </Button>
                  </div>
                </div>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("highlight")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Highlight />
                    </Button>
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("star")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Star />
                    </Button>
                  </div>
                </div>

                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("draw")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Clear />
                    </Button>
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("na")}
                      style={{ border: "3px solid #042954" }}
                    >
                      N/A
                    </Button>
                  </div>
                </div>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("undo")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Undo />
                    </Button>
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("arrow")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <ArrowForward />
                    </Button>
                  </div>
                </div>

                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("circle")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <RadioButtonUnchecked />
                    </Button>
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("cross")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <CloseOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ flex: "60%", padding: "20px" }}>
              <canvas
                ref={canvasRef}
                width="800"
                height="600"
                style={{ border: "1px solid #000" }}
                onMouseDown={(event) => {
                  if (currentTool === "ruler" || currentTool === "correct") {
                    handleMouseDown(event);
                  }
                }}
                onMouseMove={(event) => {
                  if (currentTool === "ruler" || currentTool === "correct") {
                    handleMouseMove(event);
                  }
                }}
                onMouseUp={() => {
                  if (currentTool === "ruler") {
                    handleMouseUp();
                  }
                }}
              />
              {currentTool === "correct" && (
                <Check
                  style={{
                    position: "absolute",
                    left: correctSymbolPosition.x,
                    top: correctSymbolPosition.y,
                  }}
                />
              )}
            </div>
            <div>
              <div
                style={{
                  flex: "20%",
                  borderLeft: "1px solid #ccc",
                  padding: "20px",
                }}
              >
                {/* Grading and score */}

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      backgroundColor: "#042954",
                      color: "white",
                      padding: "10px",
                      fontSize: "20px",
                      borderRight: "3px solid #fff",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        width: "30%",
                        marginRight: "10px",
                        borderRight: "3px solid #fff",
                      }}
                    >
                      Question
                    </span>
                    <span
                      style={{
                        width: "30%",
                        marginRight: "10px",
                        borderRight: "3px solid #fff",
                      }}
                    >
                      Out Of
                    </span>
                    <span
                      style={{ width: "30%", borderRight: "3px solid #fff" }}
                    >
                      Score
                    </span>
                  </div>
                  {questionData.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <button
                        style={{
                          width: "30%",
                          marginRight: "10px",
                          padding: "5px 10px",
                          border: "none",
                          backgroundColor: "#f0f0f0",
                          fontSize: "16px",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        {item.question}
                      </button>
                      <input
                        type="text"
                        value={`Original: ${item.originalMark}`}
                        readOnly
                        style={{ width: "30%", marginRight: "10px" }}
                      />
                      <input
                        type="number"
                        value={item.scoreGiven}
                        onChange={(e) =>
                          handleScoreChange(index, e.target.value)
                        }
                        style={{ width: "30%", marginRight: "10px" }}
                      />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    backgroundColor: "#042954",
                    padding: "3px",
                    borderRadius: "10px",
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "18px",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                  >
                    Calculate Total Score: {totalOriginalScore}/
                    {totalScoreGiven}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </ValidatorForm>
      </Container>
    </div>
  );
};

export default OnScreen;
