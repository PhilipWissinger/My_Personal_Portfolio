import { Button } from "react-bootstrap";

const ButtonStyle: React.CSSProperties = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "20px",
  top: "320px",
  left: "860px", // Adjust this as needed to position your button
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  position: "absolute",
  display: "flex", // Added for inline elements
  alignItems: "center", // Added to align items vertically
};

interface ContinueButtonProps {
  onClick: () => void;
}

function ContinueButton({ onClick }: ContinueButtonProps) {
  return (
    <Button id="NyttFörbättringsarbete" onClick={onClick} style={ButtonStyle}>
      <img
        src="./Plus.png"
        alt="Image"
        style={{ width: "20px", height: "20px", marginRight: "10px" }}
      />
      Fortsätt där jag slutade
    </Button>
  );
}

export default ContinueButton;
