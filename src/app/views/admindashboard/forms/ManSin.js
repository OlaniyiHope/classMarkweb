import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Adjust the import path
import IconButton from "@mui/material/IconButton";

import useFetch from "../../../../hooks/useFetch";
import EditQuestionModal from "./EditQuestionModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";


const ManSin = () => {
  const location = useLocation();
  const parts = location.pathname.split("/");
  const id = parts[3];
  const { currentSession } = useContext(SessionContext);


  console.log(currentSession._id)
  console.log(id)
  const [questionType, setQuestionType] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL.trim();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const [error, setError] = useState(null); // Error state

  const [totalMark, setTotalMark] = useState(0);

  // ...rest of your code

  const [numberOfOptions, setNumberOfOptions] = useState(0);
  const [optionFields, setOptionFields] = useState([]);
  const [possibleAnswers, setPossibleAnswers] = useState();
  const [mark, setMark] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);
  const [editQuestion, setEditQuestion] = useState(null);


  const [onscreenMarking, setOnscreenMarking] = useState(""); // Add this line to declare onscreenMarking and setOnscreenMarking

  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);


  
  // State for total marks
  // const { data, loading, error } = useFetch(`/get-exam-by-id/${id}/${currentSession._id}`);
  // console.log("Data", data)

  useEffect(() => {
    // Define the API URL directly with the hardcoded values
    const apiUrlT = `${apiUrl}/api/get-exam-by-id/${id}/${currentSession._id}`

    // Async function to fetch data
    const fetchExamById = async () => {
      try {
        const response = await fetch(apiUrlT);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Fetched data:", result); // For debugging
        setData(result); // Set the data on success
        setLoading(false)
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(true)
      } 
    };

    fetchExamById();
  }, [apiUrl, id, currentSession]);




  useEffect(() => {
    const total = calculateTotalMarks();
    setTotalMark(total);
  }, [questions]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch the JWT token from local storage
        const token = localStorage.getItem("jwtToken");

        // Include the token in the request headers
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`${apiUrl}/api/questions/${id}`, {
          method: "GET",
          headers, // Include the headers in the request
        });

        if (response.ok) {
          const questionsData = await response.json();
          setQuestions(questionsData);
        } else {
          console.error("Failed to fetch questions");
        }
      } catch (error) {
        console.error("An error occurred while fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [id]);

  // Function to calculate total marks

  const confirmDelete = async () => {
    if (deleteQuestionId) {
      // Delete the question here
      // Add your delete logic here

      // After deleting, close the modal
      setDeleteQuestionId(null);
    }
  };
  const handleEditQuestion = (question) => {
    setEditQuestion(question);
    console.log("editQ", question, editQuestion)
  };
  const updateQuestion = (updatedQuestion) => {
    // Update the question in your state
    const updatedQuestions = questions.map((question) => {
      if (question._id === updatedQuestion._id) {
        return updatedQuestion;
      }
      return question;
    });

    setQuestions(updatedQuestions);
  };
  // Function to calculate total marks
  const calculateTotalMarks = () => {
    // Use map to extract the mark as an integer and then sum them up
    return questions.reduce(
      (total, question) => total + parseInt(question.mark),
      0
    );
  };
  // Update total marks whenever questions change


  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
    setMark("");
    setQuestionTitle("");
  };

  const handleNumberOfOptionsChange = (event) => {
    setNumberOfOptions(parseInt(event.target.value));
  };
  const addQuestion = (newQuestion) => {
    console.log("Adding question:", newQuestion);
    const newMark = parseInt(newQuestion.mark);
    console.log("New Mark:", newMark);
    console.log("Previous Questions:", questions);
    setQuestions([...questions, newQuestion]);
    console.log("Updated Questions:", questions);
    setTotalMark((prevTotalMark) => prevTotalMark + newMark);
  };

  const handleDeleteQuestion = async (questionId) => {
    console.log("Deleting question with ID:", questionId); // Add this line for debugging

    try {
      // Fetch the JWT token from local storage
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(`${apiUrl}/api/questions/${questionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Question deleted successfully
        console.log("Question deleted successfully");

        // Update your local state to remove the deleted question
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question._id !== questionId)
        );

        // Set the questionId to null to close the modal
        setDeleteQuestionId(null);
      } else {
        // Handle errors
        console.error("Failed to delete the question");
      }
    } catch (error) {
      console.error("An error occurred while deleting the question:", error);
    }
  };



  // const submitQuestion = async () => {
  //   try {
  //     // Fetch the JWT token from wherever you've stored it (e.g., local storage)
  //     const token = localStorage.getItem("jwtToken");

  //     // Construct the questionData object based on questionType
  //     const questionData = {
  //       questionType: questionType,
  //       // type: questionType,
  //       mark, // Set the mark
  //       // question_title: questionTitle, // Set the question title
  //       questionTitle,
  //       examId: id, // Set the examId
  //       possibleAnswers: possibleAnswers,

  //     };

  //     if (questionType === "multiple_choice") {
  //       // For multiple-choice questions, add options
  //       questionData.options = optionFields.map((option, i) => ({
  //         option: document.getElementById(`option${i + 1}`).value,
  //         isCorrect: document.getElementById(`correct${i + 1}`).checked,
  //       }));
  //     } else if (questionType === "true_false") {
  //       // For True/False questions, add the correctAnswer
  //       questionData.correctAnswer = document.querySelector(
  //         'input[name="answer"]:checked'
  //       ).value;
  //     } else if (questionType === "fill_in_the_blanks") {
  //       // Additional logic for fill in the blanks questions
  //       questionData.possible_answers = possibleAnswers;
  //     }

  //     const response = await fetch(`${apiUrl}/api/questions`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`, // Include the JWT token in the headers
  //       },
  //       body: JSON.stringify(questionData),
  //     });

  //     if (response.ok) {
  //       // Question submitted successfully, you can handle the response here
  //       console.log("Question submitted successfully");
  //       addQuestion(questionData);
  //     } else {
  //       // Handle errors
  //       console.error("Failed to submit the question");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while submitting the question:", error);
  //   }
  // };
  const submitQuestion = async () => {
    try {
      // Fetch the JWT token from wherever you've stored it (e.g., local storage)
      const token = localStorage.getItem("jwtToken");

      // Construct the questionData object based on questionType
      const questionData = {
        questionType: questionType,
        mark, // Set the mark
        questionTitle,
        examId: id, // Set the examId
        possibleAnswers: possibleAnswers,
      };

      if (questionType === "multiple_choice") {
        // For multiple-choice questions, add options
        questionData.options = optionFields.map((option, i) => ({
          option: document.getElementById(`option${i + 1}`).value,
          isCorrect: document.getElementById(`correct${i + 1}`).checked,
        }));
      } else if (questionType === "true_false") {
        // For True/False questions, add the correctAnswer
        questionData.correctAnswer = document.querySelector(
          'input[name="answer"]:checked'
        ).value;
      } else if (questionType === "fill_in_the_blanks") {
        // Additional logic for fill in the blanks questions
        questionData.possibleAnswers = possibleAnswers;
      } else if (questionType === "theory") {
        // Additional logic for theory questions
        questionData.onscreenMarking = onscreenMarking;
      }

      console.log("sub questiondata",questionData)

      if (!questionType || !questionTitle || !mark ) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      

      const response = await fetch(`${apiUrl}/api/questions/${currentSession._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the headers
        },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        // Question submitted successfully, you can handle the response here
        console.log("Question submitted successfully");
        toast.success("Question submitted successfully");

        addQuestion(questionData);
      } else {
        // Handle errors
        console.error("Failed to submit the question");
        toast.error("Failed to submit the question");

      }
    } catch (error) {
      console.error("An error occurred while submitting the question:", error);
      toast.error("An error occurred while submitting the question");

    }
  };

  const generateOptions = () => {
    const options = Array.from({ length: numberOfOptions }, (_, i) => (
      <div key={i} className="form-group options">
        <label className="col-sm-3 control-label">Option {i + 1}</label>
        <div className="col-sm-8">
          <div className="input-group" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              label={`Option ${i + 1}`}
              required
              id={`option${i + 1}`}
            />
            <div className="input-group-addon" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                name="correct_answers[]"
                value={`correct${i + 1}`}
                id={`correct${i + 1}`}
              />
            </div>
          </div>
        </div>
      </div>
    ));
    setOptionFields(options);
  };
  
  const renderQuestionFields = () => {
    if (questionType === "multiple_choice") {
      console.log("Question Type:", questionType);
      // ...rest of your code

      return (
        <form
          className="form-horizontal form-groups-bordered validate"
          target="_top"
          accept-charset="utf-8"
        >
          <input type="hidden" name="type" value="multiple_choice" />
          <div className="form-group">
            <label className="col-sm-3 control-label">Mark</label>
            <div className="col-sm-8">
              <TextField
                type="number"
                variant="outlined"
                fullWidth
                name="mark"
                value={mark} // Use the mark state
                onChange={(e) => setMark(e.target.value)}
                required
                inputProps={{ min: "0" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Question Title</label>
            <div className="col-sm-8">
              <textarea
                name="question_title"
                className="form-control"
                rows="4" // Adjust the number of rows as needed
                value={questionTitle} // Use the questionTitle state
                onChange={(e) => setQuestionTitle(e.target.value)} // Update the questionTitle state
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-3 control-label">Number of Options</label>
            <div className="col-sm-8">
              <div className="input-group">
                <TextField
                  type="number"
                  fullWidth
                  variant="outlined"
                  onChange={handleNumberOfOptionsChange}
                  value={numberOfOptions}
                  required
                />
                <div className="input-group-addon">
                  <Button onClick={generateOptions} variant="contained">
                    Generate Options
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {optionFields}
          <div className="form-group">
            <div className="col-sm-12">
              <Button
                type="submit"
                variant="contained"
                onClick={(event) => {
                  event.preventDefault();
                  const questionData = {
                    type: questionType,
                    mark: mark, //
                    question_title: questionTitle,
                  };

                  // ...rest of your code
                  console.log("question Data:", questionData);

                  submitQuestion(questionData);
                  console.log("question Data:", questionData);
                }}
              >
                Add Question
              </Button>
            </div>
          </div>
        </form>
      );
    } else if (questionType === "true_false") {
      // ...rest of your code

      return (
        <form
          className="form-horizontal form-groups-bordered validate"
          target="_top"
          accept-charset="utf-8"
        >
          <input type="hidden" name="type" value="true_false" />
          <div className="form-group">
            <label className="col-sm-3 control-label">Mark</label>
            <div className="col-sm-8">
              <TextField
                type="number"
                variant="outlined"
                fullWidth
                name="mark"
                required
                value={mark} // Use the mark state
                onChange={(e) => setMark(e.target.value)}
                inputProps={{ min: "0" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Question Title</label>
            <div className="col-sm-8">
              <textarea
                name="question_title"
                className="form-control"
                rows="4"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Answer</label>
            <div className="col-sm-8">
              <div>
                <label>
                  <input type="radio" name="answer" value="true" />
                  True
                </label>
              </div>
              <div>
                <label>
                  <input type="radio" name="answer" value="false" />
                  False
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <Button
                type="submit"
                variant="contained"
                onClick={(event) => {
                  event.preventDefault();
                  const questionData = {
                    type: questionType,
                    mark: mark, // Extract the mark from the state
                    question_title: questionTitle, // Extract the question title from the state
                    // Add other fields as needed based on the question type
                  };
                  console.log("Question Type:", questionType);
                  console.log("question Data:", questionData);
                  // ...rest of your code

                  submitQuestion(questionData);
                  console.log("question Data:", questionData);
                }}
              >
                Add Question
              </Button>
            </div>
          </div>
        </form>
      );
    }

    // Inside the renderQuestionFields() function
    else if (questionType === "fill_in_the_blanks") {
      return (
        <form
          className="form-horizontal form-groups-bordered validate"
          target="_top"
          accept-charset="utf-8"
        >
          <input type="hidden" name="type" value="fill_in_the_blanks" />
          <div className="form-group">
            <label className="col-sm-3 control-label">Mark</label>
            <div className="col-sm-8">
              <TextField
                type="number"
                variant="outlined"
                fullWidth
                name="mark"
                required
                value={mark}
                onChange={(e) => setMark(e.target.value)}
                inputProps={{ min: "0" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Question Title</label>
            <div className="col-sm-8">
              <textarea
                name="question_title"
                className="form-control"
                rows="4"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Possible Answers</label>
            <p style={{ color: "black" }}>
              (use commas to separate the possible answers)
            </p>
            <div className="col-sm-8">
              <TextField
                type="text"
                variant="outlined"
                fullWidth
                name="possibleAnswers"
                required
                multiline
                rows={4}
                value={possibleAnswers}
                onChange={(e) => setPossibleAnswers(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <Button
                type="submit"
                variant="contained"
                onClick={(event) => {
                  event.preventDefault();
                  const questionData = {
                    type: questionType,
                    mark: mark,
                    question_title: questionTitle,
                    possibleAnswers: possibleAnswers,
                  };
                  console.log("Question Type:", questionType);
                  console.log("question Data:", questionData);
                  submitQuestion(questionData);
                  console.log("question Data:", questionData);
                }}
              >
                Add Question
              </Button>
            </div>
          </div>
        </form>
      );
    }
    // Inside the renderQuestionFields() function
    else if (questionType === "theory") {
      return (
        <form
          className="form-horizontal form-groups-bordered validate"
          target="_top"
          accept-charset="utf-8"
        >
          <input type="hidden" name="type" value="theory" />
          <div className="form-group">
            <label className="col-sm-3 control-label">Mark</label>
            <div className="col-sm-8">
              <TextField
                type="number"
                variant="outlined"
                fullWidth
                name="mark"
                required
                value={mark}
                onChange={(e) => setMark(e.target.value)}
                inputProps={{ min: "0" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Question Title</label>
            <div className="col-sm-8">
              <textarea
                name="question_title"
                className="form-control"
                rows="4"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                required
              />
            </div>
          </div>
          {/*}   <div className="form-group">
            <label className="col-sm-3 control-label">Onscreen Marking</label>
            <div className="col-sm-8">
              <TextField
                type="text"
                variant="outlined"
                fullWidth
                name="onscreen_marking"
                required
                value={onscreenMarking}
                onChange={(e) => setOnscreenMarking(e.target.value)}
              />
            </div>
      </div>*/}
          <div className="form-group">
            <div className="col-sm-12">
              <Button
                type="submit"
                variant="contained"
                onClick={(event) => {
                  event.preventDefault();
                  const questionData = {
                    type: questionType,
                    mark: mark,
                    question_title: questionTitle,
                    onscreen_marking: onscreenMarking,
                  };
                  submitQuestion(questionData);
                }}
              >
                Add Question
              </Button>
            </div>
          </div>
        </form>
      );
    }

    // Inside the submitQuestion() function
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Render error state
  }

  return (
    <div style={{ marginTop: "50px" }}>
      <ToastContainer />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper>
            <div className="panel panel-primary" data-collapsed="0">
              <div className="panel-heading">
                <div
                  className="panel-title"
                  style={{
                    padding: "12px",
                    backgroundColor: "#f2f4f8",
                    color: "black",
                  }}
                >
                  <i className="entypo-menu"></i>
                  Question List
                </div>
              </div>
              <div className="panel-body">
                <Table className="table table-bordered">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ textAlign: "center" }} width="5%">
                        <div>#</div>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <div>Type</div>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }} width="50%">
                        <div>Question</div>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }} width="10%">
                        <div>Mark</div>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <div>Options</div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questions.map((question, index) => (
                      <TableRow key={question._id}>
                        <TableCell style={{ textAlign: "center" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", whiteSpace: "normal" }}
                        >
                          {question.questionType}
                        </TableCell>
                        <TableCell style={{ whiteSpace: "normal" }}>
                          {question.questionTitle}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {question.mark}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <IconButton
                            onClick={() => handleEditQuestion(question)}
                            title="Edit"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => setDeleteQuestionId(question._id)}
                            title="Delete"
                          >
                            <DeleteIcon style={{ cursor: "pointer" }} />
                          </IconButton>
                          <DeleteConfirmationModal
                            open={deleteQuestionId === question._id}
                            onClose={() => setDeleteQuestionId(null)}
                            onConfirm={() => handleDeleteQuestion(question._id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {editQuestion && (
                  <EditQuestionModal
                    open={!!editQuestion}
                    onClose={() => setEditQuestion(null)}
                    question={editQuestion}
                    onUpdate={updateQuestion}
                  />
                )}
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper>
            <div className="panel panel-primary" data-collapsed="0">
              <div className="panel-heading">
                <div
                  className="panel-title"
                  style={{
                    padding: "12px",
                    backgroundColor: "#f2f4f8",
                    color: "black",
                  }}
                >
                  <i className="entypo-info-circled"></i>
                  Exam Details
                </div>
              </div>
              <div className="panel-body">
                <Table className="table table-bordered">
                  <TableBody>
                    <TableRow>
                      <TableCell
                        style={{ width: "25%", whiteSpace: "pre-line" }}
                      >
                        <b>Exam Title</b>
                      </TableCell>
                      <TableCell
                        style={{ width: "25%", whiteSpace: "pre-line" }}
                      >
                        {data.title}
                      </TableCell>
                      <TableCell
                        style={{ width: "25%", whiteSpace: "pre-line" }}
                      >
                        <b>Date</b>
                      </TableCell>
                      <TableCell
                        style={{ width: "25%", whiteSpace: "pre-line" }}
                      >
                        {data.date
                          ? new Date(data.date).toLocaleDateString()
                          : ""}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ whiteSpace: "pre-line" }}>
                        <b>Class</b>
                      </TableCell>
                      <TableCell style={{ whiteSpace: "pre-line" }}>
                        {data?.className}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "pre-line" }}>
                        <b>Time</b>
                      </TableCell>
                      <TableCell style={{ whiteSpace: "pre-line" }}>
                        {data.fromTime} - {data.toTime}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ whiteSpace: "pre-line" }}>
                        <b>Section</b>
                      </TableCell>
                      <TableCell style={{ whiteSpace: "pre-line" }}>
                        A
                      </TableCell>
                      <TableCell style={{ whiteSpace: "pre-line" }}>
                        <b>Passing Percentage</b>
                      </TableCell>
                      <TableCell style={{ whiteSpace: "pre-line" }}>
                        {data.percent}%
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ whiteSpace: "pre-line" }}>
                        <b>Subject</b>
                      </TableCell>
                      <TableCell style={{ whiteSpace: "pre-line" }}>
                        {data?.subject}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "pre-line" }}>
                        <b>Total Marks</b>
                      </TableCell>
                      <TableCell style={{ whiteSpace: "pre-line" }}>
                        {totalMark}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </Paper>

          <Paper>
            <div className="panel panel-primary" data-collapsed="0">
              <div className="panel-heading">
                <div
                  className="panel-title"
                  style={{
                    padding: "12px",
                    backgroundColor: "#f2f4f8",
                    color: "black",
                  }}
                >
                  <i className="entypo-plus-circled"></i>
                  Add Question
                </div>
              </div>
              <div className="panel-body">
                <div className="form-group">
                  <label className="col-sm-3 control-label">
                    Question Type
                  </label>
                  <div className="col-sm-8">
                    <Select
                      value={questionType}
                      displayEmpty
                      style={{ width: "100%" }}
                      onChange={handleQuestionTypeChange}
                    >
                      <MenuItem value="" disabled>
                        Select Question Type
                      </MenuItem>
                      <MenuItem value="multiple_choice">
                        Multiple Choice
                      </MenuItem>
                      <MenuItem value="true_false">True Or False</MenuItem>
                      <MenuItem value="fill_in_the_blanks">
                        Fill In The Blanks
                      </MenuItem>
                      <MenuItem value="theory">Theory</MenuItem>
                    </Select>
                  </div>
                </div>
                {renderQuestionFields()}
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ManSin;
