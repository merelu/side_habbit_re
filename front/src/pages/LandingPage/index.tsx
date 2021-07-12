import HeroSection from "@components/HeroSection";
import InfoSection from "@components/ServiceSection";
import { Container } from "@material-ui/core";

function LandingPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg ,#4a06a3 25% , #6908e8)",
      }}
    >
      <HeroSection />
      <InfoSection />
    </div>
  );
}

export default LandingPage;
