import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TextField, Button, CircularProgress, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve hotelId from the state passed via navigate
  const hotelId = location.state?.hotelId;

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5500/api/auth/login", credentials);
      // Ensure that the response has user details
      if (res.data && res.data.details) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(res.data.details));
    
        // Redirect to the hotel page if hotelId exists, otherwise fallback to homepage
        navigate(hotelId ? `/hotels/${hotelId}` : "/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || "Login failed" });
    }
  };
  
  
  return (
    <div className="login">
      <div className="lContainer">
        <TextField
          variant="outlined"
          label="Username"
          id="username"
          onChange={handleChange}
          className="lInput"
          fullWidth
        />
        <TextField
          variant="outlined"
          label="Password"
          id="password"
          onChange={handleChange}
          className="lInput"
          type="password"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
        {error && <Alert severity="error">{error.message || "An error occurred."}</Alert>}
      </div>
    </div>
  );
};

export default Login;
