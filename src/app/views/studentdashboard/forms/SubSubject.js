import React, {useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";

import "./defaultpqstyles.css"


function SubSubject() {
  const { subjectName } = useParams();
  const [subSubjects, setSubSubjects] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL.trim();

  useEffect(() => {
    const fetchSubSubjects = async () => {
      const response = await fetch(`${apiUrl}/api/pq/view-past-quest`); // Fetch all subjects to find the selected one
      const data = await response.json();
      const subject = data.find((subj) => subj.subjectName === subjectName);
      setSubSubjects(subject ? subject.subSubjects : []); // Set the sub-subjects of the selected subject
    };

    fetchSubSubjects();
  }, [subjectName]);

  return (
    <div className='pq list-container'>
      <h1>Sub-Subjects for {subjectName}</h1>
      <ul className='list'>
        {subSubjects.map((sub) => (
          <li key={sub._id} className='list-item'>
            <Link to={`/student/dashboard/questions/${subjectName}/${sub.title}`}>{sub.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default SubSubject