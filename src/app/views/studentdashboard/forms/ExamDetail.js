import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Paper,
  Grid,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  FormControlLabel,
  Radio,
  RadioGroup,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const ExamDetail = () => {
  const { id } = useParams(); // Get the id parameter from the route
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [totalMark, setTotalMark] = useState(0); // State for total marks
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [score, setScore] = useState(null);

  const handleOptionChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const navigate = useNavigate();

  // const handleSubmitExam = async () => {
  //   try {
  //     // Trim the examId to remove leading/trailing whitespace
  //     const trimmedExamId = id.trim();

  //     // You can make an API call to send the answers to your server
  //     const token = localStorage.getItem("jwtToken");
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };

  //     // Prepare the data to send
  //     const data = {
  //       examId: trimmedExamId, // Use the trimmed exam ID
  //       answers: answers,
  //     };

  //     // Send a POST request to your server endpoint to handle the submitted exam
  //     const response = await axios.post(
  //       "http://localhost:3003/api/exams/submit", // Replace with your server endpoint
  //       data,
  //       { headers }
  //     );

  //     if (response.status === 200) {
  //       // Exam submission was successful
  //       console.log("Exam submitted successfully");
  //       // You can also handle any success actions here, such as showing a success message.
  //       // Redirect the user to the dashboard
  //       navigate("/student/dashboard/default");
  //     } else {
  //       // Exam submission failed
  //       console.error("Failed to submit the exam");
  //       // You can handle the error or show an error message to the user.
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while submitting the exam:", error);
  //     // Handle errors, e.g., network issues or other errors
  //   }
  // };
  const calculateScore = () => {
    const score = questions.reduce((totalScore, question) => {
      const studentAnswer = answers[question._id];
      console.log(`Question ID: ${question._id}`);
      console.log(`Student's Answer: ${studentAnswer}`);
      console.log(`Correct Answer: ${question.correctAnswer}`);
      if (studentAnswer === question.correctAnswer) {
        console.log(`Correct Answer! Adding ${question.mark} to the score.`);
        return totalScore + question.mark;
      }
      return totalScore;
    }, 0);

    console.log(`Final Score: ${score}`);
    setScore(score);
  };

  const getLoggedInUserId = () => {
    const jwtToken = localStorage.getItem("jwtToken");

    console.log(jwtToken);
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      console.log("Decoded token:", decodedToken);
      return decodedToken.user._id; // Use 'decodedToken.user._id' for user ID
    }
    return null; // Return null if the user is not authenticated or the token is invalid
  };

  const handleSubmitExam = async () => {
    try {
      // Trim the examId to remove leading/trailing whitespace
      const trimmedExamId = id.trim();
      const userId = getLoggedInUserId();

      // You can make an API call to send the answers to your server
      const token = localStorage.getItem("jwtToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Prepare the data to send
      const data = {
        examId: trimmedExamId, // Use the trimmed exam ID
        answers: answers,
        userId: userId, // Include the user ID
      };

      // Send a POST request to your server endpoint to handle the submitted exam
      const response = await axios.post(
        "http://localhost:3003/api/exams/submit", // Replace with your server endpoint
        data,
        { headers }
      );

      if (response.status === 200) {
        // Exam submission was successful
        console.log("Exam submitted successfully");
        // You can also handle any success actions here, such as showing a success message.
        // Redirect the user to the dashboard
        calculateScore();
        // navigate("/student/dashboard/manage-online-exam");
      } else {
        // Exam submission failed
        console.error("Failed to submit the exam");
        // You can handle the error or show an error message to the user.
      }
    } catch (error) {
      console.error("An error occurred while submitting the exam:", error);
      // Handle errors, e.g., network issues or other errors
    }
  };

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/get-exam/${id}`
        );
        setExam(response.data);

        // Fetch the questions for the exam
        const token = localStorage.getItem("jwtToken"); // Fetch the authentication token from local storage

        // Include the token in the request headers for authorization
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const questionsResponse = await axios.get(
          `http://localhost:3003/api/questions/${id}`,

          { headers } // Include the headers in the request
        );
        const questionsData = questionsResponse.data;

        // Log the questions data to the console for debugging
        console.log("Questions Data:", questionsData);

        // Calculate the total mark based on the questions
        const calculatedTotalMark = questionsData.reduce(
          (total, question) => total + parseInt(question.mark),
          0
        );
        setTotalMark(calculatedTotalMark);
      } catch (error) {
        console.error("Error fetching exam or questions:", error);
      }
    };

    fetchExamDetails();
  }, [id]);

  if (!exam) {
    return <div>Loading...</div>;
  }
  // const renderQuestions = () => {
  //   if (showQuestions) {
  //     return (
  //       <div>
  //         <Typography variant="h5">Questions</Typography>
  //         <ol>
  //           {questions.map((question, index) => (
  //             <li key={question._id}>
  //               <p>{`Question ${index + 1}: ${question.questionTitle}`}</p>
  //               <p>{`Marks: ${question.mark}`}</p>
  //               {question.options && question.options.length > 0 && (
  //                 <div>
  //                   <Typography variant="subtitle1">Options:</Typography>
  //                   <ul>
  //                     {question.options.map((option, optionIndex) => (
  //                       <li key={optionIndex}>{option.option}</li>
  //                     ))}
  //                   </ul>
  //                 </div>
  //               )}
  //               {question.questionType === "true_false" && (
  //                 <div>
  //                   <Typography variant="subtitle1">True or False:</Typography>
  //                   <ul>
  //                     <li>True</li>
  //                     <li>False</li>
  //                   </ul>
  //                 </div>
  //               )}
  //             </li>
  //           ))}
  //         </ol>
  //       </div>
  //     );
  //   }

  //   return null;
  // };
  const renderQuestions = () => {
    if (showQuestions) {
      return (
        <div>
          <Grid container spacing={2}>
            {questions.map((question, index) => (
              <Grid item xs={12} key={question._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {`Question ${index + 1}: ${question.questionTitle}`}
                    </Typography>
                    {/*}  <Typography variant="subtitle1">{`Marks: ${question.mark}`}</Typography>*/}
                    {question.options && question.options.length > 0 && (
                      <div>
                        <RadioGroup
                          name={`question_${question._id}`}
                          value={answers[question._id] || ""}
                          onChange={(e) =>
                            handleOptionChange(question._id, e.target.value)
                          }
                        >
                          {question.options.map((option, optionIndex) => (
                            <FormControlLabel
                              key={optionIndex}
                              value={option.option}
                              control={<Radio />}
                              label={option.option}
                            />
                          ))}
                        </RadioGroup>
                      </div>
                    )}
                    {question.questionType === "true_false" && (
                      <div>
                        <Typography variant="subtitle1">
                          True or False:
                        </Typography>
                        <RadioGroup
                          name={`question_${question._id}`}
                          value={answers[question._id] || ""}
                          onChange={(e) =>
                            handleOptionChange(question._id, e.target.value)
                          }
                        >
                          <FormControlLabel
                            value="True"
                            control={<Radio />}
                            label="True"
                          />
                          <FormControlLabel
                            value="False"
                            control={<Radio />}
                            label="False"
                          />
                        </RadioGroup>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      );
    }

    return null;
  };
  const fetchQuestionsForExam = async () => {
    try {
      // Fetch the JWT token from local storage
      const token = localStorage.getItem("jwtToken");

      // Include the token in the request headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(
        `http://localhost:3003/api/questions/${id}`,
        {
          method: "GET",
          headers, // Include the headers in the request
        }
      );

      if (response.ok) {
        const questionsData = await response.json();
        setQuestions(questionsData);
        setShowQuestions(true);
      } else {
        console.error("Failed to fetch questions");
      }
    } catch (error) {
      console.error("An error occurred while fetching questions:", error);
    }
  };
  const handleStartExam = () => {
    fetchQuestionsForExam(); // Call the new function to fetch questions
  };

  return (
    <div>
      <Typography variant="h5">Exam Details</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>Exam Title</b>
              </TableCell>
              <TableCell>{exam.title}</TableCell>
              <TableCell>
                <b>Date</b>
              </TableCell>
              <TableCell>{exam.date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Class</b>
              </TableCell>
              <TableCell>{exam.className}</TableCell>
              <TableCell>
                <b>Time</b>
              </TableCell>
              <TableCell>{`${exam.fromTime} - ${exam.toTime}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Exam Instruction</b>
              </TableCell>
              <TableCell>{exam.instruction}</TableCell>
              <TableCell>
                <b>Total Mark</b>
              </TableCell>
              <TableCell>{totalMark}</TableCell>
            </TableRow>
            {/* Add more details here */}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={handleStartExam}>Start Exam</Button>
      {renderQuestions()}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitExam}
        style={{ display: showQuestions ? "block" : "none" }}
      >
        Submit Exam
      </Button>
      {score !== null && (
        <Typography variant="h6">
          Your Score: {score} out of {totalMark}
        </Typography>
      )}
    </div>
  );
};

export default ExamDetail;
