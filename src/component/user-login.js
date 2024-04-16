import React, { useState } from "react";

import {
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Password,
} from "@mui/icons-material";
import axios from "axios";
import { useCookies } from "react-cookie";

const LoginContainer = styled("div")({
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
});

const SubmitButton = styled(Button)({
  marginTop: "20px",
  width: "100%", // Added to make the button full width
  backgroundColor: "#03a9f4",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#0288d1",
  },
});

const RegisterButton = styled(Button)({
  marginTop: "20px",
  width: "100%", // Added to make the button full width
  backgroundColor: "#4caf50",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#388e3c",
  },
});

const UserLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies("userid");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [user, setUser] = useState([]);
  let navigate = useNavigate();
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.get(`http://127.0.0.1:3001/get-users`).then((res) => {
      const foundUser = res.data.find((user) => user.Email === formData.email);
      setUser(foundUser);
      if (foundUser && foundUser.Password === formData.password) {
        // console.log(foundUser.UserID);
        setCookie("userid", foundUser.UserID);
        navigate("/dashboard");
      } else {
        navigate("/error");
      }
    });
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LoginContainer>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "20px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "20px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <SubmitButton type="submit" variant="contained">
            Login
          </SubmitButton>{" "}
          {/* Add type="submit" */}
          <Typography variant="body1" style={{ marginTop: "20px" }}>
            <RegisterButton variant="contained" component={Link} to="/register">
              Register
            </RegisterButton>
          </Typography>
        </form>
      </LoginContainer>
    </Container>
  );
};
export default UserLogin;
