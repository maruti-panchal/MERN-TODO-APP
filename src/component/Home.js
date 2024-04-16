import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { css } from "@emotion/react";

const buttonStyles = css`
  background-color: #03a9f4;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #0288d1;
  }
`;

const Home = () => {
  return (
    <Container
      maxWidth="sm"
      css={{
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="body1" gutterBottom style={{ marginBottom: "30px" }}>
        Choose an option to continue:
      </Typography>
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          marginStart: "20px",
        }}
      >
        <Button
          component={Link}
          to="/login"
          variant="contained"
          css={[buttonStyles, { marginRight: "10px" }]}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          css={buttonStyles}
        >
          Register
        </Button>
      </div>
    </Container>
  );
};

export default Home;
