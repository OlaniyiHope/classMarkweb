import React, { useState } from 'react';
import axios from 'axios';
import './addpq.css'; // Import the CSS file

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPq() {
  const [file, setFile] = useState(null); // State to store selected file

  // Handle file change and validate file type
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Check if a file was selected
    if (selectedFile) {
      const fileType = selectedFile.type;

      // Validate the file type to ensure it's an Excel file
      if (
        fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        fileType === 'application/vnd.ms-excel'
      ) {
        setFile(selectedFile); // Set the selected file
      } else {
        setFile(null); // Clear the file if it's not an Excel file
        toast.error('Please upload a valid Excel file (.xlsx or .xls)'); // Show error message
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Check if a file has been selected
    if (!file) {
      toast.error('Please select a valid Excel file to upload.'); // Show error if no file or wrong type
      return; // Prevent submission if no file is selected
    }

    const formData = new FormData();
    formData.append('file', file); // Append the selected file to the form data

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/add-past-questions`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      // Check if the response is successful before showing the success message
      if (response.status === 200) {
        toast.success(response.data); // Show success message from the response
      } else {
        toast.error('Something went wrong. Please try again.'); // Handle non-200 status
      }
    } catch (error) {
      toast.error('Error uploading file. Please try again.'); // Only one error message
    }
  };

  return (
    <div className="add-pq-container">
      <h2>Upload Past Questions</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="file-input" /> {/* Only accept Excel files */}
        <button type="submit" className="upload-button">Upload</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddPq;
