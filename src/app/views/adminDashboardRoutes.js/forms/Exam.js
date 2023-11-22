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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [subjectData, setSubjectData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [subjectIdLookup, setSubjectIdLookup] = useState({});
  const [showMarkManagement, setShowMarkManagement] = useState(false);

  const handleManageMarkClick = async () => {
    const token = localStorage.getItem("jwtToken");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    try {
      const response = await fetch(
        `https://edu-3cb7e7c6ba61.herokuapp.com/api/student/${selectedClass}`,
        {
          headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }

      const students = await response.json();
      setStudentData(students);
      setShowMarkManagement(true);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    if (selectedClass) {
      const token = localStorage.getItem("jwtToken");
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      fetch(
        `https://edu-3cb7e7c6ba61.herokuapp.com/api/get-subject/${selectedClass}`,
        {
          headers,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setSubjectData(data);

          // Create a subjectId lookup
          const lookup = {};
          data.forEach((subject) => {
            lookup[subject.name] = subject._id;
          });
          setSubjectIdLookup(lookup);
        })
        .catch((error) => {
          console.error("Error fetching subjects:", error);
        });
    } else {
      setSubjectData([]);
      setSubjectIdLookup({});
    }
  }, [selectedClass]);

  const handleClassChange = (event) => {
    const newSelectedClass = event.target.value;
    setSelectedClass(newSelectedClass);
    setSelectedSubject("");
  };

  const handleExamChange = (event) => {
    setSelectedExam(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };
  const handleSaveChanges = async () => {
    try {
      const marks = studentData.map((student, index) => {
        const studentId = student._id;
        const subjectId = subjectIdLookup[student.subjectName]; // Use the lookup to get subjectId
        const subjectName = selectedSubject;

        const testscore = Number(
          document.getElementById(`testscore_${index}`).value
        );
        const examscore = Number(
          document.getElementById(`examscore_${index}`).value
        );
        const marksObtained = Number(
          document.getElementById(`marksObtained_${index}`).value
        );
        const comment = document.getElementById(`comment_${index}`).value;

        return {
          studentId,
          subjectId,
          subjectName,
          testscore,
          examscore,
          marksObtained,
          comment,
        };
      });

      const token = localStorage.getItem("jwtToken");
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      const response = await fetch(
        "https://edu-3cb7e7c6ba61.herokuapp.com/api/save-marks",
        {
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({
            examId: selectedExam,
            className: selectedClass,
            marks,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save marks");
      }

      toast.success("Marks saved successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error saving marks:", error);

      toast.error("Failed to save marks", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
                value={selectedExam}
                onChange={handleExamChange}
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
                value={selectedClass}
                onChange={handleClassChange}
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
                {subjectData &&
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
                Manage Mark
              </Button>
            </Grid>
          </Grid>

          {showMarkManagement && (
            <>
              <div className="col-sm-4">
                <div className="tile-stats tile-gray">
                  <div className="icon">
                    <i className="entypo-chart-bar"></i>
                  </div>
                  <h3 style={{ color: "#696969" }}>Marks For </h3>
                  <h4 style={{ color: "#696969" }}>Class :</h4>
                  <h4 style={{ color: "#696969" }}>Subject :</h4>
                </div>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Test</th>
                    <th>Exam</th>
                    <th>Marks Obtained</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((student, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{student._id}</td>
                      <td id={`subjectId_${index}`} style={{ display: "none" }}>
                        {subjectIdLookup[student.subjectName]}
                      </td>
                      <td>{student.studentName}</td>
                      <td>
                        <TextField
                          type="number"
                          name={`testscore_${index}`}
                          id={`testscore_${index}`}
                        />
                      </td>
                      <td>
                        <TextField
                          type="number"
                          name={`examscore_${index}`}
                          id={`examscore_${index}`}
                        />
                      </td>
                      <td>
                        <TextField
                          type="number"
                          name={`marksObtained_${index}`}
                          id={`marksObtained_${index}`}
                        />
                      </td>
                      <td>
                        <TextField
                          name={`comment_${index}`}
                          id={`comment_${index}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </>
          )}
        </ValidatorForm>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Exam;
