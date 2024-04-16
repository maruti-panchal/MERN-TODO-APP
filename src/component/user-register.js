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
  Person as PersonIcon,
  Phone as PhoneIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import axios from "axios";

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

const UserRegister = () => {
  let navigate = useNavigate();
  const [formdata, setFormData] = useState({
    UserName: "",
    UserID: "",
    Email: "",
    Mobile: "",
    Password: "",
  });
  function handleChange(e) {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  }
  function submitHandle(e) {
    e.preventDefault();
    console.log(formdata);
    axios
      .post(`http://127.0.0.1:3001/register-user`, formdata)
      .then((response) => {
        console.log("API Response:", response.data);
        alert("Registred Successfull...");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
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
          Register
        </Typography>
        <form onSubmit={submitHandle}>
          <TextField
            id="username"
            label="Username"
            name="UserName"
            onChange={handleChange}
            value={formdata.UserName}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "20px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="userid"
            name="UserID"
            label="User ID"
            variant="outlined"
            onChange={handleChange}
            value={formdata.UserID}
            fullWidth
            sx={{ marginBottom: "20px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="email"
            label="Email"
            onChange={handleChange}
            name="Email"
            value={formdata.Email}
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
            id="mobile"
            label="Mobile Number"
            name="Mobile"
            onChange={handleChange}
            value={formdata.Mobile}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "20px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="password"
            label="Password"
            value={formdata.Password}
            name="Password"
            onChange={handleChange}
            type="password"
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
            Register
          </SubmitButton>
          <Typography variant="body1" style={{ marginTop: "20px" }}>
            <RegisterButton variant="contained" component={Link} to="/login">
              Login
            </RegisterButton>
          </Typography>
        </form>
      </LoginContainer>
    </Container>
  );
};

export default UserRegister;
