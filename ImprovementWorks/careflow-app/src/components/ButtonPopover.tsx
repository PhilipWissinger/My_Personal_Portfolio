import React from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

interface ButtonPopoverProps {
    title:string
  content: string;
  text: string; // Add text prop
  position?: "right" | "left" | "top" | "bottom"; // Add position prop
}

const ButtonPopover: React.FC<ButtonPopoverProps> = ({
    title,
  content,
  text,
  position = "right",
}) => {
  const formattedDescription = content.replace(/\\n/g, "\n");
  const formattedText = text.replace(/\\n/g, "\n");
  const popoverContent = (
    <Popover
      id={`popover-positioned-${position}`}
      title={`Popover ${position}`}
      style={{ padding: "10px", whiteSpace: "pre-line" }}
    >
        <strong>{title}</strong>
      {formattedDescription}
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement={position}
      overlay={popoverContent}
    >
      <div style={{ marginBottom: "3px" ,padding:"5px"}}>{formattedText}</div>
    </OverlayTrigger>
  );
};

export default ButtonPopover;