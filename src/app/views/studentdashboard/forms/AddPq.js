import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../app/hooks/useAuth";
import { useNavigate } from "react-router-dom";
// import "./defaultpqstyles.css"

function AddPq() {
  const [subjects, setSubjects] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL.trim();
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  console.log("user student class", user.classname);

  useEffect(() => {
    const fetchSubjects = async () => {
      // Fetch subjects from your API
      const response = await fetch(`${apiUrl}/api/pq/view-past-quest`); // Adjust the API endpoint as needed
      const data = await response.json();

      // Filter the subjects based on the user's class name
      const filteredSubjects = data.filter(
        (subject) => subject.class === user.classname
      );

      setSubjects(filteredSubjects); // Set state with filtered subjects
    };

    fetchSubjects();
  }, [apiUrl, user.classname]); // Add user.classname as a dependency

  return (
    <div className="pq list-container">
      <h1>Subjects</h1>
      <ul className="list">
        {subjects.map((subject) => (
          <li key={subject._id} className="list-item">
            <Link to={`/student/dashboard/subsubjects/${subject.subjectName}`}>
              {subject.subjectName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddPq;
