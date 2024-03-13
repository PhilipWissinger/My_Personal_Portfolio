import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// Måste köra detta kommando i terminalen för att CircularProgressBar ska fungera: npm install --save react-circular-progressbar

import {
  Calendar,
  Folder2Open,
  GeoAltFill,
  CheckCircle,
  BarChart,
  Lightbulb,
  Bullseye,
} from "react-bootstrap-icons";
import { tags } from "./CreateNewProject";
import Dropdown from "react-bootstrap/Dropdown";
console.log("taggar", tags);

const iconCircleStyle = {
  borderRadius: "50%",
  width: "25px",
  height: "25px",
  border: "0.5px solid #AEAEAE",
  marginRight: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
};

const buttonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};

const finishButtonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 10px",
  width: "100%",
  border: "none",
  cursor: "pointer",
  marginTop: "15px",
};

const newIdeaButtonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 0px",
  width: "48.9%",
  border: "none",
  cursor: "pointer",
  marginTop: "10px",
  marginLeft: "5px",
};

const sameIdeaButtonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 0px",
  width: "48.9%",
  border: "none",
  cursor: "pointer",
  marginTop: "10px",
  marginRight: "5px",
};

const iconStyle = {
  width: "15px",
  height: "15px",
  marginRight: "7px",
  marginTop: "0px",
};

const flexAndCenter = {
  display: "flex",
  alignItems: "center",
};

const descriptionStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
};

const whiteDescriptionContainerStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E8E7E7",
  borderTop: "none",
  paddingTop: "20px",
  paddingBottom: "10px",
  paddingLeft: "15px",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
};

const tagStyle: React.CSSProperties = {
  marginTop: "5px",

  fontSize: "14px",
  display: "flex",
  flexWrap: "wrap",
};

const tagContainerStyle = {
  backgroundColor: "#051F6E",
  color: "#FFFFFF",
  padding: "2px 10px",
  marginRight: "5px",
  marginBottom: "8px",
  borderRadius: "10px",
  cursor: "pointer",
};

const addTagContainerStyle = {
  backgroundColor: "#A2BCEF",
  color: "#FFFFFF",
  padding: "2px 10px",
  marginRight: "5px",
  marginBottom: "8px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "14px",
  border: "none",
};

const saveTagButtonStyle = {
  backgroundColor: "#051F6F",
  fontSize: "16px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
  width: "100%",
};

interface cardModalTopLeftProps {
  title: string;
  phase: number;
  place: string;
  centrum: string;
  updatedTags: Array<string>;
  setUpdatedTags: React.Dispatch<React.SetStateAction<string[]>>;
  date_created: Timestamp;
  goals: Array<string>;
  ideas: {
    text: string;
    checked: boolean;
  }[];
  measure: Array<string>;
  purpose: string;
  active_tab: number;
  percentage: number;
  handleIdeaClick: (index: number) => void;
  id: string;
  handlePhaseUpdate: (phase: number) => void;
}

interface phasePercentageProps {
  percentage: number;
}

