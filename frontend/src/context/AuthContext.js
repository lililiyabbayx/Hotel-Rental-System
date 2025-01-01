import { createContext, useEffect, useReducer } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

// Helper function to safely parse JSON
const safeParse = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (e) {
    return null; // Return null if JSON is invalid
  }
};

// Initial state for the AuthContext
const INITIAL_STATE = {
  user: safeParse(localStorage.getItem("user")) || null, // Use safeParse here to retrieve the user safely from localStorage
  loading: false,
  error: null,
};

// Create context for authentication
export const AuthContext = createContext(INITIAL_STATE);

// Reducer function to handle different authentication actions
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Context provider component to manage and provide authentication state
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    console.log("Auth State Updated:", { user: state.user }); // Debugging purpose
    if (state.user !== null) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {state.loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        children
      )}

      {state.error && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Typography color="error">
            {state.error.message || "An error occurred"}
          </Typography>
        </Box>
      )}
    </AuthContext.Provider>
  );
};
