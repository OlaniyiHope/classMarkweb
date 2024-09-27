import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './answers.css'; // Import your CSS file

function Answers() {
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL.trim();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/questions/${id}`);
        console.log("Answers data:", response.data); // Log the response data to the console
        setQuestions(response.data); // Set the questions state
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    fetchAnswers(); // Call the fetch function
  }, [apiUrl, id]);

  return (
    <div className="answers-container">
      <h2>Answers</h2>
      {questions.length > 0 ? (
        <table className="answers-table">
          <thead>
            <tr>
              <th>Question Title</th>
              <th>Mark</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => {
              // Skip if options array is empty
              if (question.options.length === 0) return null;

              return (
                <tr key={question._id}>
                  <td>{question.questionTitle}</td>
                  <td>{question.mark}</td>
                  <td>
                    {question.options.map((option) => (
                      <div key={option._id}>
                        {option.option} {option.isCorrect && '(Correct)'}
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
}

export default Answers;
