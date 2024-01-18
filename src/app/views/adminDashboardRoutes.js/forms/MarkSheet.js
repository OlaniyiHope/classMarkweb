// import { Fragment, React, useEffect, useState } from "react";
// import { Box } from "@mui/system";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Button, styled } from "@mui/material";
// import { Link, useParams } from "react-router-dom";
// import useFetch from "hooks/useFetch";

// const ContentBox = styled("div")(({ theme }) => ({
//   margin: "30px",
//   [theme.breakpoints.down("sm")]: { margin: "16px" },
// }));

// const MarkSheet = () => {
//   const [studentData, setStudentData] = useState(null);
//   const { id } = useParams();
//   console.log("Student ID:", id);

//   const { data, loading, error } = useFetch(`/students/${id}`); // Fetch data using the correct URL

//   useEffect(() => {
//     // Check if the data is available before updating the state
//     console.log("Data from useFetch:", data);
//     if (data && data.studentName && data.classname) {
//       console.log("Fetched student data:", data);
//       setStudentData(data);
//     }
//   }, [data]);

//   return (
//     <Fragment>
//       <ContentBox className="analytics">
//         <h2>
//           Marksheet for {studentData ? studentData.studentName : ""}({" "}
//           {studentData ? studentData.classname : ""})
//         </h2>

//         <Box width="100%" overflow="auto">
//           <Link to={`/dashboard/term_report_card/${data._id}`}>
//             <Button
//               color="primary"
//               variant="contained"
//               style={{ width: "100%", marginTop: "100px" }}
//             >
//               First Term Report Card
//             </Button>
//           </Link>
//           <Link to={`/dashboard/report_card/${data._id}`}>
//             <Button
//               color="primary"
//               variant="contained"
//               style={{ width: "100%", marginTop: "100px" }}
//             >
//               Cummulative Result
//             </Button>
//           </Link>
//         </Box>
//       </ContentBox>
//     </Fragment>
//   );
// };

// export default MarkSheet;

// ... (import statements)

import { Fragment, React, useEffect, useState } from "react";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, styled } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useFetch from "hooks/useFetch";
import TermRep from "./TermRep";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const MarkSheet = () => {
  const [studentData, setStudentData] = useState(null);
  const { id } = useParams();
  console.log("Student ID:", id);

  const { data, loading, error } = useFetch(`/students/${id}`); // Fetch data using the correct URL
  console.log("student data", data);
  useEffect(() => {
    // Check if the data is available before updating the state
    console.log("Data from useFetch:", data);
    if (data && data.studentName && data.classname) {
      console.log("Fetched student data:", data);
      setStudentData(data);
    }
  }, [data]);

  return (
    <Fragment>
      <ContentBox className="analytics">
        <h2>
          Marksheet for {studentData ? studentData.studentName : ""}{" "}
          {studentData ? studentData.classname : ""}
        </h2>

        <Box width="100%" overflow="auto">
          {/* Use studentId for "First Term Report Card" link */}
          <Link to={`/dashboard/term_report_card/${id}`}>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "100px" }}
            >
              Second Term Report Card
            </Button>
          </Link>
          {/* Use id for "Cumulative Result" link */}
          <Link to={`/dashboard/report_card/${id}`}>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "100px" }}
            >
              Cumulative Result
            </Button>
          </Link>
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default MarkSheet;
