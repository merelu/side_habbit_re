import HeroSection from "@components/HeroSection";
import { Container } from "@material-ui/core";

function LandingPage() {
  return (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        paddingTop: "10px",
        height: "calc(100% - 64px)",
        background: "linear-gradient(180deg ,#4a06a3 25% , #6908e8)",
      }}
    >
      <HeroSection />
    </Container>
  );
}

export default LandingPage;
