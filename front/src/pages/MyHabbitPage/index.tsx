import React from "react";
import CustomTabs from "@components/CustomTabs";
import PushedList from "@components/PushedList";
import ContributionGraph from "@components/ContributionGraph";
function MyHabbitPage() {
  return (
    <>
      <CustomTabs />
      <PushedList />
      <ContributionGraph />
    </>
  );
}

export default MyHabbitPage;