//Function that returns the circular progress bar
function PhasePercentage({ percentage }: phasePercentageProps) {
  return (
    <>
      <div style={{ width: 130, height: 130 }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={{
            path: {
              //Color of the progress circle
              stroke: `rgba(5, 31, 110)`,
            },
            trail: {
              //Color of the circle in the background
              stroke: "#AEAEAE",
            },
            text: {
              fill: "#AEAEAE",
              fontSize: "25px",
            },
          }}
        />
      </div>
    </>
  );
}

//The top left part of the modal containing title, tags, etc. as well as the tabs for purpose, goals, measurements and ideas, the "mark phase as done" button and the circular progress bar
function CardModalTopLeft({
  title,
  phase,
  place,
  centrum,
  updatedTags,
  setUpdatedTags,
  date_created,
  goals,
  measure,
  purpose,
  active_tab,
  percentage,
  ideas,
  handleIdeaClick,
  id,
  handlePhaseUpdate,
}: cardModalTopLeftProps) {
  const formattedDate = date_created.toDate().toLocaleDateString();
  const [showTagModal, setShowTagModal] = useState(false);
  const [newTag, setNewTag] = useState("");

  //Handles the deletion of tags
  const handleRemoveTag = (indexToRemove: number) => {
    const updatedTagsArray = updatedTags.filter(
      (_, index) => index !== indexToRemove
    );
    setUpdatedTags(updatedTagsArray);
  };

  const handleShowTagModal = () => {
    setShowTagModal(true);
  };
  const handleCloseTagModal = () => {
    setShowTagModal(false);
  };

  //Adds the new tag to the tag array when the "lägg till tagg" button is clicked
  const handleSaveTag = (newTag: string) => {
    //Makes sure that the input field is filled before the tag can be added
    if (newTag.trim() !== "") {
      handleCloseTagModal();
      const updatedTagsArray = [...updatedTags, newTag];
      setUpdatedTags(updatedTagsArray);
      setNewTag("");
    }
  };

  return (
    <>
      <div style={{ width: "63%" }}>
        <div
          style={{
            display: active_tab !== 5 ? "flex" : "block",
            marginBottom: "20px",
          }}
        >
          <div style={{ width: "60%" }}>
            <Modal.Title style={{ marginTop: "30px" }}>{title}</Modal.Title>
            <div style={tagStyle}>
              {updatedTags.map((tag, index) => (
                <React.Fragment key={index}>
                  <span style={tagContainerStyle}>
                    {tag.toLowerCase()}
                    <span
                      style={{ marginLeft: "6px" }}
                      onClick={() => handleRemoveTag(index)}
                    >
                      &times;
                    </span>
                  </span>
                </React.Fragment>
              ))}
              <Dropdown key={tags.length}>
                <Dropdown.Toggle style={addTagContainerStyle}>
                  nytt nyckelord
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "100%" }}>
                  {tags.map((tag) => (
                    <Dropdown.Item onClick={() => handleSaveTag(tag)}>
                      {tag}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
              <div style={flexAndCenter}>
                <Calendar style={iconStyle} />
                <div>
                  <label>
                    {"Skapad "}
                    {formattedDate}
                  </label>
                </div>
              </div>
              <div style={flexAndCenter}>
                <Folder2Open style={iconStyle} />
                <div>
                  <label>{centrum}</label>
                </div>
              </div>
              <div style={flexAndCenter}>
                <GeoAltFill style={iconStyle} />
                <div>
                  <label>{place}</label>
                </div>
              </div>
            </div>
          </div>

          {/* The modal that opens up when "add new tag" is clicked */}
          <Modal
            show={showTagModal}
            onHide={handleCloseTagModal}
            style={{ top: "25%", fontFamily: "Avenir" }}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center">
              {/* <div className="mb-3 text-center">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lägg till en tagg..."
                    style={{ fontStyle: "italic" }}
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3 text-center">
                  <Button
                    style={saveTagButtonStyle}
                    onClick={() => handleSaveTag(newTag)}
                  >
                    Lägg till tagg
                  </Button>
                </div> */}
            </Modal.Body>
          </Modal>

          {/* If the active tab is Planera the donut is shown, if not only the "Gå till nästa fas" button is shown */}
          {active_tab === 2 ? ( //If active_tab is plan, show the donut
            <div
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "right",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <PhasePercentage percentage={percentage} />
              <Button
                style={buttonStyle}
                disabled={
                  phase !== active_tab ||
                  ideas.every((idea) => idea.checked === false)
                }
                onClick={() => handlePhaseUpdate(phase)}
              >
                Gå vidare till nästa fas
              </Button>
            </div>
          ) : active_tab === 5 ? ( //If active tab is act, show three different buttons
            <div style={{ marginTop: "20px" }}>
              <Button
                style={finishButtonStyle}
                disabled={
                  phase !== active_tab ||
                  ideas.every((idea) => idea.checked === false)
                }
                onClick={() => handlePhaseUpdate(phase)}
              >
                Är du nöjd med resultatet? Avsluta förbättringsarbete{" "}
                <span style={{ fontSize: "70%", display: "block" }}>
                  {
                    "Du hittar den sparade informationen under alla förbättringsarbeten"
                  }
                </span>
              </Button>
              <Button
                style={sameIdeaButtonStyle}
                disabled={
                  phase !== active_tab ||
                  ideas.every((idea) => idea.checked === false)
                }
                onClick={() => handlePhaseUpdate(6)}
              >
                Påbörja ny PGSA-cykel
                <span style={{ fontSize: "100%", display: "block" }}>
                  med <b>samma</b> idé
                </span>
              </Button>
              <Button
                style={newIdeaButtonStyle}
                disabled={
                  ideas.length === 1 ||
                  phase !== active_tab ||
                  ideas.every((idea) => idea.checked === false)
                }
                onClick={() => handlePhaseUpdate(7)}
              >
                Påbörja ny PGSA-cykel
                <span style={{ fontSize: "100%", display: "block" }}>
                  med <b>annan</b> idé
                </span>
              </Button>
            </div>
          ) : (
            //If active tab is do or study, show only "Markera fas som klar"

            <div
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "right",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <div style={{ width: 130, height: 130 }}></div>
              <Button
                style={buttonStyle}
                disabled={
                  phase !== active_tab ||
                  ideas.every((idea) => idea.checked === false)
                }
                onClick={() => handlePhaseUpdate(phase)}
              >
                Gå vidare till nästa fas
              </Button>
            </div>
          )}
        </div>

        <Form.Group style={descriptionStyle}>
          <Tabs defaultActiveKey="idéer" justify>
            <Tab
              eventKey="syfte"
              title={
                <span style={flexAndCenter}>
                  <div style={iconCircleStyle}>
                    <Bullseye
                      style={{
                        color: "#C71307",
                        width: "15px",
                        height: "15px",
                      }}
                    />
                  </div>
                  Syfte
                </span>
              }
            >
              <div style={whiteDescriptionContainerStyle}>{purpose}</div>
            </Tab>
            <Tab
              eventKey="mål"
              title={
                <span style={flexAndCenter}>
                  <div style={iconCircleStyle}>
                    <CheckCircle
                      style={{
                        color: "#008000",
                        width: "15px",
                        height: "15px",
                      }}
                    />
                  </div>
                  Mål
                </span>
              }
            >
              <div style={whiteDescriptionContainerStyle}>
                {goals ? (
                  <ul style={{ listStyleType: "none", paddingLeft: "4px" }}>
                    {goals.map((item, index) => (
                      <li key={index} style={{ marginBottom: "8px" }}>
                        {"• "}
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Inga mål satta.</p>
                )}
              </div>
            </Tab>
            <Tab
              eventKey="mäta"
              title={
                <span style={flexAndCenter}>
                  <div style={iconCircleStyle}>
                    <BarChart
                      style={{
                        color: "#32308D",
                        width: "15px",
                        height: "15px",
                      }}
                    />
                  </div>
                  Mäta
                </span>
              }
            >
              <div style={whiteDescriptionContainerStyle}>
                {measure ? (
                  <ul style={{ listStyleType: "none", paddingLeft: "4px" }}>
                    {measure.map((item, index) => (
                      <li key={index} style={{ marginBottom: "8px" }}>
                        {"• "}
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Inga mätningar satta.</p>
                )}
              </div>
            </Tab>
            <Tab
              eventKey="idéer"
              title={
                <span style={flexAndCenter}>
                  <div style={iconCircleStyle}>
                    <Lightbulb
                      style={{
                        color: "#D9C515",
                        width: "15px",
                        height: "15px",
                      }}
                    />
                  </div>
                  Idéer
                </span>
              }
            >
              <div style={whiteDescriptionContainerStyle}>
                {ideas.map((idea, index) => (
                  <Form.Check
                    key={index}
                    className="custom-checkbox"
                    type="checkbox"
                    label={idea.text}
                    checked={idea.checked}
                    style={{
                      color: ideas.some((idea) => idea.checked)
                        ? idea.checked
                          ? "#000000"
                          : "#AEAEAE"
                        : "#000000",
                    }} //If no idea is chosen they are all displayed in black, and when an idea has been chosen the chosen one is black while the rest are set tho gray
                    disabled={phase !== 2} //Disable the idea checkboxes if the improvement work's phase is not plan
                    onChange={() => handleIdeaClick(index)}
                  />
                ))}

                {ideas.every((idea) => !idea.checked) ? (
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#C71307",
                      marginTop: "15px",
                    }}
                  >
                    <strong>För att påbörja förbättringsarbetet</strong> måste
                    du trycka i vilken idé som kommer testas under denna
                    PGSA-cykel.
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#008000",
                      marginTop: "15px",
                    }}
                  >
                    Nu kan förbättringsarbetet påbörjas!
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </Form.Group>
      </div>
    </>
  );
}

export default CardModalTopLeft;
