import React from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { QuestionCircleFill } from "react-bootstrap-icons";
import { NewLineKind } from "typescript";

interface HelpPopoverProps {
  content: string;
  position?: "right" | "left" | "top" | "bottom"; // Add position prop
}

const QuestionmarkStyle = {
  marginRight: "10px",
  marginBottom: "3px",
  color: "#051F6F",
  width: "25px",
  height: "25px",
};



const HelpPopover: React.FC<HelpPopoverProps> = ({
  content,
  position = "right",
}) => {
  const formattedDescription = content.replace(/\\n/g, "\n");
  const popoverContent = (
    <Popover
      id={`popover-positioned-${position}`}
      title={`Popover ${position}`}
      style={{ padding: "10px" , whiteSpace: "pre-line"}}
    >
      {formattedDescription}
    </Popover>
  );
 
  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement={position}
      overlay={popoverContent}
    >
      <QuestionCircleFill style={QuestionmarkStyle}></QuestionCircleFill>
    </OverlayTrigger>
  );
};

export default HelpPopover;
