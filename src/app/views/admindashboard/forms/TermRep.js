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
import useFetch from "../../../../hooks/useFetch";
import axios from "axios";
import useAuth from "../../../../app/hooks/useAuth";
import "./report.css";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const TermRep = ({ studentId }) => {
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
  const handlePrintInNewTab = () => {
    // Open a new window/tab
    const printWindow = window.open("", "_blank");

    // Generate printable content
    const contentToPrint = componentRef.current.cloneNode(true);
    const elementsToHide = contentToPrint.querySelectorAll(".dont-print");
    elementsToHide.forEach((element) => {
      element.style.display = "none";
    });

    // Append content to the new window/tab
    printWindow.document.body.appendChild(contentToPrint);

    // Trigger print dialog
    printWindow.print();
  };

  const [studentData, setStudentData] = useState(null);
  const [psyData, setPsyData] = useState(null);

  const { id } = useParams();

  // const { data } = useFetch(`/students/${id}`);

  const { data } = useFetch(`/students/${studentId}`);

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

  const apiUrl = process.env.REACT_APP_API_URL.trim();
  // Inside useEffect after fetching student data

  // const fetchStudentData = async (studentId) => {
  //   try {
  //     const token = localStorage.getItem("jwtToken");
  //     if (!token) {
  //       throw new Error("JWT token not found");
  //     }

  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };

  //     const response = await axios.get(
  //       `${apiUrl}/api/get-scores-by-student/${studentId}`,
  //       { headers }
  //     );

  //     const filteredScores = response.data.scores.filter(
  //       (score) => score.marksObtained !== undefined
  //     );

  //     console.log("Filtered data:", {
  //       ...response.data,
  //       scores: filteredScores,
  //     });

  //     if (filteredScores.length === 0) {
  //       throw new Error("No scores found for the student");
  //     }

  //     const { examId, subjectId } =
  //       filteredScores.length > 0 ? filteredScores[0] : {};

  //     console.log("Exam ID:", examId);
  //     console.log("Subject ID:", subjectId);

  //     if (!examId || !subjectId) {
  //       throw new Error("Exam ID or Subject ID not found");
  //     }

  //     const allStudentsData = await fetchAllStudentsData(
  //       examId._id,
  //       subjectId._id
  //     );

  //     console.log("All Students Data with Scores:", allStudentsData);

  //     if (Array.isArray(allStudentsData)) {
  //       // const studentPosition =
  //       //   sortedStudents.findIndex(
  //       //     (student) => student.studentId === studentId
  //       //   ) + 1;
  //       // console.log("Position of current student:", studentPosition);

  //       // Sort students based on marks obtained
  //       const sortedStudents = allStudentsData.sort((a, b) => {
  //         // Compare marks obtained
  //         if (a.marksObtained > b.marksObtained) {
  //           return -1; // a should come before b
  //         }
  //         if (a.marksObtained < b.marksObtained) {
  //           return 1; // b should come before a
  //         }
  //         return 0; // if marks are equal, maintain the order
  //       });

  //       // Find the position of the current student based on marks obtained

  //       const studentPosition =
  //         sortedStudents.findIndex(
  //           (student) => student.studentId._id === studentId
  //         ) + 1;

  //       console.log("Position of current student:", studentPosition);

  //       // Add position to each score object
  //       const scoresWithPosition = filteredScores.map((score) => ({
  //         ...score,
  //         position: studentPosition,
  //       }));

  //       return {
  //         ...response.data,
  //         // scores: filteredScores,
  //         scores: scoresWithPosition,
  //         examId: examId._id,
  //         subjectId: subjectId._id,
  //         allStudentsData: sortedStudents,
  //       };
  //     } else {
  //       console.error("Error: allStudentsData is not an array");
  //       throw new Error("Failed to fetch student data");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching student data:", error);
  //     throw new Error("Failed to fetch student data");
  //   }
  // };

  // const fetchStudentData = async (studentId) => {
  //   try {
  //     const token = localStorage.getItem("jwtToken");
  //     if (!token) {
  //       throw new Error("JWT token not found");
  //     }

  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };

  //     const response = await axios.get(
  //       `${apiUrl}/api/get-scores-by-student/${studentId}`,
  //       { headers }
  //     );

  //     const filteredScores = response.data.scores.filter(
  //       (score) => score.marksObtained !== undefined
  //     );

  //     console.log("Filtered data:", {
  //       ...response.data,
  //       scores: filteredScores,
  //     });

  //     if (filteredScores.length === 0) {
  //       throw new Error("No scores found for the student");
  //     }

  //     const scoresWithPositions = [];

  //     // Iterate over each subject and exam combination
  //     for (const score of filteredScores) {
  //       const { examId, subjectId } = score;

  //       if (!examId || !subjectId) {
  //         console.error("Exam ID or Subject ID not found for a score:", score);
  //         continue; // Skip this score if examId or subjectId is missing
  //       }

  //       const allStudentsData = await fetchAllStudentsData(
  //         examId._id,
  //         subjectId._id
  //       );

  //       // Filter students who have marks for the current subject and exam
  //       const studentsWithMarks = allStudentsData.filter(
  //         (student) =>
  //           student.marksObtained !== undefined &&
  //           student.studentId?._id !== studentId && // Exclude current student
  //           student.subjectId?._id === subjectId._id &&
  //           student.examId?._id === examId._id
  //       );

  //       // Sort students with marks based on marks obtained for the current subject and exam
  //       const sortedStudents = studentsWithMarks.sort(
  //         (a, b) => b.marksObtained - a.marksObtained
  //       );

  //       // Find the position of the current student for the current subject and exam
  //       const studentPosition =
  //         sortedStudents.findIndex(
  //           (student) => student.studentId?._id === studentId
  //         ) + 1;

  //       console.log(
  //         `Position of current student for Subject ${subjectId._id} and Exam ${examId._id}:`,
  //         studentPosition
  //       );

  //       // Add position to the score object
  //       scoresWithPositions.push({
  //         ...score,
  //         position: studentPosition,
  //       });
  //     }

  //     return {
  //       ...response.data,
  //       scores: scoresWithPositions,
  //     };
  //   } catch (error) {
  //     console.error("Error fetching student data:", error);
  //     throw new Error("Failed to fetch student data");
  //   }
  // };

  // const fetchStudentData = async (studentId) => {
  //   try {
  //     const token = localStorage.getItem("jwtToken");
  //     if (!token) {
  //       throw new Error("JWT token not found");
  //     }

  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };

  //     const response = await axios.get(
  //       `${apiUrl}/api/get-scores-by-student/${studentId}`,
  //       { headers }
  //     );

  //     const filteredScores = response.data.scores.filter(
  //       (score) => score.marksObtained !== undefined
  //     );

  //     console.log("Filtered data:", {
  //       ...response.data,
  //       scores: filteredScores,
  //     });

  //     if (filteredScores.length === 0) {
  //       throw new Error("No scores found for the student");
  //     }

  //     const scoresWithPositions = await Promise.all(
  //       filteredScores.map(async (score) => {
  //         const { examId, subjectId } = score;

  //         if (!examId || !subjectId) {
  //           console.error(
  //             "Exam ID or Subject ID not found for a score:",
  //             score
  //           );
  //           return { ...score, position: 0 };
  //         }

  //         const allStudentsData = await fetchAllStudentsData(
  //           examId._id,
  //           subjectId._id
  //         );

  //         const sortedStudents = allStudentsData.sort(
  //           (a, b) => b.marksObtained - a.marksObtained
  //         );

  //         const studentPosition =
  //           sortedStudents.findIndex(
  //             (student) => student.studentId?._id === studentId
  //           ) + 1;

  //         console.log(
  //           `Position of current student for Subject ${subjectId._id} and Exam ${examId._id}:`,
  //           studentPosition
  //         );

  //         return {
  //           ...score,
  //           position: studentPosition,
  //         };
  //       })
  //     );

  //     return {
  //       ...response.data,
  //       scores: scoresWithPositions,
  //     };
  //   } catch (error) {
  //     console.error("Error fetching student data:", error);
  //     throw new Error("Failed to fetch student data");
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch student data
        const studentData = await fetchStudentData(studentId);

        // Set the student data in state
        setStudentData(studentData);

        setLoading(false);
      } catch (error) {
        // Handle errors
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();

    console.log("Student ID in useEffect:", studentId);
  }, [studentId]);

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
        `${apiUrl}/api/get-scores-by-student/${studentId}`,
        { headers }
      );

      const filteredScores = response.data.scores.filter(
        (score) =>
          (score.marksObtained !== undefined || score.marksObtained === 0) &&
          score.examId.name.toUpperCase() === "SECOND TERM"
      );

      if (filteredScores.length === 0) {
        throw new Error("No second term scores found for the student");
      }

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

      console.log("Scores with Positions:", scoresWithPositions); // Log scores with positions

      // Make sure scoresWithPositions is an array with at least one element
      if (scoresWithPositions && scoresWithPositions.length > 0) {
        return scoresWithPositions;
      } else {
        throw new Error("No scores available");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      throw new Error("Failed to fetch student data");
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
        `${apiUrl}/api/get-psy-by-student/${studentId}`,
        { headers }
      );

      console.log("Original data:", response.data);

      return { ...response.data };
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);

  //     try {
  //       const data = await fetchStudentData(studentId);
  //       setStudentData(data);

  //       setLoading(false);
  //     } catch (error) {
  //       setError("Failed to fetch student data");
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();

  //   console.log("Student ID in useEffect:", studentId);
  // }, [studentId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await fetchPsyData(studentId);
        console.log("PsyData:", data); // Add this line to check the data
        setPsyData(data);

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
  console.log("New Student Data:", studentData); // Log studentData to check its structure

  // const totalMarksObtained = studentData?.scores?.reduce(
  //   (total, score) => total + (score.marksObtained || 0),
  //   0
  // );
  // console.log("Total Marks Obtained:", totalMarksObtained);

  let totalMarksObtained = 0;

  if (studentData && Array.isArray(studentData)) {
    totalMarksObtained = studentData.reduce(
      (total, score) => total + (score.marksObtained || 0),
      0
    );
  }

  console.log("Total Marks Obtained:", totalMarksObtained); // Log totalMarksObtained

  // const totalMarks = studentData?.scores
  //   ? studentData.scores.length * 100 // Assuming 100 marks per subject
  //   : 0;
  const totalMarks = studentData ? studentData.length * 100 : 0;

  // const averageMarks = studentData?.scores
  //   ? (
  //       (studentData.scores.reduce(
  //         (acc, score) => acc + (score.marksObtained || 0),
  //         0
  //       ) /
  //         totalMarks) *
  //       100
  //     ).toFixed(1)
  //   : 0;

  const averageMarks = totalMarks
    ? ((totalMarksObtained / totalMarks) * 100).toFixed(1)
    : 0;

  // const calculateGrade = (comment) => {
  //   // Use your existing gradeDefinitions to find a grade with a similar comment
  //   const matchingGrade = gradeDefinitions.find((grade) =>
  //     comment.toLowerCase().includes(grade.comment.toLowerCase())
  //   );

  //   // Return the grade if a matching grade is found
  //   return matchingGrade ? matchingGrade.grade : "-";
  // };

  const calculateGrade = (comment) => {
    // Use your existing gradeDefinitions to find a grade with a similar comment
    const matchingGrade = gradeDefinitions.find((grade) =>
      comment.toLowerCase().includes(grade.comment.toLowerCase())
    );

    // Return the grade if a matching grade is found
    return matchingGrade ? matchingGrade.grade : "-";
  };

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

  //   // Check if there are subjects with valid grades
  //   const subjectsWithGrades = studentData?.scores?.filter(
  //     (score) => score?.marksObtained !== undefined
  //   );

  //   if (!subjectsWithGrades || subjectsWithGrades.length === 0) {
  //     return "N/A";
  //   }

  //   subjectsWithGrades.forEach((score) => {
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

  //   if (
  //     totalMarksObtained === 0 ||
  //     totalGradeValues === 0 ||
  //     totalSubjects === 0
  //   ) {
  //     return "N/A";
  //   }

  //   const averageGradeValue = totalGradeValues / totalSubjects;

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

  //   // Ensure the result is a numeric value
  //   const result = parseFloat(averageGradeValue.toFixed(1));

  //   // Return the numeric value instead of a string
  //   return isNaN(result) ? "N/A" : result;
  // };
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

  //   // Check if there are subjects with valid grades
  //   const subjectsWithGrades = studentData?.scores?.filter(
  //     (score) => score?.marksObtained !== undefined
  //   );

  //   if (!subjectsWithGrades || subjectsWithGrades.length === 0) {
  //     return "N/A";
  //   }

  //   subjectsWithGrades.forEach((score) => {
  //     const gradeValue = gradeToValueMap[calculateGrade(score?.comment)];
  //     const marksObtained = score?.marksObtained;

  //     if (
  //       !isNaN(gradeValue) &&
  //       gradeValue !== undefined &&
  //       !isNaN(marksObtained) &&
  //       marksObtained !== undefined
  //     ) {
  //       totalGradeValues += gradeValue;
  //       totalMarksObtained += marksObtained;
  //       totalSubjects += 1;
  //     }
  //   });

  //   if (
  //     totalMarksObtained === 0 ||
  //     totalGradeValues === 0 ||
  //     totalSubjects === 0
  //   ) {
  //     return "N/A";
  //   }

  //   const averageGradeValue = totalMarksObtained / totalSubjects;

  //   if (isNaN(averageGradeValue)) {
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

  //   return averageGrade;
  // };

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

  //   // Check if there are subjects with valid grades
  //   const subjectsWithGrades = studentData?.scores?.filter(
  //     (score) => score?.marksObtained !== undefined
  //   );

  //   if (!subjectsWithGrades || subjectsWithGrades.length === 0) {
  //     console.log("No subjects with valid grades found.");
  //     return "N/A";
  //   }

  //   subjectsWithGrades.forEach((score) => {
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
  //       totalMarksObtained += marksObtained;
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
  //     console.log("Unable to calculate average grade.");
  //     return "N/A";
  //   }

  //   const averageGradeValue = totalMarksObtained / totalSubjects;

  //   console.log("Average Grade Value:", averageGradeValue);

  //   if (isNaN(averageGradeValue)) {
  //     console.log("Average grade value is NaN.");
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

  //   console.log("Average Grade:", averageGrade);

  //   return averageGrade;
  // };
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

  //   // Check if there are subjects with valid grades
  //   const subjectsWithGrades = studentData?.filter(
  //     (score) => score?.marksObtained !== undefined
  //   );

  //   if (!subjectsWithGrades || subjectsWithGrades.length === 0) {
  //     console.log("No subjects with valid grades found.");
  //     return "N/A";
  //   }

  //   subjectsWithGrades.forEach((score) => {
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
  //       totalMarksObtained += marksObtained;
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
  //     console.log("Unable to calculate average grade.");
  //     return "N/A";
  //   }

  //   const averageGradeValue = totalGradeValues / totalSubjects;

  //   console.log("Average Grade Value:", averageGradeValue);

  //   if (isNaN(averageGradeValue)) {
  //     console.log("Average grade value is NaN.");
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

  //   console.log("Average Grade:", averageGrade);

  //   return averageGrade;
  // };
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

  //   // Check if there are subjects with valid grades
  //   const subjectsWithGrades = studentData?.filter(
  //     (score) => score?.marksObtained !== undefined
  //   );

  //   if (!subjectsWithGrades || subjectsWithGrades.length === 0) {
  //     console.log("No subjects with valid grades found.");
  //     return "N/A";
  //   }

  //   subjectsWithGrades.forEach((score) => {
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
  //       totalMarksObtained += marksObtained;
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
  //     console.log("Unable to calculate average grade.");
  //     return "N/A";
  //   }

  //   const averageGradeValue = totalGradeValues / totalSubjects;

  //   console.log("Average Grade Value:", averageGradeValue);

  //   if (isNaN(averageGradeValue)) {
  //     console.log("Average grade value is NaN.");
  //     return "N/A";
  //   }

  //   return averageGradeValue.toFixed(15); // Adjust the number of decimal places as needed
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
    const subjectsWithGrades = studentData?.filter(
      (score) => score?.marksObtained !== undefined
    );

    if (!subjectsWithGrades || subjectsWithGrades.length === 0) {
      console.log("No subjects with valid grades found.");
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
        totalMarksObtained += marksObtained;
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
      console.log("Unable to calculate average grade.");
      return "N/A";
    }

    const averageGradeValue = totalGradeValues / totalSubjects;

    console.log("Average Grade Value:", averageGradeValue);

    if (isNaN(averageGradeValue)) {
      console.log("Average grade value is NaN.");
      return "N/A";
    }

    return averageGradeValue.toFixed(2);
  };

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Box width="100%" overflow="auto">
          <body className="print-button-container">
            <button onClick={handlePrint}> Print this out!</button>
            <button onClick={handlePrintInNewTab}>Print in New Tab</button>
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
                    src={`https://edupros.s3.amazonaws.com/${accountSettings.schoolLogo}`}
                    style={{
                      width: "200px",
                      height: "180px",
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
                    {data?.classname || ""} Second Term Report Card
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
                      {data?.studentName || ""}
                    </span>
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
                    {/*<p style={{ color: "#042954" }}>
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
                      </p>*/}
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
                        value={totalMarksObtained}
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
                        value={
                          typeof calculateAverageGrade() === "number"
                            ? calculateAverageGrade().toFixed(2) // Assuming you want to display up to two decimal places
                            : calculateAverageGrade()
                        }
                      />
                    </p>
                  </div>
                </div>
              </div>
              <table
                className="table"
                id="customers"
                style={{ width: "100% !important" }}
              >
                <thead style={{ width: "100% !important" }}>
                  <tr style={{ width: "100% !important" }}>
                    <th scope="col">S/No</th>
                    <th scope="col" style={{ textAlign: "left" }}>
                      Subject
                    </th>
                    <th scope="col">Test</th>
                    <th scope="col">Exam</th>
                    <th scope="col">Obtained Marks</th>
                    <th scope="col">Position</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Remark</th>
                  </tr>
                </thead>
                {/*}  <tbody style={{ width: "100% !important" }}>
                  {studentData?.scores &&
                    studentData.scores
                      .filter((score) => score.marksObtained !== undefined)
                      .map((score, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{score?.subjectName || "-"}</td>
                            <td>{score?.testscore || "-"}</td>
                            <td>{score?.examscore || "-"}</td>
                            <td>{score?.marksObtained || "-"}</td>
                            <td>{score?.position || "-"}</td>
                            <td>{calculateGrade(score?.comment) || "-"}</td>
                            <td>{score?.comment || "-"}</td>
                          </tr>
                        );
                      })}
                    </tbody>*/}

                <tbody style={{ width: "100% !important" }}>
                  {studentData &&
                    studentData?.map((score, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{score?.subjectName || "-"}</td>{" "}
                          <td>{score?.testscore || "-"}</td>{" "}
                          <td>{score?.examscore || "-"}</td>{" "}
                          <td>{score?.marksObtained || "-"}</td>
                          <td>{score?.position || "-"}</td>
                          <td>{calculateGrade(score?.comment) || "-"}</td>
                          <td>{score?.comment || "-"}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              <td style={{ verticalAlign: "top", width: "100%" }}>
                {/* Second Sub-Table for Affective and Psychomotor Report */}
                <table
                  className="table second-sub-table"
                  id="customersreport"
                  style={{ width: "100%" }}
                >
                  <colgroup>
                    <col style={{ width: "33.33%" }} />
                    <col style={{ width: "33.33%" }} />
                    <col style={{ width: "33.33%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th
                        colSpan="3"
                        style={{ textAlign: "center", fontSize: "18px" }}
                      >
                        AFFECTIVE AND PSYCHOMOTOR REPORT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th></th>
                      <th style={{ width: "33.33%" }}>Work Habits</th>
                      <th style={{ width: "33.33%" }}>RATINGS</th>
                    </tr>
                    {psyData?.scores?.map((score, index) => (
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
                    ))}
                  </tbody>
                </table>
              </td>

              <div style={{ color: "#042954", fontSize: "16px" }}>
                KEY TO GRADES A (DISTINCTION)=70% &amp; ABOVE , C
                (CREDIT)=55-69% , P(PASS)=40-54% , F(FAIL)=BELOW 40%
              </div>
              <div class="remarksbox" style={{ padding: "10px 0" }}>
                <table class="table">
                  <tbody>
                    <tr>
                      <th>CLASS TEACHER'S REMARK</th>
                      {psyData?.scores?.map((score, index) => (
                        <div key={index}>
                          <td colspan="2">{score.remarks}</td>
                        </div>
                      ))}
                    </tr>
                    <tr>
                      <th>PRINCIPAL'S REMARK</th>
                      {psyData?.scores?.map((score, index) => (
                        <div key={index}>
                          <td colspan="2">{score.premarks}</td>
                        </div>
                      ))}
                    </tr>
                    <tr>
                      <th>PRINCIPAL'S NAME</th>
                      <td>{schoolSettings.principalName}</td>
                      <td style={{ textAlign: "right" }}>
                        <img
                          // src={`https://hlhs-98d6f8c9ac3a.herokuapp.com/uploads/${schoolSettings.signature}`}
                          src={`${apiUrl}/uploads/${schoolSettings.signature}`}
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
