import React from "react";
import { styled } from "@mui/system";

const Header = styled("header")({
  backgroundColor: "#03a9f4",
  color: "#fff",
  padding: "20px 0",
  textAlign: "center",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
});

const H1 = styled("h1")({
  fontSize: "2rem",
  fontWeight: "bold",
  margin: 0,
});

const TodoHeader = () => {
  return (
    <Header>
      <H1>To Do App</H1>
    </Header>
  );
};

export default TodoHeader;
