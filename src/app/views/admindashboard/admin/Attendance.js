import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Breadcrumb, SimpleCard } from "../../../../app/components";
import axios from "axios";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  MenuItem,
  DialogTitle,
  RadioGroup,
  styled,
} from "@mui/material";
import useFetch from "../../../../hooks/useFetch";
import { Span } from "../../../../app/components/Typography";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Attendance = () => {
  const { currentSession } = useContext(SessionContext);

  const {
    data: classData,
    loading: classLoading,
    error: classError,
  } = useFetch(currentSession ? `/class/${currentSession._id}` : null);
  console.log(classData);
  const { data: examData } = useFetch(
    currentSession ? `/getofflineexam/${currentSession._id}` : null
  );
  console.log(examData);
  const [selectedExam, setSelectedExam] = React.useState("");
  const [selectedClass, setSelectedClass] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [showAttendance, setShowAttendance] = React.useState(false);
  const [studentData, setStudentData] = React.useState([]);

  console.log("Current studentData state:", studentData);

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchStudentData = async (examId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      const response = await fetch(
        `${apiUrl}/api/get-all-attendance/${examId}`,
        {
          headers,
        }
      );

      if (!response.ok) {
        console.error(
          "Failed to fetch student data. Response details:",
          response
        );
        throw new Error("Failed to fetch student data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching student data:", error);
      return { scores: [] }; // Return empty array if there's an error
    }
  };

  // const handleManagePsyClick = async () => {
  //   try {
  //     const token = localStorage.getItem("jwtToken");
  //     const headers = new Headers();
  //     headers.append("Authorization", `Bearer ${token}`);

  //     const response = await fetch(
  //       `${apiUrl}/api/students/${currentSession._id}/${selectedClass}`,
  //       {
  //         headers,
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch student data");
  //     }

  //     const students = await response.json();

  //     // Handle the case where no students are found
  //     if (students.length === 0) {
  //       console.warn("No students found for the selected class.");
  //       // Proceed with the logic for initializing the state, etc.
  //       // You might want to show a message to the user or take appropriate action.
  //     } else {
  //       // Assuming you want to pick the first student for now
  //       const firstStudentId = students[0]._id;
  //       setSelectedStudentId(firstStudentId);

  //       const existingData = await fetchStudentData(selectedExam);

  //       console.log("Response from fetchStudentData:", existingData);
  //       console.log("Existing scores:", existingData.scores);

  //       // Ensure that the scores are properly set in the initial state
  //       const initialState = students.map((student) => {
  //         const studentScore = existingData.scores.find(
  //           (score) => score.studentId && score.studentId._id === student._id
  //         );

  //         console.log(`Student ${student._id} - Existing Score:`, studentScore);

  //         // const defaultTestScore = studentScore
  //         //   ? studentScore.instruction !== undefined
  //         //     ? studentScore.instruction
  //         //     : 0
  //         //   : 0;

  //         // const defaultExamScore = studentScore
  //         //   ? studentScore.independently !== undefined
  //         //     ? studentScore.independently
  //         //     : 0
  //         //   : 0;

  //         return {
  //           studentId: student._id,
  //           studentName: student.studentName,
  //           AdmNo: student.AdmNo,
  //           instruction: studentScore ? studentScore.instruction || 0 : 0,
  //           independently: studentScore ? studentScore.independently || 0 : 0,
  //           punctuality: studentScore ? studentScore.punctuality || 0 : 0,
  //           talking: studentScore ? studentScore.talking || 0 : 0,
  //           eyecontact: studentScore ? studentScore.eyecontact || 0 : 0,
  //           remarks: studentScore ? studentScore.remarks || "" : "",
  //           premarks: studentScore ? studentScore.premarks || "" : "",
  //         };
  //       });

  //       console.log("Initial state:", initialState);

  //       setStudentData(initialState);
  //       setShowMarkManagement(true);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching student data:", error);
  //   }
  // };

  const handleClassChange = (event) => {
    const newSelectedClass = event.target.value;
    setSelectedClass(newSelectedClass);
  };

  const handleExamChange = (event) => {
    const selectedExamId = event.target.value;
    setSelectedExam(selectedExamId);
  };
  const getExamNameById = (examId) => {
    const selectedExam = examData.find((item) => item._id === examId);
    return selectedExam ? selectedExam.name : "";
  };

  // const handleSaveChanges = async () => {
  //   try {
  //     const marks = studentData.map((student) => {
  //       const {
  //         studentId,
  //         instruction = 5,
  //         independently = 5,
  //         punctuality = 5,
  //         talking = 5,
  //         eyecontact = 5,
  //         remarks = 5,
  //         premarks = 5,
  //       } = student;

  //       return {
  //         studentId,

  //         instruction,
  //         independently,
  //         punctuality,
  //         talking,
  //         eyecontact,
  //         remarks,
  //         premarks,
  //       };
  //     });

  //     console.log("Updated Marks:", marks);

  //     const token = localStorage.getItem("jwtToken");
  //     const headers = new Headers();
  //     headers.append("Authorization", `Bearer ${token}`);

  //     // Check if there are existing marks by verifying the examId and subjectId
  //     if (selectedExam) {
  //       const responseCheckMarks = await fetch(
  //         `${apiUrl}/api/get-all-psy/${selectedExam}`,
  //         {
  //           headers,
  //         }
  //       );

  //       console.log("Response from Check Marks:", responseCheckMarks);

  //       if (responseCheckMarks.ok) {
  //         const responseData = await responseCheckMarks.json();
  //         const existingMarks = responseData.scores || [];

  //         // Check if there are existing marks
  //         if (existingMarks.length > 0) {
  //           // Existing marks found, proceed with updating
  //           const responseUpdateMarks = await fetch(
  //             `${apiUrl}/api/update-all-psy`,
  //             {
  //               method: "PUT",
  //               headers: {
  //                 ...headers,
  //                 "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify({
  //                 examId: selectedExam,

  //                 updates: marks,
  //               }),
  //             }
  //           );

  //           console.log("Request Payload:", {
  //             examId: selectedExam,

  //             updates: marks,
  //           });

  //           console.log("Response from Update Marks:", responseUpdateMarks);

  //           if (!responseUpdateMarks.ok) {
  //             const errorMessage = await responseUpdateMarks.text();
  //             console.error(
  //               `Failed to update marks. Server response: ${errorMessage}`
  //             );
  //             throw new Error("Failed to update marks");
  //           } else {
  //             // Notify success using toast
  //             toast.success("Marks updated successfully!");
  //           }
  //         } else {
  //           // No existing marks found, proceed to create new marks
  //           const responseSaveMarks = await fetch(`${apiUrl}/api/save-psy`, {
  //             method: "POST",
  //             headers: {
  //               ...headers,
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               examId: selectedExam,

  //               updates: marks,
  //             }),
  //           });

  //           console.log("Response from Save Marks:", responseSaveMarks);

  //           if (!responseSaveMarks.ok) {
  //             const errorMessage = await responseSaveMarks.text();

  //             console.error(
  //               `Failed to save marks. Server response: ${errorMessage}`
  //             );
  //             throw new Error("Failed to save marks");
  //           } else {
  //             // Notify success using toast
  //             toast.success("Marks saved successfully!");
  //           }
  //         }
  //       } else {
  //         // Handle other response statuses
  //         // ...
  //       }
  //     }
  //     // ... (remaining code)
  //   } catch (error) {
  //     console.error("Error saving marks:", error);
  //     // ... (error handling)
  //   }
  // };

  // Handles attendance status change
  const handleAttendanceChange = (index, status) => {
    const updatedStudents = [...studentData];
    updatedStudents[index].status = status;
    setStudentData(updatedStudents);
  };

  // Simulates fetching data and showing the table
  const handleManageAttendanceClick = () => {
    // Fetch student data based on selected exam, class, and date
    // Example: setStudentData(response.data);
    setShowAttendance(true);
  };

  // Save attendance data (API call)
  const handleSaveAttendance = () => {
    console.log("Saving attendance data:", studentData);
    // API call to save attendance data
  };

  return (
    <div>
      <Container>
        <ValidatorForm onError={() => null}>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Manage Daily Attendance" }]} />
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={3}>
              <TextField
                select
                label="Select an Exam"
                variant="outlined"
                value={selectedExam}
                onChange={handleExamChange}
              >
                {examData &&
                  examData.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                label="Select a Class"
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
            {/*} <Grid item xs={3}>
          <TextField
            type="date"
            label="Date"
            variant="outlined"
          ></TextField>
        </Grid>*/}
            <Grid item xs={3}>
              <TextField
                type="date"
                label="Date"
                variant="outlined"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={handleManageAttendanceClick}
              >
                Manage Attendance
              </Button>
            </Grid>
          </Grid>

          {showAttendance && (
            <>
              <div className="col-sm-4">
                <div className="tile-stats tile-gray">
                  <h3>Attendance for {selectedClass}</h3>
                  <h4>Term: {getExamNameById(selectedExam)}</h4>
                  <h4>Date: {selectedDate}</h4>
                </div>
              </div>

              <div className="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
                <div className="table-responsive full-data">
                  <table
                    className="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
                    id="attendance-table"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Adm No</th>
                        <th>Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.map((student, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{student.AdmNo}</td>
                          <td>{student.studentName}</td>
                          <td>
                            <TextField
                              select
                              value={student.status || "Absent"}
                              onChange={(e) =>
                                handleAttendanceChange(index, e.target.value)
                              }
                            >
                              <MenuItem value="Present">Present</MenuItem>
                              <MenuItem value="Absent">Absent</MenuItem>
                            </TextField>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={handleSaveAttendance}
              >
                Save Attendance
              </Button>
            </>
          )}
        </ValidatorForm>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Attendance;
