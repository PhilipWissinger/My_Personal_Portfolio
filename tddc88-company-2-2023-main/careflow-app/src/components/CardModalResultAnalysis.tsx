import { useState, ChangeEvent } from "react";
import { Button, Form } from "react-bootstrap";

const formGroupStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
};

const buttonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 60px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};

interface cardModalResultAnalysisProps {
  updatedResultAnalysis: string;
  setUpdatedResultAnalysis: React.Dispatch<React.SetStateAction<string>>;
  projectId: string;
}

function CardModalResultAnalysis({
  updatedResultAnalysis,
  setUpdatedResultAnalysis,
  projectId,
}: cardModalResultAnalysisProps) {
  const handleResultInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedResultAnalysis(event.target.value);
  };

  return (
    <>
      <Form.Group style={formGroupStyle}>
        <Form.Label>
          <b>Analys av resultat</b>
          <p style={{ fontSize: "75%", fontStyle: "italic" }}>
            I studera-fasen analyserar vi utfallet av den genomförda
            förbättringen. Hur blev resultatet av förbättringen? Skiljer det sig
            från det ursprungliga målet? Utgå ifrån de uppsatta målen och
            mätetalen.{" "}
          </p>
        </Form.Label>
        <textarea
          className="form-control"
          rows={3}
          value={updatedResultAnalysis}
          onChange={handleResultInputChange}
          placeholder= "Skriv analys här"
        ></textarea>
      </Form.Group>
    </>
  );
}

export default CardModalResultAnalysis;
