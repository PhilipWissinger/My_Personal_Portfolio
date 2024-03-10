import { useState, ChangeEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { FileX } from "react-bootstrap-icons";

const buttonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 60px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};

interface cardModalNotesProps {
  notes: string;
  setUpdatedNotes: React.Dispatch<React.SetStateAction<string>>;
}

function CardModalNotes({ notes, setUpdatedNotes }: cardModalNotesProps) {
  const handleNotesInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedNotes(event.target.value);
  };

  return (
    <>
      <Form.Label>
        <b>Övriga anteckningar</b>
        <p style={{ fontSize: "75%", fontStyle: "italic" }}>
          Vill du anteckna något ytterligare som kan vara bra att veta i denna
          fas? Skriv dina anteckningar i fältet nedan.
        </p>
      </Form.Label>
      <textarea
        className="form-control"
        rows={3}
        value={notes}
        onChange={handleNotesInputChange}
        placeholder="Skriv anteckningar här"
      ></textarea>
    </>
  );
}

export default CardModalNotes;
