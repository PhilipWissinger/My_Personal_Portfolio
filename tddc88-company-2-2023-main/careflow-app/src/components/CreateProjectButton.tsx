import { Button } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";

const ButtonStyle: React.CSSProperties = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "16px",
  padding: "20px",
  border: "none",
  cursor: "pointer",
  marginBottom: "0px",
  display: "flex", // Added for inline elements
  alignItems: "center", // Added to align items vertically
};

interface CreateProjectButtonProps {
  onClick: () => void;
}

function CreateProjectButton({ onClick }: CreateProjectButtonProps) {
  return (
    <Button id="NyttFörbättringsarbete" onClick={onClick} style={ButtonStyle}>
      <PlusLg style={{ width: "20px", height: "20px", marginRight: "10px" }} />
      Nytt förbättringsarbete
    </Button>
  );
}

export default CreateProjectButton;
