import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "hooks/useFetch";
import axios from "axios";
import useAuth from "app/hooks/useAuth";
import "./report.css";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const TermRep = ({ studentId }) => {
  const [studentData, setStudentData] = useState(null);
  const { id } = useParams();

  const { data } = useFetch(`/students/${id}`);

  useEffect(() => {
    if (data && data.studentName && data.classname) {
      setStudentData(data);
    }
  }, [data]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/get-scores-by-student/${studentId}`
        );
        setStudentData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError("Failed to fetch student data");
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  // useEffect(() => {
  //   const fetchStudentSubjects = async () => {
  //     try {
  //       const token = localStorage.getItem("jwtToken");
  //       const headers = {
  //         Authorization: `Bearer ${token}`,
  //       };

  //       const studentResponse = await axios.get(
  //         `http://localhost:3003/api/students/${id}`,
  //         {
  //           headers,
  //         }
  //       );

  //       const { classname } = studentResponse.data;

  //       const subjectsResponse = await axios.get(
  //         `http://localhost:3003/api/get-subject/${classname}`,
  //         {
  //           headers,
  //         }
  //       );

  //       if (subjectsResponse.data && subjectsResponse.data.length > 0) {
  //         setSubjectData(subjectsResponse.data);
  //         setExamName(subjectsResponse.data[0]?.name || "");
  //       } else {
  //         console.log("No subjects found");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching student subjects:", error);
  //       setSubjectData([]);
  //     }
  //   };

  //   fetchStudentSubjects();
  // }, [id]);

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Box width="100%" overflow="auto">
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">
                  <img
                    src="https://hlhs.portalreport.org/uploads/1680762525Screenshot_20230405-172641.jpg"
                    style={{ width: "30px", height: "30px" }}
                  />
                </div>
                <div class="bd_title">
                  <h1 class="f20">
                    <strong>HEAVENLY LOVE HIGH SCHOOL</strong>
                  </h1>
                  <h4 class="f18">
                    {" "}
                    14, Babs Ladipo Street, Agbe Road, Abule Egba, Lagos State.{" "}
                  </h4>
                  <p style={{ color: "#042954" }}> Report Card</p>
                </div>
                <div class="headrt">
                  <p style={{ color: "#042954" }}>
                    Telephone : +234 8028724575, +234 8165051826
                  </p>
                </div>
              </div>
              <div class="bd_detailssec">
                <div class="bd_photo">
                  <img
                    class="profile-photo"
                    alt="profile-photo"
                    src="https://hlhs.portalreport.org/uploads/user.jpg"
                  />
                </div>
                <div class="bd_detailsarea">
                  <div class="bd_detailsareatop">
                    <div class="bd_detailsareaon">
                      <p style={{ color: "#042954" }}>
                        <span>Student Name:</span>{" "}
                        <input
                          type="text"
                          style={{
                            border: 0,
                            outline: 0,
                            background: "transparent",
                            borderBottom: "1px solid black",
                            width: "50%",
                            marginLeft: "30px",
                            textAlign: "center",
                          }}
                          value={studentData?.studentName || ""}
                        />
                      </p>
                    </div>
                    <div class="bd_detailsareaon">
                      <p style={{ color: "#042954" }}>
                        <span>Session:</span>2023-2024
                      </p>
                      <p style={{ color: "#042954" }}>
                        <span>Class Teacher:</span>
                        <input
                          type="text"
                          style={{
                            border: 0,
                            outline: 0,
                            background: "transparent",
                            borderBottom: "1px solid black",
                            width: "50%",
                            marginLeft: "30px",
                            textAlign: "center",
                          }}
                          value={studentData?.classTeacher || ""}
                        />
                      </p>
                    </div>
                  </div>

                  <div class="bd_detailsareabtm">
                    <div class="bd_detailsareaon">
                      <p style={{ color: "#042954" }}>
                        <span>Student Id No:</span>{" "}
                        <input
                          type="text"
                          style={{
                            border: 0,
                            outline: 0,
                            background: "transparent",
                            borderBottom: "1px solid black",
                            width: "50%",
                            marginLeft: "30px",
                            textAlign: "center",
                          }}
                          value={studentData?.id || ""}
                        />
                      </p>
                      <p style={{ color: "#042954" }}>
                        <span>Attendence:</span>{" "}
                        <input
                          type="text"
                          style={{
                            border: 0,
                            outline: 0,
                            background: "transparent",
                            borderBottom: "1px solid black",
                            width: "50%",
                            marginLeft: "30px",
                            textAlign: "center",
                          }}
                          value={studentData?.attendance || ""}
                        />
                      </p>
                      <p style={{ color: "#042954" }}>
                        <span>Class Position:</span>{" "}
                        <input
                          type="text"
                          style={{
                            border: 0,
                            outline: 0,
                            background: "transparent",
                            borderBottom: "1px solid black",
                            width: "50%",
                            marginLeft: "30px",
                            textAlign: "center",
                          }}
                          value={studentData?.position || ""}
                        />
                      </p>
                      <p style={{ color: "#042954" }}>
                        <span>Number in Class:</span>{" "}
                        <input
                          type="text"
                          style={{
                            border: 0,
                            outline: 0,
                            background: "transparent",
                            borderBottom: "1px solid black",
                            width: "50%",
                            marginLeft: "30px",
                            textAlign: "center",
                          }}
                          value={studentData?.noinclass || ""}
                        />
                      </p>
                      <p style={{ color: "#042954" }}>
                        <span>Total Marks:</span>{" "}
                        <input
                          type="text"
                          style={{
                            border: 0,
                            outline: 0,
                            background: "transparent",
                            borderBottom: "1px solid black",
                            width: "50%",
                            marginLeft: "30px",
                            textAlign: "center",
                          }}
                          value={studentData?.mark || ""}
                        />
                      </p>
                    </div>

                    <div class="bd_detailsareaon">
                      <p style={{ color: "#042954" }}>
                        <span>Marks Obtained:</span>{" "}
                        <input
                          type="text"
                          style={{
                            border: 0,
                            outline: 0,
                            background: "transparent",
                            borderBottom: "1px solid black",
                            width: "50%",
                            marginLeft: "30px",
                            textAlign: "center",
                          }}
                          value={studentData?.mark || ""}
                        />
                      </p>
                      <p style={{ color: "#042954" }}>
                        <span>Average Marks:</span>{" "}
                        <input
                          type="text"
                          style={{
                            border: 0,
                            outline: 0,
                            background: "transparent",
                            borderBottom: "1px solid black",
                            width: "50%",
                            marginLeft: "30px",
                            textAlign: "center",
                          }}
                          value={studentData?.mark || ""}
                        />
                      </p>
                      <p style={{ color: "#042954" }}>
                        <span>Average Grade:</span>{" "}
                        <input
                          type="text"
                          style={{
                            border: 0,
                            outline: 0,
                            background: "transparent",
                            borderBottom: "1px solid black",
                            width: "50%",
                            marginLeft: "30px",
                            textAlign: "center",
                          }}
                          value={studentData?.grade || ""}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="table-responsive bd_table">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <table className="table" id="customers">
                              <thead style={{ backgroundColor: "#ffc107" }}>
                                <tr>
                                  <th scope="col">SlNo</th>
                                  <th scope="col" style={{ textAlign: "left" }}>
                                    Subject
                                  </th>
                                  <th scope="col">Test</th>
                                  <th scope="col">Exam</th>
                                  <th scope="col">Obtained Marks</th>
                                  <th scope="col">Position</th>
                                  <th scope="col">Grade</th>
                                  <th scope="col">Remark</th>
                                </tr>
                              </thead>

                              <tbody>
                                {studentData?.scores.map((score, index) => (
                                  <tr key={index}>
                                    <td></td>
                                    <td>{score.subjectName}</td>
                                    <td>{score.testscore}</td>
                                    <td>{score.marks[0]?.examscore || ""}</td>
                                    <td>
                                      {score.marks[0]?.marksObtained || ""}
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td>{score.marks[0]?.comment || ""}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                          <td style={{ verticalAlign: "top" }}>
                            <table class="table" id="customersreport">
                              <thead style={{ backgroundColor: "#ffc107" }}>
                                <tr>
                                  <th scope="col" colspan="3">
                                    AFFECTIVE AND PSYCHOMOTOR REPORT
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th></th>
                                  <th>Work Habits</th>
                                  <th>RATINGS</th>
                                </tr>
                                <tr>
                                  <td>1</td>
                                  <td>Following Instruction</td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>2</td>
                                  <td>Working Independently</td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <th></th>
                                  <th>Behaviour</th>
                                  <th>RATINGS</th>
                                </tr>
                                <tr>
                                  <td>1</td>
                                  <td>Punctuality</td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <th></th>
                                  <th>Communication</th>
                                  <th>RATINGS</th>
                                </tr>
                                <tr>
                                  <td>1</td>
                                  <td>Talking</td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>2</td>
                                  <td>Eye Contact</td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div style={{ color: "#042954", fontSize: "16px" }}>
                KEY TO GRADES A (DISTINCTION)=70% &amp; ABOVE , C
                (CREDIT)=55-69% , P(PASS)=40-54% , F(FAIL)=BELOW 40%
              </div>
              <div class="remarksbox" style={{ padding: "10px 0" }}>
                <table class="table">
                  <tbody>
                    <tr>
                      <th>CLASS TEACHER'S REMARK</th>
                      <td colspan="2"></td>
                    </tr>
                    <tr>
                      <th>PRINCIPAL'S REMARK</th>
                      <td colspan="2"></td>
                    </tr>
                    <tr>
                      <th>PRINCIPAL'S NAME</th>
                      <td>Odeyemi, Praise I.</td>
                      <td style={{ textAlign: "right" }}>
                        <img
                          src="https://hlhs.portalreport.org/uploads/admin_image/25_sign.jpg"
                          width="200"
                        />
                      </td>
                    </tr>

                    <tr>
                      <th>SCHOOL RESUMES</th>
                      <td>September 4th 2023</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                class="bd_key"
                style={{ color: "#042954", fontSize: "16px" }}
              >
                KEY TO RATINGS : 5 = Excellent , 4 = Good , 3 = Fair , 2 = Poor
                , 1 = Very Poor
              </div>

              <div class="bdftrtop">
                <div class="float-left text-right bdftrtopl">
                  <span style={{ color: "#042954" }}>Seal of the Register</span>
                </div>
                <div class="float-right text-left bdftrtopr">
                  <span style={{ color: "#042954" }}>Date</span>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </body>
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default TermRep;
