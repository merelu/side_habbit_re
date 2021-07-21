import React from "react";
import { Container } from "@material-ui/core";
import UserForm from "@components/UserForm";

function RegisterPage() {
  return (
    <Container
      maxWidth="lg"
      style={{
        height: "calc(100% - 64px)",
        display: "flex",
        flexDirection: "column",
        background: "#f4f6f8",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserForm />
    </Container>
  );
}

export default RegisterPage;
