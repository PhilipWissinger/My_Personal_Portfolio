import React, { useEffect, useState, CSSProperties } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { BiComment, BiFileBlank } from "react-icons/bi";
import { GrTextAlignLeft } from "react-icons/gr";
import pImage from "../Images/p.png";
import pgImage from "../Images/pg.png";
import pgsImage from "../Images/pgs.png";
import pgsaImage from "../Images/pgsa.png";
import pgsacImage from "../Images/pgsa_closed_small.png";
import noImage from "../Images/none.png";
import {
  Id,
  ImprovementWork,
  deleteProject,
  getMemberName,
} from "../ImprovementWorkLib";
import CardModal from "./CardModal";
import TrashIcon from "../icons/Trashicon";
import CardDeleteModal from "./CardDeleteModal";

export interface ProjectCardProps {
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

const ProjectCard: React.FC<ProjectCardProps> = ({
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
    height: "180px",
    alignItems: "center" as "center",
  };

  const titleStyle = {
    fontFamily: "Avenir",
    fontWeight: "bold",
    marginBottom: "0rem",
    marginTop: "0.9rem",
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

  const getPhaseImage = (phase: Id) => {
    if (phase === 5 && improvementWork.closed) {
      // Return a specific image or perform an action for this case
      return <img src={pgsacImage} />; // Replace 'someOtherImage' with your desired image
    }
    switch (phase) {
      case 1:
        return <img src={noImage} />; //Förslag
      case 2:
        return <img src={pImage} />; //Planera
      case 3:
        return <img src={pgImage} />;
      case 4:
        return <img src={pgsImage} />;
      case 5:
        return <img src={pgsaImage} />;
    }
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

        console.log("hämtar från ProjectCard:");
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

  const MAX_BADGES_DISPLAYED = 4;
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
            style={{ display: "flex", justifyContent: "space-between" }}
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
            {displayPhaseImage && (
              <div
                style={{ position: "absolute", bottom: "1rem", right: "1rem" }}
              >
                {getPhaseImage(phase)}
              </div>
            )}
          </div>
          <div>
            <div>
              {mouseIsOver && isAdmin && (
                <div>
                  <button
                    onClick={handleButtonClick}
                    className="stroke-black absolute right-4 top-8 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
                  >
                    <TrashIcon />
                  </button>
                  {/* Render CardDeleteModal conditionally */}
                  {showModal && (
                    <CardDeleteModal
                      show={showModal}
                      onHide={handleCloseModal}
                      impWorkId={improvementWork.id.toString()}
                      fetchProjects={() => {}}
                      impWorkName={improvementWork.title}
                    />
                  )}
                </div>
              )}
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

export default ProjectCard;
