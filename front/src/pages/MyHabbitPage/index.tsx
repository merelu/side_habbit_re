import React from "react";
import CustomTabs from "@components/CustomTabs";
import PushedList from "@components/PushedList";
import ContributionGraph from "@components/ContributionGraph";
import { Container } from "@material-ui/core";
function MyHabbitPage() {
  return (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg ,#4a06a3 25% , #6908e8)",
      }}
    >
      <CustomTabs />
      <PushedList />
      <ContributionGraph />
    </Container>
  );
}

export default MyHabbitPage;
