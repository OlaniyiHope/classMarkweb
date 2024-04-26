import React, { Fragment, useEffect, useState, useRef } from "react";
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
import { useReactToPrint } from "react-to-print";
import useFetch from "hooks/useFetch";
import axios from "axios";
import useAuth from "app/hooks/useAuth";
import "./report.css";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const ViewReceipt = ({ receiptId }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [studentData, setStudentData] = useState(null);
  const [psyData, setPsyData] = useState(null);

  const { id } = useParams();

  // const { data } = useFetch(`/students/${id}`);

  const { data } = useFetch(`/receipt/${id}`);

  // const { data,  } = useFetch(`/students/${user._id}`); // Fetch data using the correct URL

  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [schoolSettings, setSchoolSettings] = useState({
    principalName: "",
    resumptionDate: "",
    signature: "",
  });
  const [accountSettings, setAccountSettings] = useState({
    name: "",
    motto: "",
    address: "",
    phone: "",
    phonetwo: "",
    email: "",
    sessionStart: "",
    sessionEnd: "",
    schoolLogo: "",
  });

  const apiUrl = process.env.REACT_APP_API_URL.trim();

  useEffect(() => {
    const fetchSchoolSettings = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/setting`);
        const { data } = response.data;

        // Set the retrieved school settings to the state
        setSchoolSettings(data);
      } catch (error) {
        console.error("Error fetching school settings:", error);
      }
    };

    fetchSchoolSettings();
  }, [apiUrl]);
  useEffect(() => {
    const fetchAccountSettings = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/account-setting`);
        const { data } = response.data;

        // Set the retrieved school settings to the state
        setAccountSettings(data);
      } catch (error) {
        console.error("Error fetching school settings:", error);
      }
    };

    fetchAccountSettings();
  }, [apiUrl]);
  const paid = parseFloat(data.paid);
  const amount = parseFloat(data.amount);

  // Check if paid and amount are valid numbers
  if (isNaN(paid) || isNaN(amount)) {
    console.error("Paid or amount is not a valid number");
  } else {
    // Calculate balance
    const balance = paid - amount;
  }
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Box width="100%" overflow="auto">
          <body className="print-button-container">
            <button onClick={handlePrint}> Print this out!</button>
            <div class="container" ref={componentRef}>
              <div
                class="header"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <div class="logo">
                  <img
                    src={`https://edupros.s3.amazonaws.com/${accountSettings.schoolLogo}`}
                    style={{
                      width: "200px",
                      height: "180px",
                    }}
                  />
                </div>
                <div class="bd_title">
                  <h1
                    style={{
                      fontSize: "25px",
                      fontWeight: "800",
                      textTransform: "uppercase",
                      margin: "10px 0",
                    }}
                  >
                    {accountSettings.name || ""}
                  </h1>
                  <h4 style={{ fontSize: "18px", margin: "5px 0" }}>
                    {accountSettings.address || ""}
                  </h4>
                  <p style={{ color: " #042954", margin: " 5px 0" }}>
                    Tel: {accountSettings.phone || ""},{" "}
                    {accountSettings.phonetwo || ""}, Email:
                    {accountSettings.email || ""}
                  </p>
                  <button
                    style={{
                      color: "#fff",
                      margin: "10px 0",
                      backgroundColor: "#042954",
                      borderRadius: "50px",
                      border: "none",
                      padding: "10px",
                      fontSize: "20px",
                      fontWeight: "800",
                      textTransform: "uppercase",
                      paddingLeft: "100px",
                      paddingRight: "100px",
                    }}
                  >
                    Receipt
                  </button>
                </div>
              </div>

              <table style={{ marginBottom: "30px" }}>
                <tr>
                  <td style={{ fontSize: "20px" }}>
                    <strong>Date</strong>
                  </td>
                  <td style={{ fontSize: "20px" }}>
                    {" "}
                    {data.date ? new Date(data.date).toLocaleDateString() : ""}
                  </td>
                </tr>
              </table>
              <table style={{ marginBottom: "30px" }}>
                <tr>
                  <td style={{ fontSize: "20px" }}>
                    <strong>Received From</strong>
                  </td>
                  <td style={{ fontSize: "20px" }}>{data.studentName}</td>
                </tr>
              </table>
              <table style={{ marginBottom: "30px" }}>
                <tr>
                  <td style={{ fontSize: "20px" }}>
                    <strong>On behalf of</strong>
                  </td>
                  <td style={{ fontSize: "20px" }}>{data.studentName}</td>
                </tr>
              </table>
              <table style={{ marginBottom: "30px" }}>
                <tr>
                  <td style={{ fontSize: "20px" }}>
                    <strong>The sum of</strong>
                  </td>
                  <td style={{ fontSize: "20px" }}>{data.paid}</td>
                </tr>
              </table>
              <table style={{ marginBottom: "30px" }}>
                <tr>
                  <td style={{ fontSize: "20px" }}>
                    <strong>being paid for</strong>
                  </td>
                  <td style={{ fontSize: "20px" }}>{data.reason}</td>
                </tr>
              </table>
              <table style={{ marginBottom: "30px" }}>
                <tr>
                  <td style={{ fontSize: "20px" }}>
                    ₦ {data.amount}
                    <span>K</span>
                  </td>
                  <td style={{ fontSize: "20px" }}>
                    Balance ₦10,000<span></span>
                    <span>K</span>
                  </td>
                  <td style={{ fontSize: "20px" }}>Signature</td>
                </tr>
              </table>
            </div>
          </body>
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default ViewReceipt;
