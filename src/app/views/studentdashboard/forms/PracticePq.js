import React, { useState, useEffect } from "react";
import axios from "axios";
import Timer from "./Timer";
import Result from "./Result";
import "./practicepq.css";

const PracticePq = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [duration, setDuration] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [examStarted, setExamStarted] = useState(false); // New state for managing exam start
  const [examFinished, setExamFinished] = useState(false);
  const [result, setResult] = useState(null);
  const [practicePqId, setPracticePqId] = useState(null); // Add state for practicePqId

  const apiUrl = process.env.REACT_APP_API_URL.trim();

  // Fetch subjects from the API on component mount
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/pq/subjects`)
      .then((res) => setSubjects(res.data))
      .catch((err) => console.error(err));
  }, [apiUrl]);

  // Fetch questions when the subject is selected
  useEffect(() => {
    if (selectedSubject) {
      axios
        .get(`${apiUrl}/api/get-practice-questions/${selectedSubject}`)
        .then((res) => {
          console.log(res.data);
          setQuestions(res.data.questions);
          setPracticePqId(res.data._id); // Store practicePqId from response
        })
        .catch((err) => console.error(err));
    }
  }, [selectedSubject, apiUrl]);

  const handleOptionChange = (questionIndex, option) => {
    setAnswers({ ...answers, [questionIndex]: option });
  };

  const handleSubmit = () => {
    console.log("first,", answers);
    axios
      .post(`${apiUrl}/api/submit-practice-questions`, {
        subjectName: selectedSubject,
        answers,
        practicePqId, // Include practicePqId in the request body
      })
      .then((res) => {
        setResult(res.data);
        setExamFinished(true);
      })
      .catch((err) => console.error(err));
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  if (examFinished) {
    return <Result result={result} />;
  }

  return (
    <div className="exam-container">
      <h2>Select Subject and Duration</h2>
      <div>
        <label htmlFor="subject-select">Select Subject:</label>
        <select
          id="subject-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject._id} value={subject.subjectName}>
              {subject.subjectName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="duration-input">Duration (in seconds):</label>
        <input
          id="duration-input"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration in seconds"
        />
      </div>
      <button
        onClick={() => {
          if (duration > 0 && selectedSubject) {
            setExamStarted(true); // Start the exam when the button is clicked
          }
        }}
        disabled={!selectedSubject || duration <= 0}>
        Start Exam
      </button>

      {examStarted && selectedSubject && duration > 0 && (
        <>
          <Timer duration={duration} onTimeUp={handleTimeUp} />
          <form>
            {questions.map((question, index) => (
              <div key={index}>
                <p>{question.title}</p>
                {question.options.map((option, optIndex) => (
                  <div key={optIndex}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleOptionChange(index, option)}
                    />
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            ))}
            <button type="button" onClick={handleSubmit}>
              Submit Practice Exam
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PracticePq;
