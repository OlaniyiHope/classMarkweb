// import { useEffect, useState } from "react";
// import axios from "axios";

// const useFetch = (url) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const apiUrl = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // Fetch the authentication token from local storage
//         const token = localStorage.getItem("jwtToken");

//         // Include the token in the request headers
//         const headers = {
//           Authorization: `Bearer ${token}`,
//         };

//         const res = await axios.get(`${apiUrl}/api${url}`, {
//           headers, // Include the headers in the request
//         });

//         setData(res.data);
//       } catch (err) {
//         setError(err);
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, [url]);

//   const reFetch = async () => {
//     setLoading(true);
//     try {
//       // Fetch the authentication token from local storage
//       const token = localStorage.getItem("jwtToken");

//       // Include the token in the request headers
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const res = await axios.get(`${apiUrl}/api${url}`, {
//         headers, // Include the headers in the request
//       });

//       setData(res.data);
//     } catch (err) {
//       setError(err);
//     }
//     setLoading(false);
//   };

//   return { data, loading, error, reFetch };
// };

// export default useFetch;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const useFetch = (url) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const apiUrl = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("jwtToken");
//         const headers = { Authorization: `Bearer ${token}` };
//         const res = await axios.get(`${apiUrl}/api${url}`, { headers });

//         setData(res.data.length > 0 ? res.data : null);
//       } catch (err) {
//         setError(err);
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, [url]);

//   const reFetch = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const headers = { Authorization: `Bearer ${token}` };
//       const res = await axios.get(`${apiUrl}/api${url}`, { headers });

//       setData(res.data.length > 0 ? res.data : null);
//     } catch (err) {
//       setError(err);
//     }
//     setLoading(false);
//   };

//   return { data, loading, error, reFetch };
// };

// export default useFetch;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const useFetch = (url) => {
//   const [data, setData] = useState(null); // Set to null initially
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const apiUrl = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!url) return; // Avoid fetching if URL is null or undefined
//       setLoading(true);
//       try {
//         const response = await axios.get(url);
//         setData(response.data);
//         setError(null); // Clear any previous errors
//       } catch (err) {
//         setError(err);
//         setData([]); // Set data to empty if there's an error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]); // Re-run the effect if URL changes

//   const reFetch = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const headers = { Authorization: `Bearer ${token}` };
//       const res = await axios.get(`${apiUrl}/api${url}`, { headers });

//       // If data is empty, set it to null to handle "No data found" case
//       setData(res.data.length > 0 ? res.data : null);
//       setError(null);
//     } catch (err) {
//       setError(err);
//       setData(null); // Reset data if there's an error
//     }
//     setLoading(false);
//   };

//   return { data, loading, error, reFetch };
// };

// export default useFetch;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const useFetch = (url) => {
//   const [data, setData] = useState(null); // Set to null initially
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const apiUrl = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!url) return; // Avoid fetching if URL is null or undefined
//       setLoading(true);
//       console.log("Fetching data from URL:", url);
//       try {
//         const response = await axios.get(url);
//         console.log("Data fetched successfully:", response.data);
//         setData(response.data);
//         setError(null); // Clear any previous errors
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err);
//         setData([]); // Set data to empty if there's an error
//       } finally {
//         setLoading(false);
//         console.log("Loading state set to false");
//       }
//     };

//     fetchData();
//   }, [url]); // Re-run the effect if URL changes

//   const reFetch = async () => {
//     setLoading(true);
//     console.log("Re-fetching data from URL:", url);
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const headers = { Authorization: `Bearer ${token}` };
//       const res = await axios.get(`${apiUrl}/api${url}`, { headers });

//       // If data is empty, set it to null to handle "No data found" case
//       console.log("Re-fetch successful:", res.data);
//       setData(res.data.length > 0 ? res.data : null);
//       setError(null);
//     } catch (err) {
//       console.error("Error re-fetching data:", err);
//       setError(err);
//       setData(null); // Reset data if there's an error
//     }
//     setLoading(false);
//     console.log("Loading state set to false after re-fetch");
//   };

//   return { data, loading, error, reFetch };
// };

// export default useFetch;
import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null); // Initialize to null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return; // Avoid fetching if URL is null or undefined
      setLoading(true);
      console.log("Fetching data from URL:", url);
      try {
        const token = localStorage.getItem("jwtToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${apiUrl}/api${url}`, { headers });
        console.log("Data fetched successfully:", response.data);
        setData(response.data.length > 0 ? response.data : null); // Handle empty data
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setData(null); // Reset data if there's an error
      } finally {
        setLoading(false);
        console.log("Loading state set to false");
      }
    };

    fetchData();
  }, [url]); // Re-run the effect if URL changes

  const reFetch = async () => {
    setLoading(true);
    console.log("Re-fetching data from URL:", url);
    try {
      const token = localStorage.getItem("jwtToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`${apiUrl}/api${url}`, { headers });
      console.log("Re-fetch successful:", res.data);
      setData(res.data.length > 0 ? res.data : null); // Handle empty data
      setError(null);
    } catch (err) {
      console.error("Error re-fetching data:", err);
      setError(err);
      setData(null); // Reset data if there's an error
    }
    setLoading(false);
    console.log("Loading state set to false after re-fetch");
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
