import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./tablestyles.css"

function PastQuestionsList() {
    const { subjectName, title } = useParams();
    const [questions, setQuestions] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL.trim();

  
    useEffect(() => {
      const fetchQuestions = async () => {
        const response = await fetch(`${apiUrl}/api/pq/view-past-quest`); // Fetch all subjects to find the questions
        const data = await response.json();
        const subject = data.find((subj) => subj.subjectName === subjectName);
        const subSubject = subject?.subSubjects.find((sub) => sub.title === title);
        setQuestions(subSubject ? subSubject.questions : []); // Set the questions of the selected sub-subject
      };
  
      fetchQuestions();
    }, [subjectName, title]);
  
    return (
      <div className='quests'>
        <h1>Questions for {title}</h1>
        {questions.length > 0 ? (
            <div className="table-container"> 
          <table className='table'>
            <thead>
              <tr>
                <th>Question Title</th>
                <th>Options</th>
                <th>Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr key={question._id}>
                  <td>{question.title}</td>
                  <td>{question.options.join(', ')}</td>
                  <td>{question.correctAnswer}</td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
        ) : (
          <p>No questions available for this sub-subject.</p>
        )}
      </div>
    );
}

export default PastQuestionsList