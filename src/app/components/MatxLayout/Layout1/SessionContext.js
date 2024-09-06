// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const SessionContext = createContext();

// export const SessionProvider = ({ children }) => {
//   const [sessions, setSessions] = useState([]);
//   const [currentSession, setCurrentSession] = useState(null);

//   useEffect(() => {
//     // Fetch sessions when the component mounts
//     axios
//       .get("http://localhost:5000/api/sessions")
//       .then((response) => {
//         if (Array.isArray(response.data)) {
//           setSessions(response.data);

//           // Optionally set the first session as the default current session
//           if (response.data.length > 0) {
//             setCurrentSession(response.data[0]);
//           }
//         } else {
//           console.error("Unexpected response structure", response);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching sessions:", error);
//       });
//   }, []);

//   return (
//     <SessionContext.Provider
//       value={{ sessions, currentSession, setCurrentSession }}
//     >
//       {children}
//     </SessionContext.Provider>
//   );
// };

// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const SessionContext = createContext();

// export const SessionProvider = ({ children }) => {
//   const [sessions, setSessions] = useState([]);
//   const [currentSession, setCurrentSession] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/sessions")
//       .then((response) => {
//         if (Array.isArray(response.data)) {
//           setSessions(response.data);

//           // Find the session with the name "2023/2024" and set it as the current session
//           const session2023 = response.data.find(
//             (session) => session.name === "2023/2024"
//           );

//           if (session2023) {
//             setCurrentSession(session2023);
//           } else if (response.data.length > 0) {
//             // Fallback to the first session if "2023/2024" is not found
//             setCurrentSession(response.data[0]);
//           }
//         } else {
//           console.error("Unexpected response structure", response);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching sessions:", error);
//       });
//   }, []);

//   return (
//     <SessionContext.Provider
//       value={{ sessions, currentSession, setCurrentSession }}
//     >
//       {children}
//     </SessionContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sessions")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setSessions(response.data);

          // Set the session that matches the current date as active
          const activeSession = response.data.find((session) => {
            const now = new Date();
            const startDate = new Date(session.startDate);
            const endDate = new Date(session.endDate);
            return now >= startDate && now <= endDate;
          });

          if (activeSession) {
            setCurrentSession(activeSession);
          }
        } else {
          console.error("Unexpected response structure", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, []);

  return (
    <SessionContext.Provider
      value={{ sessions, currentSession, setSessions, setCurrentSession }}
    >
      {children}
    </SessionContext.Provider>
  );
};
