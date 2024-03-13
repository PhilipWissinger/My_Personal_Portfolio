import React, { FC } from "react";
import HelpPopover from "./HelpPopover";

interface TitleBoxProps {
  title: string;
  description: string;
}

const TitleBox: FC<TitleBoxProps> = ({ title, description }) => {
  const titleBoxStyle: React.CSSProperties = {
    display: "inline-block",
    borderRadius: "7px",
    backgroundColor: "transparent",
    padding: "0vh 0vw",
    marginLeft: "2vw",
    color: "black", // You may want to change the text color for better visibility
    fontFamily: "Avenir",
    fontWeight: "bold",
    fontSize: "1.7rem",
    marginBottom: "0px",
    alignItems: "baseline",
    //border:"dotted"
  };

  // Replace "\n" with newline characters
  //const formattedDescription = description.replace(/\\n/g, "\n");

  return (
    <>
      <div style={{ display: "flex", alignItems: "baseline" }} >
        <div style={titleBoxStyle}>
          <h2>{title}</h2>
         {/*
          <div style={{ marginLeft: "10px", flex: "none" ,alignItems: "baseline", display: "block",}}>
          <HelpPopover content={formattedDescription} /> 
        </div>
*/}
        </div>


      </div>

    </>
  );
};

export default TitleBox;
