import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import axios from "axios";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  MenuItem,
  DialogTitle,
  RadioGroup,
  styled,
} from "@mui/material";
import useFetch from "hooks/useFetch";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const Exam = () => {
  const {
    data: classData,
    loading: classLoading,
    error: classError,
  } = useFetch("/class");
  const { data: examData } = useFetch("/getofflineexam");
  const [subjectData, setSubjectData] = useState([]); // Initialize subject data as an empty array
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [studentData, setStudentData] = useState([]);

  const [showMarkManagement, setShowMarkManagement] = useState(false);

  const handleManageMarkClick = async () => {
    // Fetch student data based on the selected class
    const token = localStorage.getItem("jwtToken");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    try {
      const response = await fetch(
        `http://localhost:3003/api/student/${selectedClass}`,
        {
          headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }

      const students = await response.json();
      setStudentData(students);

      // Update the state to show mark management
      setShowMarkManagement(true);
    } catch (error) {
      console.error("Error fetching student data:", error);
      // Handle the error (e.g., show an error message)
    }
  };
  useEffect(() => {
    if (selectedClass) {
      // Fetch the authentication token from wherever you've stored it (e.g., local storage)
      const token = localStorage.getItem("jwtToken");

      // Include the token in the request headers
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      // Make an API call to fetch subjects for the selected class with the authorization token
      fetch(`http://localhost:3003/api/get-subject/${selectedClass}`, {
        headers,
      })
        .then((response) => response.json())
        .then((data) => {
          setSubjectData(data);
        })
        .catch((error) => {
          console.error("Error fetching subjects:", error);
        });
    } else {
      // Clear the subjects if no class is selected
      setSubjectData([]);
    }
  }, [selectedClass]);

  const handleClassChange = (event) => {
    const newSelectedClass = event.target.value;
    setSelectedClass(newSelectedClass);

    // Clear the selected subject when the class changes
    setSelectedSubject("");
  };
  const handleExamChange = (event) => {
    setSelectedExam(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <div>
      <Container>
        <ValidatorForm onError={() => null}>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Manage Exam Mark" }]} />
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={4}>
              <TextField
                select
                label="Select an Exam"
                variant="outlined"
                value={selectedExam} // Bind the selected value
                onChange={handleExamChange} // Handle the change
              >
                {examData &&
                  examData.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Select a class"
                variant="outlined"
                value={selectedClass} // Bind the selected value
                onChange={handleClassChange} // Handle the change
              >
                {classData &&
                  classData.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Select the subject"
                variant="outlined"
                value={selectedSubject}
                onChange={handleSubjectChange}
              >
                {Array.isArray(subjectData) &&
                  subjectData.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={handleManageMarkClick}
              >
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>
                  Manage Mark
                </Span>
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
        {showMarkManagement && (
          <>
            <div class="col-sm-4">
              <div class="tile-stats tile-gray">
                <div class="icon">
                  <i class="entypo-chart-bar"></i>
                </div>

                <h3 style={{ color: "#696969" }}>Marks For Math</h3>
                <h4 style={{ color: "#696969" }}>Class J.S.S. 1 : Section A</h4>
                <h4 style={{ color: "#696969" }}>Subject : ENGLISH STUDIES </h4>
              </div>
            </div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Exam</th>
                  <th>Marks Obtained</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((student, index) => (
                  <tr>
                    <td>28</td>

                    <td>127hlhs</td>

                    <td>{student.studentName} </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        id="exam_2521"
                        name="exam_2521"
                        value="0"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        id="mark_obtained_2521"
                        name="marks_obtained_2521"
                        value=""
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        name="comment_2521"
                        value=""
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </Container>
    </div>
  );
};

export default Exam;
