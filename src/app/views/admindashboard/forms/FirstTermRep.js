import React, {
  useContext,
  Fragment,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import useFetch from "../../../../hooks/useFetch";
import axios from "axios";
import useAuth from "../../../../app/hooks/useAuth";
import "./report.css";
import "./print.css";

import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const FirstTermRep = ({ studentId }) => {
  const componentRef = useRef();
  const gradeDefinitions = [
    { markfrom: 70, markupto: 100, comment: "Excellent", grade: "A" },
    { markfrom: 60, markupto: 69, comment: "Very Good", grade: "B" },
    { markfrom: 50, markupto: 59, comment: "Good", grade: "C" },
    { markfrom: 45, markupto: 49, comment: "Fairly Good", grade: "D" },
    { markfrom: 40, markupto: 44, comment: "Poor", grade: "E" },
    { markfrom: 0, markupto: 39, comment: "Poor", grade: "F" },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [studentData, setStudentData] = useState(null);
  const [psyData, setPsyData] = useState(null);
  const { currentSession } = useContext(SessionContext);

  // const { id } = useParams();
  const id = studentId;
  console.log("std", id);
  const { data } = useFetch(`/students/${id}/${currentSession._id}`);
  useEffect(() => {
    console.log("Data from useFetch:", data);
  }, [data]);

  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [teacherName, setTeacherName] = useState("")
  const [error, setError] = useState(null);
  const [schoolSettings, setSchoolSettings] = useState({
    principalName: "",
    resumptionDate: "",
    signature: "",
  });
  const [accountSettings, setAccountSettings] = useState({
    name: "",
    motto: "",
    address: "",
    phone: "",
    phonetwo: "",
    email: "",
    sessionStart: "",
    sessionEnd: "",
    schoolLogo: "",
  });

  

  const apiUrl = process.env.REACT_APP_API_URL.trim();

  // /class/${currentSession._id}

  // console.log("class Teacher:", classTeacher )



  // Debug: Log the studentId and currentSession
  useEffect(() => {
    console.log("Component mounted with studentId:", studentId);
    console.log("Current Session:", currentSession);
  }, [studentId, currentSession]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch student data
        const fetchedStudentData = await fetchStudentData(studentId);

        // Debug: Log the fetched student data
        console.log("Fetched Student Data:", fetchedStudentData);

        // Set the student data in state
        setStudentData(fetchedStudentData);

        setLoading(false);
      } catch (error) {
        // Handle errors
        console.error("Error in fetchData:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();

    console.log("Student ID in useEffect:", studentId);
  }, [studentId, currentSession]);








  const fetchclassteacher = async (studentId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const response = await axios.get(
        `${apiUrl}/api/class/${currentSession._id}`,
        { headers }
      );
  
      // Debug: Log the entire API response
      console.log("API Response for class:", response.data);
  
      // Assuming 'data' holds the student data
      const studentClassName = data[0]?.classname;  // Replace with correct field
      if (!studentClassName) {
        throw new Error("Student's class not found");
      }
  
      // Find the class that matches the student's class name
      const matchedClass = response.data.find(
        (classItem) => classItem.name === studentClassName
      );
  
      if (matchedClass) {
        console.log("Class Teacher:", matchedClass.teacher);
        setTeacherName(matchedClass.teacher)
        return matchedClass.teacher;
      } else {
        console.log("No class found matching the student's class.");
      }
  
    } catch (error) {
      console.error("Error fetching class teacher:", error);
      // throw new Error("Failed to fetch class teacher");
    }
  };
  
  fetchclassteacher();
  








  const fetchStudentData = async (studentId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${apiUrl}/api/get-scores-by-student/${studentId}/${currentSession._id}`,
        { headers }
      );

      // Debug: Log the entire API response
      console.log("API Response for get-scores-by-student:", response.data);

      const filteredScores = response.data.scores.filter(
        (score) =>
          (score.marksObtained !== undefined || score.marksObtained === 0) &&
          score.examId.name.toUpperCase() === "FIRST TERM"
      );

      if (filteredScores.length === 0) {
        throw new Error("No first term scores found for the student");
      }

      // Debug: Log the filtered scores
      console.log("Filtered Scores:", filteredScores);

      const scoresWithPositions = await Promise.all(
        filteredScores.map(async (score) => {
          const { examId, subjectId } = score;

          if (!examId || !subjectId) {
            console.error(
              "Exam ID or Subject ID not found for a score:",
              score
            );
            return { ...score, position: 0 };
          }

          const allStudentsData = await fetchAllStudentsData(
            examId._id,
            subjectId._id
          );

          const sortedStudents = allStudentsData.sort(
            (a, b) => b.marksObtained - a.marksObtained
          );

          const studentPosition =
            sortedStudents.findIndex(
              (student) => student.studentId?._id === studentId
            ) + 1;

          // Debug: Log the position for each subject
          console.log(
            `Position of current student for Subject ${subjectId._id} and Exam ${examId._id}:`,
            studentPosition
          );

          return {
            ...score,
            position: studentPosition,
          };
        })
      );

      // Debug: Log scores with positions
      console.log("Scores with Positions:", scoresWithPositions);

      // Make sure scoresWithPositions is an array with at least one element
      if (scoresWithPositions && scoresWithPositions.length > 0) {
        return scoresWithPositions;
      } else {
        throw new Error("No scores available");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      // throw new Error("Failed to fetch student data");
    }
  };

  const fetchAllStudentsData = async (examId, subjectId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${apiUrl}/api/get-all-scores/${examId}/${subjectId}`,
        { headers }
      );

      // Debug: Log all students data
      console.log("All Students Data:", response.data);

      const data = response.data;
      if (data && data.scores) {
        console.log("Number of students with marks:", data.scores.length);
        const studentsWithMarks = data.scores.filter(
          (student) =>
            student.marksObtained !== undefined && student.marksObtained !== 0
        );
        console.log("Students with marks:", studentsWithMarks);

        return studentsWithMarks;
      } else {
        console.log("No scores data available.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching all students data:", error);
      throw new Error("Failed to fetch all students data");
    }
  };

  const fetchPsyData = async (studentId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${apiUrl}/api/get-psy-by-student/${studentId}/${currentSession._id}`,
        { headers }
      );

      // Debug: Log the psychomotor data
      console.log("Psychomotor Data:", response.data);

      return { ...response.data };
    } catch (error) {
      console.error("Error fetching psychomotor data:", error);
      throw new Error("Failed to fetch psychomotor data");
    }
  };

  // Fetch school settings
  useEffect(() => {
    const fetchSchoolSettings = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/setting`);
        const { data } = response.data;

        // Debug: Log school settings
        console.log("School Settings:", data);

        // Set the retrieved school settings to the state
        setSchoolSettings(data);
      } catch (error) {
        console.error("Error fetching school settings:", error);
      }
    };

    fetchSchoolSettings();
  }, [apiUrl]);

  // Fetch account settings
  useEffect(() => {
    const fetchAccountSettings = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/account-setting`);
        const { data } = response.data;

        // Debug: Log account settings
        console.log("Account Settings:", data);

        // Set the retrieved account settings to the state
        setAccountSettings(data);
      } catch (error) {
        console.error("Error fetching account settings:", error);
      }
    };

    fetchAccountSettings();
  }, [apiUrl]);

  // Fetch psychomotor data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const fetchedPsyData = await fetchPsyData(studentId);

        // Debug: Log the fetched psychomotor data
        console.log("Fetched Psychomotor Data:", fetchedPsyData);

        setPsyData(fetchedPsyData);

        setLoading(false);
      } catch (error) {
        console.error("Error in fetchData for psychomotor data:", error);
        setError("Failed to fetch psychomotor data");
        setLoading(false);
      }
    };

    fetchData();

    console.log("Student ID in psychomotor useEffect:", studentId);
  }, [studentId, currentSession]);

  // Log the main data fetched via useFetch
  useEffect(() => {
    console.log("Data from useFetch:", data);
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  let totalMarksObtained = 0;
  if (studentData && Array.isArray(studentData)) {
    totalMarksObtained = studentData.reduce(
      (total, score) => total + (score.marksObtained || 0),
      0
    );
  }

  // Debug: Log totalMarksObtained
  console.log("Total Marks Obtained:", totalMarksObtained);

  const totalMarks = studentData ? studentData.length * 100 : 0;
  const averageMarks = totalMarks
    ? ((totalMarksObtained / totalMarks) * 100).toFixed(1)
    : 0;

  const calculateGrade = (comment) => {
    const matchingGrade = gradeDefinitions.find((grade) =>
      comment?.toLowerCase().includes(grade.comment.toLowerCase())
    );
    return matchingGrade ? matchingGrade.grade : "-";
  };

  const calculateAverageGrade = () => {
    const gradeToValueMap = {
      A: 5,
      B: 4,
      C: 3,
      D: 2,
      E: 1,
    };

    let totalGradeValues = 0;
    let totalSubjects = 0;

    const subjectsWithGrades = studentData?.filter(
      (score) => score?.marksObtained !== undefined
    );

    if (!subjectsWithGrades || subjectsWithGrades.length === 0) {
      console.log("No subjects with valid grades found.");
      return "N/A";
    }

    subjectsWithGrades.forEach((score) => {
      const gradeValue = gradeToValueMap[calculateGrade(score?.comment)];

      if (!isNaN(gradeValue) && gradeValue !== undefined) {
        totalGradeValues += gradeValue;
        totalSubjects += 1;
      }
    });

    if (totalGradeValues === 0 || totalSubjects === 0) {
      return "  ";
    }

    return (totalGradeValues / totalSubjects).toFixed(2);
  };

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Box width="100%" overflow="auto">
          <button onClick={handlePrint}>Print this out!</button>
          <div className="comp" ref={componentRef}>
            <div
              className="header"
              style={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#f0f0f0",
              }}>
              <div className="logo">
                <img
                  src={`https://edupros.s3.amazonaws.com/${accountSettings.schoolLogo}`}
                  style={{
                    width: "200px",
                    height: "180px",
                  }}
                  alt="School Logo"
                />
              </div>
              <div className="bd_title">
                <h1
                  style={{
                    fontSize: "25px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    margin: "10px 0",
                  }}>
                  {accountSettings.name || ""}
                </h1>
                <h4 style={{ fontSize: "18px", margin: "5px 0" }}>
                  {accountSettings.address || ""}
                </h4>
                <p style={{ color: "#042954", margin: "5px 0" }}>
                  Tel: {accountSettings.phone || ""},{" "}
                  {accountSettings.phonetwo || ""}, Email:{" "}
                  {accountSettings.email || ""}
                </p>
                <h3 style={{ color: "#042954", margin: "10px 0" }}>
                  {data[0]?.classname || ""} First Term Report Card
                </h3>
              </div>
            </div>

            <div
              className="bd_detailssec"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <div style={{ flex: "0 0 auto" }}>
                <div className="bd_photo">
                  <img
                    className="profile-photo"
                    alt="profile-photo"
                    src="https://hlhs.portalreport.org/uploads/user.jpg"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              </div>
              <div
                style={{ flex: "1", padding: "0 20px", textAlign: "center" }}>
                <div style={{ marginBottom: "20px" }}>
                  <span>Student Name:</span>
                  {""}
                  <span
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}>
                    {data && Array.isArray(data)
                      ? data[0]?.studentName || "Name not available"
                      : "Data format unexpected"}
                  </span>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <span>Session:</span>{" "}
                  <p
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}>
                    {currentSession?.name
                          ? `${currentSession.name}`
                          : "No active session"}
                  </p>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <span>Class Teacher:</span>{" "}
                  <span
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}>
                    {teacherName}
                  </span>
                </div>
              </div>
              <div
                style={{ flex: "1", padding: "0 20px", textAlign: "center" }}>
                <p style={{ color: "#042954" }}>
                  <span>Student Id No:</span>{" "}
                  <input
                    type="text"
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}
                    value={data[0]?.AdmNo || "ID not available"}
                    readOnly
                  />
                </p>
                <p style={{ color: "#042954" }}>
                  <span>Total Marks:</span>{" "}
                  <input
                    type="text"
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}
                    value={totalMarks || "0"}
                    readOnly
                  />
                </p>
              </div>
              <div
                style={{ flex: "1", padding: "0 20px", textAlign: "center" }}>
                <p style={{ color: "#042954" }}>
                  <span>Marks Obtained:</span>{" "}
                  <input
                    type="text"
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}
                    value={totalMarksObtained || "0"}
                    readOnly
                  />
                </p>
                <p style={{ color: "#042954" }}>
                  <span>Average Marks:</span>{" "}
                  <input
                    type="text"
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}
                    value={averageMarks || "0"}
                    readOnly
                  />
                </p>
                <p style={{ color: "#042954" }}>
                  <span>Average Grade:</span>{" "}
                  <input
                    type="text"
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}
                    value={calculateAverageGrade() || "N/A"}
                    readOnly
                  />
                </p>
              </div>
            </div>

            <div className="tables-container flex">
            {/* First Table */}
            <table className="table" id="customers" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>S/No</th>
                  <th>Subject</th>
                  <th>Test</th>
                  <th>Exam</th>
                  <th>Obtained Marks</th>
                  <th>Position</th>
                  <th>Grade</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody style={{ width: "100% !important" }}>
                {/* Check if there's data and map through the scores */}
                {studentData && studentData.length > 0 ? (
                  studentData.map((score, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td> {/* Serial number */}
                      <td>{score?.subjectName || "-"}</td> {/* Subject Name */}
                      <td>
                        {score?.testscore !== undefined ? score.testscore : "-"}
                      </td>{" "}
                      {/* Test Score */}
                      <td>
                        {score?.examscore !== undefined ? score.examscore : "-"}
                      </td>{" "}
                      {/* Exam Score */}
                      <td>
                        {score?.marksObtained !== undefined
                          ? score.marksObtained
                          : "-"}
                      </td>{" "}
                      {/* Obtained Marks */}
                      <td>
                        {score?.position !== undefined ? score.position : "-"}
                      </td>{" "}
                      {/* Position */}
                      <td>{calculateGrade(score?.comment) || "-"}</td>{" "}
                      {/* Grade */}
                      <td>{score?.comment || "-"}</td> {/* Comment/Remark */}
                    </tr>
                  ))
                ) : (
                  // Fallback for when no data is available
                  <tr>
                    <td colSpan="8">No data available for this term.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Second Table */}
            <table
              className="table second-sub-table"
              id="customersreport"
              style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th
                    colSpan="3"
                    style={{ textAlign: "center", fontSize: "18px" }}>
                    AFFECTIVE AND PSYCHOMOTOR REPORT
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th></th>
                  <th>Work Habits</th>
                  <th>RATINGS</th>
                </tr>
                {psyData?.scores?.length > 0 ? (
                  psyData.scores.map((score, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>Following Instruction</td>
                        <td>{score?.instruction || "0"}</td>
                      </tr>
                      <tr>
                        <td>{index + 2}</td>
                        <td>Working Independently</td>
                        <td>{score?.independently || "0"}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th>Behaviour</th>
                        <th>RATINGS</th>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Punctuality</td>
                        <td>{score?.punctuality || "0"}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th>Communication</th>
                        <th>RATINGS</th>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Talking</td>
                        <td>{score?.talking || "0"}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Eye Contact</td>
                        <td>{score?.eyecontact || "0"}</td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No psychomotor data available</td>
                  </tr>
                )}
              </tbody>
            </table>

            </div>


            <div style={{ color: "#042954", fontSize: "16px" }}>
              KEY TO GRADES A (DISTINCTION)=70% &amp; ABOVE , C (CREDIT)=55-69%
              , P(PASS)=40-54% , F(FAIL)=BELOW 40%
            </div>
            <div className="remarksbox" style={{ padding: "10px 0" }}>
              <table className="table">
                <tbody>
                  <tr>
                    <th>CLASS TEACHER'S REMARK</th>
                    {psyData?.scores?.map((score, index) => (
                      <td key={index} colSpan="2">
                        {score.remarks || "No remarks"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th>PRINCIPAL'S REMARK</th>
                    {psyData?.scores?.map((score, index) => (
                      <td key={index} colSpan="2">
                        {score.premarks || "No principal remarks"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th>PRINCIPAL'S NAME</th>
                    <td>{schoolSettings.principalName || "N/A"}</td>
                    <td style={{ textAlign: "right" }}>
                      <img
                        src={`${apiUrl}/uploads/${schoolSettings.signature}`}
                        width="200"
                        alt="Principal Signature"
                      />
                    </td>
                  </tr>

                  <tr>
                    <th>SCHOOL RESUMES</th>
                    <td>
                      {schoolSettings.resumptionDate
                        ? new Date(
                            schoolSettings.resumptionDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              className="bd_key"
              style={{ color: "#042954", fontSize: "16px" }}>
              KEY TO RATINGS : 5 = Excellent , 4 = Good , 3 = Fair , 2 = Poor ,
              1 = Very Poor
            </div>

            <div className="bdftrtop">
              <div className="float-left text-right bdftrtopl">
                <span style={{ color: "#042954" }}>Seal of the Register</span>
              </div>
              <div className="float-right text-left bdftrtopr">
                <span style={{ color: "#042954" }}>Date</span>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default FirstTermRep;
