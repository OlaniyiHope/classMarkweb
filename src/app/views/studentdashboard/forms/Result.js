import React from 'react';

const Result = ({ result }) => {
    return (
        <div>
            <h2>Practice Exam Results</h2>
            <p>Total Questions: {result.totalQuestions}</p>
            <p>Correct Answers: {result.score}</p>
            <p>Percentage: {result.percentage}%</p>
        </div>
    );
};

export default Result;
