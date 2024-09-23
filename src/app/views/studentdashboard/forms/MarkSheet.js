// import { Fragment, React, useEffect, useState } from "react";
// import { Box } from "@mui/system";
// import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon

// import { Card, Button, Grid, styled, Table } from "@mui/material";

// import { Link, useParams } from "react-router-dom";
// import useAuth from "app/hooks/useAuth";
// import useFetch from "hooks/useFetch";
// const ContentBox = styled("div")(({ theme }) => ({
//   margin: "30px",
//   [theme.breakpoints.down("sm")]: { margin: "16px" },
// }));

// const MarkSheet = () => {
//   const [studentData, setStudentData] = useState(null); // Add state for student data
//   const { data, loading, error } = useFetch(`/students/SS3/${id}`);

//   const { id } = useParams();
//   const { user } = useAuth();
//   const fetchStudentData = async (studentId) => {
//     try {
//       const response = await fetch(`/students/${studentId}`);
//       if (!response.ok) {
//         throw new Error(`Error fetching student data: ${response.statusText}`);
//       }

//       const studentInfo = await response.json();
//       console.log("Fetched student data:", studentInfo);
//       setStudentData(studentInfo);
//     } catch (error) {
//       console.error("Error fetching student data:", error.message);
//       // Handle the error here
//     }
//   };

//   useEffect(() => {
//     // Fetch student data when the component mounts
//     fetchStudentData(id);
//   }, [id]);

//   // Add a conditional check for studentData
//   useEffect(() => {
//     // Check if studentData is not null and contains expected properties
//     if (studentData && studentData.studentName && studentData.classname) {
//       console.log("Fetched student data:", studentData);
//     }
//   }, [studentData]);
//   return (
//     <Fragment>
//       <ContentBox className="analytics">
//         {/*}   <h2>
//           MarkSheet for {studentData ? studentData.studentName : ""}
//           {studentData ? studentData.classname : ""}
//   </h2>*/}
//         <h2>
//           MarkSheet for {data.studentName}
//           {data.classname}
//         </h2>

//         <Box width="100%" overflow="auto">
//           <Button
//             color="primary"
//             variant="contained"
//             type="submit"
//             style={{ width: "100%", marginTop: "100px" }}
//           >
//             Cummulative Result
//           </Button>
//         </Box>
//       </ContentBox>
//     </Fragment>
//   );
// };

// export default MarkSheet;
import { Fragment, React, useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, styled } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import useAuth from "../../../../app/hooks/useAuth";

// import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";


const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const MarkSheet = () => {
  const [studentData, setStudentData] = useState(null);
  const { user } = useAuth();
  const { currentSession } = useContext(SessionContext);

  console.log("User:", user._id);

  const { data, loading, error } = useFetch(`/students/${user._id}/${currentSession._id}`); // Fetch data using the correct URL

  useEffect(() => {
    // Ensure the data is available and valid
    if (data && data.length > 0 && data[0].studentName && data[0].classname) {
      setStudentData(data[0]);
    }
  }, [data]);

  // If no data is available, return a blank page or a message
  if (loading) return <p>Loading...</p>;
  if (!data || data.length === 0 || !studentData) {
    return <p>No data available for the selected session.</p>;
  }

  return ( 
    <Fragment>
      <ContentBox className="analytics">
        <h2>
          Marksheet for {studentData ? studentData.studentName : ""}({" "}
          {studentData ? studentData.classname : ""})
        </h2>

        <Box width="100%" overflow="auto">
          <Link to={`/dashboard/first_term_report_card/${user._id}`}>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "20px" }}
            >
              First Term Report Card
            </Button>
          </Link>
          <Link to={`/dashboard/term_report_card/${user._id}`}>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Second Term Report Card
            </Button>
          </Link>
          <Link to={`/dashboard/third_term_report_card/${user._id}`}>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Third Term Report Card
            </Button>
          </Link>

          <Link>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Cummulative Result
            </Button>
          </Link>
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default MarkSheet;
