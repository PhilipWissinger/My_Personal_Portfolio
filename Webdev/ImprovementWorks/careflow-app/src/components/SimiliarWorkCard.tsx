import React, { useEffect, useState, CSSProperties } from "react";
import Card from "react-bootstrap/Card";
import {
  Id,
  ImprovementWork,
  deleteProject,
  getMemberName,
} from "../ImprovementWorkLib";
import CardModal from "./CardModal";

export interface SimiliarWorkCardProps {
  title: string;
  date_created: any;
  place: string;
  tags: string[];
  phase: Id;
  displayPhaseImage?: boolean;
  improvementWork: ImprovementWork;
  isAdmin: boolean;
  improvementWorkList: ImprovementWork[]; // passing the list of all improvementworks
}
const MAX_BADGES_DISPLAYED = 1;

const SimiliarWorkCard: React.FC<SimiliarWorkCardProps> = ({
  title,
  date_created,
  place,
  tags,
  phase,
  displayPhaseImage,
  improvementWork,
  isAdmin,
  improvementWorkList,
}) => {
  const cardBodyStyle = {
    minheight: "180px",
    alignItems: "center" as "center",
  };

  const titleStyle = {
    display: "flex",
    fontFamily: "Avenir",
    fontWeight: "bold",
    marginBottom: "0rem",
    marginTop: "0.9rem",
    whiteSpace: "normal" as "normal", // allows text wrapping
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const badgeStyle = {
    fontFamily: "Avenir",
    marginTop: "5px",
    marginBottom: "10px",
    marginRight: "0.3rem",
    backgroundColor: "#051F6E",
    color: "white",
    fontSize: "12px",
    borderRadius: "10px",
    padding: "2px 10px",
  };
  const iconContainerStyle = {
    display: "flex",
    alignItems: "center",
  };
  const tagsContainerStyle: CSSProperties = {
    display: 'flex',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  const formatDate = (timestamp: any) => {
    if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString("sv-SE"); // Handle if it's already a Date
    }
    return timestamp.toDate().toLocaleDateString("sv-SE");
  };

  const [show, setShow] = useState(false);
  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  const modalToggle = () => {
    setShow((prevShow) => !prevShow); // Toggle the modal state
    console.log("setShow in showcard", show);
  };

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const handleMouseEnter = () => {
    setMouseIsOver(true);
    //console.log(`Hovered over ${title} card`);
  };

  const handleMouseLeave = () => {
    setMouseIsOver(false);
    //console.log(`Left ${title} card`);
  };

  const [showModal, setShowModal] = useState(false); // State variable to control modal visibility

  const handleButtonClick = () => {
    setShowModal(true); // Show the modal when the button is clicked
    console.log("Trash icon clicked!", isAdmin);
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal when needed
    console.log("modalClose");
  };


  const [leaderName, setLeaderName] = useState<string | null>(null);
  const [memberNames, setMemberNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderName = await getMemberName(improvementWork.project_leader);
        setLeaderName(leaderName);

        console.log("hämtar från SimiliarWorkCard:");
        const names = await Promise.all(
          improvementWork.project_members.map(
            async (member) => await getMemberName(member)
          )
        );

        const filteredNames = names.filter(
          (name) => name !== null
        ) as Array<string>;
        setMemberNames(filteredNames);
      } catch (error) {
        console.error("Error fetching member names:", error);
      }
    };

    // fetchData();
  }, []);

  const renderedTags = tags.length > MAX_BADGES_DISPLAYED ? tags.slice(0, MAX_BADGES_DISPLAYED) : tags;
  const additionalTagsCount = tags.length - MAX_BADGES_DISPLAYED;

  return (
    <div>
      <Card
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "pointer" }}
      >
        <Card.Body style={cardBodyStyle}>
          <div
            style={{ height: "200px", justifyContent: "space-between" }}
            onClick={modalToggle}
          >
            <div>
            <div style={tagsContainerStyle}>
              {renderedTags.map((tag, index) => (
                <span key={index} style={badgeStyle}>{tag}</span>
              ))}
              {additionalTagsCount > 0 && (
                <span style={badgeStyle}>+ {additionalTagsCount}</span>
              )}
            </div>
              <Card.Title style={titleStyle}>{title}</Card.Title>
              <Card.Text
                style={{
                  fontFamily: "Avenir",
                  marginBottom: tags && tags.length > 0 ? "2.4rem" : "3.8rem",
                }}
              >
                {formatDate(date_created)}
              </Card.Text>

              <Card.Text style={{ fontFamily: "Avenir", margin: "0rem" }}>
                <span
                  role="img"
                  aria-label="Pin Emoji"
                  style={{ fontSize: "15px" }}
                >
                  📍
                </span>
                {place}
              </Card.Text>
            </div>
          </div>
          <div></div>
        </Card.Body>
      </Card>

      {
        <CardModal
          show={show}
          onHide={modalClose}
          improvementWork={improvementWork}
          improvementWorkList={improvementWorkList}
        />
      }
    </div>
  );
};

export default SimiliarWorkCard;
