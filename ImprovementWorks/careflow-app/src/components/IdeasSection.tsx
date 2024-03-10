import React from "react";
import { FormControl, Container, Button } from "react-bootstrap";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import { UserInfoType } from "./Start";
import HelpPopover from "./HelpPopover";
import rightArrow from "../Images/right-arrow.png";

type IdeasSectionProps = {
  userInfo: UserInfoType;
  width: string;
  add_height: string;
};

function IdeasSection({ userInfo, width, add_height }: IdeasSectionProps) {
  // You can define your project data here
  const ideasSectionStyle = {
    background: "rgba(255, 255, 255, 0.70)",
    height: add_height,
    borderRadius: "10px",
    // margin: "10px",
    // marginLeft: "20px",
    paddingLeft: "15px",
    paddingTop: "10px",
    marginTop: "0px",
    width: width,
    boxShadow: "0px 0px 10px rgba(100, 100, 100, 0.2)",
  };

  const ButtonStyle: React.CSSProperties = {
    backgroundColor: "#051F6F",
    fontFamily: "Avenir",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    width: "30%",
  };

  const titleStyle = {
    fontFamily: "Avenir",
    fontWeight: "bold",
    // marginBottom: "1.5rem",
    fontSize: "23px",
  };

  const ideaInputStyle = {
    maxHeight: "60px",
  };

  const [ideaValue, setIdeaValue] = React.useState("");
  const [isSent, setIsSentValue] = React.useState(false);
  const { isAuthenticated } = useAuth0();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIdeaValue(event.target.value);
  };

  const handleClick = async () => {
    if (isAuthenticated) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
      const day = String(currentDate.getDate()).padStart(2, "0");
      await addDoc(collection(db, "suggestions"), {
        centrum: userInfo.centrum,
        clinic: userInfo.clinic,
        date_created: year + "-" + month + "-" + day,
        description: ideaValue,
        place: userInfo.place,
      });
      setIdeaValue("");
      setIsSentValue(true);
      const timer = setTimeout(() => {
        setIsSentValue(false);
      }, 3000); // 3000 milliseconds (3 seconds)
      return () => clearTimeout(timer);
    }
  };

  return (
    <div style={ideasSectionStyle}>
      <div className="d-flex">
        <h1 className="mt-2 ml-2 flex-grow-1" style={titleStyle}>
          Förslagslåda
        </h1>
        {/* <div className="mt-2 mr-2">
          <HelpPopover content="Har du ett förslag på ett förbättringsarbete? \n Här kan du skicka in ditt förslag så kommer en ansvarig se över ditt förslag. Idéerna är anonyma." />
        </div> */}
      </div>
      <p className="ml-2" style={{ fontFamily: "Avenir", fontSize: "15px" }}>
        Saknar du tid eller en detaljerad plan för ett förbättringsarbete?
        <br />
        Skicka in ditt förslag här! Förslaget hamnar bland mina
        förbättringsarbeten.
      </p>
      <Container className="my-3" style={{ marginLeft: "-4px" }}>
        <FormControl
          as="textarea"
          value={ideaValue}
          onChange={handleChange}
          placeholder="Beskriv ditt förslag med en mening här."
          style={ideaInputStyle}
        />
        <div className="d-flex flex-row-reverse">
          {ideaValue == "" ? (
            <Button
              style={{
                ...ButtonStyle,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="mt-2"
              disabled
            >
              {/* <img src={rightArrow} alt="Arrow" style={{ width: "20px", height: "20px", marginRight: "10px" }}/> */}
              Skicka
              <img
                src={rightArrow}
                alt="Arrow"
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "10px",
                  filter: "invert(100%)",
                }}
              />
            </Button>
          ) : (
            <Button
              onClick={handleClick}
              style={{
                ...ButtonStyle,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="mt-2"
            >
              {/* <img src={rightArrow} alt="Arrow" style={{ width: "20px", height: "20px", marginRight: "10px" }}/> */}
              Skicka
              <img
                src={rightArrow}
                alt="Arrow"
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "10px",
                  filter: "invert(100%)",
                }}
              />
            </Button>
          )}
          {isSent == true ? (
            <p className="m-2 mt-3" style={{ color: "#051F6F" }}>
              Förslag skickat!
            </p>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

export default IdeasSection;
