import React, { Fragment, useEffect, useState, useRef } from "react";
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
import useFetch from "hooks/useFetch";
import axios from "axios";
import useAuth from "app/hooks/useAuth";
import "./report.css";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const TermRep = ({ studentId }) => {
  const componentRef = useRef();
  const gradeDefinitions = [
    { markfrom: 80, markupto: 100, comment: "Excellent", grade: "A" },
    { markfrom: 70, markupto: 79, comment: "Very Good", grade: "B" },
    { markfrom: 60, markupto: 69, comment: "Good", grade: "C" },
    { markfrom: 55, markupto: 59, comment: "Fairly Good", grade: "D" },
    { markfrom: 0, markupto: 49, comment: "Poor", grade: "E" },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [studentData, setStudentData] = useState(null);
  const { id } = useParams();

  // const { data } = useFetch(`/students/${id}`);

  const { data } = useFetch(`/students/${studentId}`);
  console.log("Data from useFetch:", data);
  // const { data,  } = useFetch(`/students/${user._id}`); // Fetch data using the correct URL

  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
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
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchStudentData = async (studentId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${apiUrl}/api/get-scores-by-student/${studentId}`,
        { headers }
      );

      console.log("Original data:", response.data);

      // Filter out subjects without marks
      const filteredScores = response.data.scores.filter(
        (score) => score.marksObtained !== undefined
      );

      console.log("Filtered data:", {
        ...response.data,
        scores: filteredScores,
      });

      // Return the data with the filtered scores
      return { ...response.data, scores: filteredScores };
    } catch (error) {
      console.error("Error fetching student data:", error);
      throw new Error("Failed to fetch student data");
    }
  };
  useEffect(() => {
    const fetchSchoolSettings = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/setting`);
        const { data } = response.data;

        // Set the retrieved school settings to the state
        setSchoolSettings(data);
      } catch (error) {
        console.error("Error fetching school settings:", error);
      }
    };

    fetchSchoolSettings();
  }, [apiUrl]);
  useEffect(() => {
    const fetchAccountSettings = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/account-setting`);
        const { data } = response.data;

        // Set the retrieved school settings to the state
        setAccountSettings(data);
      } catch (error) {
        console.error("Error fetching school settings:", error);
      }
    };

    fetchAccountSettings();
  }, [apiUrl]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await fetchStudentData(studentId);
        setStudentData(data);

        setLoading(false);
      } catch (error) {
        setError("Failed to fetch student data");
        setLoading(false);
      }
    };

    fetchData();

    console.log("Student ID in useEffect:", studentId);
  }, [studentId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const totalMarksObtained = studentData?.scores?.reduce(
    (total, score) => total + (score.marksObtained || 0),
    0
  );

  const totalMarks = studentData?.scores
    ? studentData.scores.length * 100 // Assuming 100 marks per subject
    : 0;
  const averageMarks = studentData?.scores
    ? (
        (studentData.scores.reduce(
          (acc, score) => acc + (score.marksObtained || 0),
          0
        ) /
          totalMarks) *
        100
      ).toFixed(1)
    : 0;

  const calculateGrade = (comment) => {
    // Use your existing gradeDefinitions to find a grade with a similar comment
    const matchingGrade = gradeDefinitions.find((grade) =>
      comment.toLowerCase().includes(grade.comment.toLowerCase())
    );

    // Return the grade if a matching grade is found
    return matchingGrade ? matchingGrade.grade : "-";
  };

  // ...
  // const calculateAverageGrade = () => {
  //   const gradeToValueMap = {
  //     A: 5,
  //     B: 4,
  //     C: 3,
  //     D: 2,
  //     E: 1,
  //   };

  //   let totalGradeValues = 0;
  //   let totalMarksObtained = 0;
  //   let totalSubjects = 0;

  //   studentData?.scores.forEach((score) => {
  //     const gradeValue = gradeToValueMap[calculateGrade(score?.comment)];
  //     const marksObtained = score?.marksObtained;

  //     if (
  //       !isNaN(gradeValue) &&
  //       gradeValue !== undefined &&
  //       !isNaN(marksObtained) &&
  //       marksObtained !== undefined
  //     ) {
  //       console.log("Grade Value:", gradeValue);
  //       console.log("Marks Obtained:", marksObtained);

  //       totalGradeValues += gradeValue;
  //       totalMarksObtained += gradeValue * marksObtained;
  //       totalSubjects += 1;
  //     }
  //   });

  //   console.log("Total Grade Values:", totalGradeValues);
  //   console.log("Total Marks Obtained:", totalMarksObtained);
  //   console.log("Total Subjects:", totalSubjects);

  //   if (
  //     totalMarksObtained === 0 ||
  //     totalGradeValues === 0 ||
  //     totalSubjects === 0
  //   ) {
  //     return "N/A";
  //   }

  //   const averageGradeValue = totalGradeValues / totalSubjects;

  //   console.log("average", averageGradeValue);

  //   if (isNaN(averageGradeValue)) {
  //     // Check if the result is NaN, return "N/A" to avoid displaying an invalid value
  //     return "N/A";
  //   }

  //   // Map the average grade value to a grade (e.g., A, B, C, D, E) based on your criteria
  //   const valueToGradeMap = {
  //     5: "A",
  //     4: "B",
  //     3: "C",
  //     2: "D",
  //     1: "E",
  //   };

  //   const averageGrade = valueToGradeMap[Math.round(averageGradeValue)];

  //   // Return the numeric value instead of a string
  //   return parseFloat(averageGradeValue.toFixed(1)) || "N/A";
  //   // const positions = calculatePositions(studentData?.scores);
  // };
  const calculateAverageGrade = () => {
    const gradeToValueMap = {
      A: 5,
      B: 4,
      C: 3,
      D: 2,
      E: 1,
    };

    let totalGradeValues = 0;
    let totalMarksObtained = 0;
    let totalSubjects = 0;

    // Check if there are subjects with valid grades
    const subjectsWithGrades = studentData?.scores?.filter(
      (score) => score?.marksObtained !== undefined
    );

    if (!subjectsWithGrades || subjectsWithGrades.length === 0) {
      return "N/A";
    }

    subjectsWithGrades.forEach((score) => {
      const gradeValue = gradeToValueMap[calculateGrade(score?.comment)];
      const marksObtained = score?.marksObtained;

      if (
        !isNaN(gradeValue) &&
        gradeValue !== undefined &&
        !isNaN(marksObtained) &&
        marksObtained !== undefined
      ) {
        console.log("Grade Value:", gradeValue);
        console.log("Marks Obtained:", marksObtained);

        totalGradeValues += gradeValue;
        totalMarksObtained += gradeValue * marksObtained;
        totalSubjects += 1;
      }
    });

    console.log("Total Grade Values:", totalGradeValues);
    console.log("Total Marks Obtained:", totalMarksObtained);
    console.log("Total Subjects:", totalSubjects);

    if (
      totalMarksObtained === 0 ||
      totalGradeValues === 0 ||
      totalSubjects === 0
    ) {
      return "N/A";
    }

    const averageGradeValue = totalGradeValues / totalSubjects;

    console.log("average", averageGradeValue);

    if (isNaN(averageGradeValue)) {
      // Check if the result is NaN, return "N/A" to avoid displaying an invalid value
      return "N/A";
    }

    // Map the average grade value to a grade (e.g., A, B, C, D, E) based on your criteria
    const valueToGradeMap = {
      5: "A",
      4: "B",
      3: "C",
      2: "D",
      1: "E",
    };

    const averageGrade = valueToGradeMap[Math.round(averageGradeValue)];

    // Ensure the result is a numeric value
    const result = parseFloat(averageGradeValue.toFixed(1));

    // Return the numeric value instead of a string
    return isNaN(result) ? "N/A" : result;
  };

  const calculateAllPositions = (scores, examId) => {
    // Filter out scores for the specific exam
    const validScores = scores.filter(
      (score) => score.marksObtained !== undefined && score.examId === examId
    );

    // Get unique subject IDs in the exam
    const subjectIds = [
      ...new Set(validScores.map((score) => score.subjectId)),
    ];

    // Create a map to store positions based on student IDs for each subject
    const positionsMap = new Map();

    // Calculate positions for each subject separately
    subjectIds.forEach((subjectId) => {
      const subjectScores = validScores
        .filter((score) => score.subjectId === subjectId)
        .sort((a, b) => b.marksObtained - a.marksObtained);

      // Adding some console logs for debugging
      console.log("Subject ID:", subjectId);
      console.log("Sorted Scores:", subjectScores);

      // Assign positions based on the order in the sorted array
      subjectScores.forEach((score, index) => {
        // Adding some console logs for debugging
        console.log("Student ID:", score.studentId);
        console.log("Current Position:", index + 1);

        // Modify this line to use the correct property for studentId
        const positionKey = `${subjectId}_${score.studentId}`;

        positionsMap.set(positionKey, index + 1);
      });
    });

    // Adding a console log to check the final positions map
    console.log("Final Positions Map:", positionsMap);

    return positionsMap;
  };

  // Inside your component, where you render the positions for each subject

  // Inside your component, where you render the positions for each subject

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Box width="100%" overflow="auto">
          <body className="print-button-container">
            <button onClick={handlePrint}> Print this out!</button>
            <div class="container" ref={componentRef}>
              <div
                class="header"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <div class="logo">
                  <img
                    src={accountSettings.schoolLogo}
                    style={{
                      width: "130px",
                      height: "130px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div class="bd_title">
                  <h1
                    style={{
                      fontSize: "25px",
                      fontWeight: "800",
                      textTransform: "uppercase",
                      margin: "10px 0",
                    }}
                  >
                    {accountSettings.name || ""}
                  </h1>
                  <h4 style={{ fontSize: "18px", margin: "5px 0" }}>
                    {accountSettings.address || ""}
                  </h4>
                  <p style={{ color: " #042954", margin: " 5px 0" }}>
                    Tel: {accountSettings.phone || ""},{" "}
                    {accountSettings.phonetwo || ""}, Email:
                    {accountSettings.email || ""}
                  </p>
                  <h3 style={{ color: "#042954", margin: "10px 0" }}>
                    {data?.classname || ""} First Term Report Card
                  </h3>
                </div>
              </div>

              <div
                className="bd_detailssec"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
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
                  style={{ flex: "1", padding: "0 20px", textAlign: "center" }}
                >
                  <div style={{ marginBottom: "20px" }}>
                    <span>Student Name:</span>{" "}
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
                      value={data?.studentName || ""}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <span>Session:</span>{" "}
                    <p
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
                    >
                      {accountSettings.sessionStart}-
                      {accountSettings.sessionEnd}
                    </p>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <span>Class Teacher:</span>{" "}
                    <span
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
                    >
                      Mrs Adebisi Emmanuel
                    </span>
                  </div>
                </div>
                <div
                  style={{ flex: "1", padding: "0 20px", textAlign: "center" }}
                >
                  <div>
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
                        value={data?.AdmNo || ""}
                      />
                    </p>
                    <p style={{ color: "#042954" }}>
                      <span>Class Position:</span>{" "}
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
                        value={studentData?.position || ""}
                      />
                    </p>
                    <p style={{ color: "#042954" }}>
                      <span>Number in Class:</span>{" "}
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
                        value={studentData?.noinclass || ""}
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
                        value={totalMarks || ""}
                      />
                    </p>
                  </div>
                </div>
                <div
                  style={{ flex: "1", padding: "0 20px", textAlign: "center" }}
                >
                  <div>
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
                        value={totalMarksObtained || ""}
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
                        value={averageMarks || ""}
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
                        // value={calculateAverageGrade().toFixed(1)}

                        value={
                          typeof calculateAverageGrade() === "number"
                            ? calculateAverageGrade().toFixed(1)
                            : calculateAverageGrade()
                        }
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="table-responsive bd_table">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <table className="table" id="customers">
                              <thead style={{ backgroundColor: "#ffc107" }}>
                                <tr>
                                  <th scope="col">S/No</th>
                                  <th scope="col" style={{ textAlign: "left" }}>
                                    Subject
                                  </th>
                                  <th scope="col">Test</th>
                                  <th scope="col">Exam</th>
                                  <th scope="col">Obtained Marks</th>
                                  {/*} <th scope="col">Position</th>*/}
                                  <th scope="col">Grade</th>
                                  <th scope="col">Remark</th>
                                </tr>
                              </thead>
                              <tbody>
                                {studentData?.scores &&
                                  studentData.scores
                                    .filter(
                                      (score) =>
                                        score.marksObtained !== undefined
                                    )
                                    .map((score, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{score?.subjectName || "-"}</td>
                                        <td>{score?.testscore || "-"}</td>
                                        <td>{score?.examscore || "-"}</td>
                                        <td>{score?.marksObtained || "-"}</td>

                                        {/* Change here - Call calculatePositions for each subject and exam */}
                                        {/*} <td>
                                          {calculateAllPositions(
                                            studentData.scores,
                                            score.subjectId,
                                            score.examId
                                          ).get(score.studentId) || "-"}
                                          </td>*/}

                                        <td>
                                          {calculateGrade(score?.comment) ||
                                            "-"}
                                        </td>
                                        <td>{score?.comment || "-"}</td>
                                      </tr>
                                    ))}
                              </tbody>
                            </table>
                          </td>
                          <td style={{ verticalAlign: "top" }}>
                            <table class="table" id="customersreport">
                              <thead style={{ backgroundColor: "#ffc107" }}>
                                <tr>
                                  <th scope="col" colspan="3">
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
                                <tr>
                                  <td>1</td>
                                  <td>Following Instruction</td>
                                  <td>5</td>
                                </tr>
                                <tr>
                                  <td>2</td>
                                  <td>Working Independently</td>
                                  <td>5</td>
                                </tr>
                                <tr>
                                  <th></th>
                                  <th>Behaviour</th>
                                  <th>RATINGS</th>
                                </tr>
                                <tr>
                                  <td>1</td>
                                  <td>Punctuality</td>
                                  <td>5</td>
                                </tr>
                                <tr>
                                  <th></th>
                                  <th>Communication</th>
                                  <th>RATINGS</th>
                                </tr>
                                <tr>
                                  <td>1</td>
                                  <td>Talking</td>
                                  <td>5</td>
                                </tr>
                                <tr>
                                  <td>2</td>
                                  <td>Eye Contact</td>
                                  <td>5</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div style={{ color: "#042954", fontSize: "16px" }}>
                KEY TO GRADES A (DISTINCTION)=70% &amp; ABOVE , C
                (CREDIT)=55-69% , P(PASS)=40-54% , F(FAIL)=BELOW 40%
              </div>
              <div class="remarksbox" style={{ padding: "10px 0" }}>
                <table class="table">
                  <tbody>
                    <tr>
                      <th>CLASS TEACHER'S REMARK</th>
                      <td colspan="2"></td>
                    </tr>
                    <tr>
                      <th>PRINCIPAL'S REMARK</th>
                      <td colspan="2"></td>
                    </tr>
                    <tr>
                      <th>PRINCIPAL'S NAME</th>
                      <td>{schoolSettings.principalName}</td>
                      <td style={{ textAlign: "right" }}>
                        <img
                          src={`https://hlhs-961934e05258.herokuapp.com/uploads/${schoolSettings.signature}`}
                          width="200"
                          alt="Principal Signature"
                        />
                      </td>
                    </tr>

                    <tr>
                      <th>SCHOOL RESUMES</th>

                      <td>
                        {" "}
                        {schoolSettings.resumptionDate
                          ? new Date(
                              schoolSettings.resumptionDate
                            ).toLocaleDateString()
                          : ""}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                class="bd_key"
                style={{ color: "#042954", fontSize: "16px" }}
              >
                KEY TO RATINGS : 5 = Excellent , 4 = Good , 3 = Fair , 2 = Poor
                , 1 = Very Poor
              </div>

              <div class="bdftrtop">
                <div class="float-left text-right bdftrtopl">
                  <span style={{ color: "#042954" }}>Seal of the Register</span>
                </div>
                <div class="float-right text-left bdftrtopr">
                  <span style={{ color: "#042954" }}>Date</span>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </body>
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default TermRep;
