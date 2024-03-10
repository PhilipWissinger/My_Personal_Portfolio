import { useState, ChangeEvent } from "react";
import { Button, Form } from "react-bootstrap";

const buttonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 60px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};

interface cardModalResultMeasurementsProps {
  updatedResultMeasurements: string;
  setUpdatedResultMeasurements: React.Dispatch<React.SetStateAction<string>>;
  projectId: string;
}

function CardModalResultMeasurements({
  updatedResultMeasurements,
  setUpdatedResultMeasurements,
  projectId,
}: cardModalResultMeasurementsProps) {
  const handleResultInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedResultMeasurements(event.target.value);
  };

  return (
    <>
      <Form.Label>
        <b>Uppmätt resultat</b>
        <p style={{ fontSize: "75%", fontStyle: "italic" }}>
          I göra-fasen dokumenterar vi resultaten från mätningarna av
          förbättringen med utgångspunkt i de valda mätetalen. Hur gick
          genomförandet av testerna? Vilka synpunkter, iakttagelser och
          erfarenheter vill vi dokumentera? Vilka händelser och hinder vill vi
          dokumentera?{" "}
        </p>
      </Form.Label>
      <textarea
        className="form-control"
        rows={5}
        value={updatedResultMeasurements}
        onChange={handleResultInputChange}
        placeholder="Skriv resultatet här"
      ></textarea>
    </>
  );
}

export default CardModalResultMeasurements;
