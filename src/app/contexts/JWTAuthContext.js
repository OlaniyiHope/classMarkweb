import React, { createContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { MatxLoading } from "app/components";

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const apiUrl = process.env.REACT_APP_API_URL;

const isValidToken = (jwtToken) => {
  if (!jwtToken) {
    return false;
  }

  const decodedToken = jwtDecode(jwtToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const setSession = (jwtToken) => {
  if (jwtToken) {
    localStorage.setItem("jwtToken", jwtToken);
    axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
  } else {
    localStorage.removeItem("jwtToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (identifier, password, role) => {
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        identifier,
        password,
        role,
      });

      console.log("Response data:", response.data);

      if (response.status === 200) {
        const { token, user } = response.data;
        console.log("Retrieved JWT Token:", token);
        console.error("Login failed with status:", response.status);
        console.error("Response data:", response.data);

        try {
          await localStorage.setItem("jwtToken", token);
          console.log("JWT Token stored in localStorage");
        } catch (error) {
          console.error("Error setting JWT token:", error);
        }

        // Dispatch the "LOGIN" action with the user data
        dispatch({
          type: "LOGIN",
          payload: {
            user,
          },
        });

        return response;
      } else {
        console.error("Login failed with status:", response.status);
        return response;
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (
    username,
    email,
    phone,
    address,
    password,
    role,
    studentName,
    AdmNo,
    classname,
    parentsName,
    // gender,
    // contactNo,
    date
    // birthday
  ) => {
    const response = await axios.post(`${apiUrl}/api/register`, {
      username,
      email,
      phone,
      address,
      password,
      role,
      studentName,
      AdmNo,
      classname,
      // subjectTaught,
      parentsName,
      // gender,
      date,
      // contactNo,
      // birthday,
    });

    const { token, user } = response.data;

    setSession(token);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const jwtToken = window.localStorage.getItem("jwtToken");

        if (jwtToken && isValidToken(jwtToken)) {
          setSession(jwtToken);
          const response = await axios.get("/api/auth/profile");
          const { user } = response.data;
          console.log("User retrieved from the server:", user);

          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          console.log("JWT Token not found or is invalid.");
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialised) {
    return <MatxLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
