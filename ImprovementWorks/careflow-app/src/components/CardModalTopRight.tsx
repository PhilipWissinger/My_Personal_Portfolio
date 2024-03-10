import { Button, Dropdown, Form } from "react-bootstrap";
import { getMemberName } from "../ImprovementWorkLib";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { findUserIds } from "./CreateProjectModalHelp";
import { users, usersClassArray } from "./CreateNewProject";


const projectMembersContainer = {
  width: "34%",
  marginTop: "30px",
  marginBottom: "20px",
  marginLeft: "3%",
  background: "#F4F4F4",
  padding: "20px",
  borderRadius: "10px",
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

interface CardModalTopRightProps {
  project_leader: string;
  project_members: Array<string>;
  updatedMembers: Array<string>;
  setUpdatedMembers: React.Dispatch<React.SetStateAction<string[]>>;
  setProjectMembers: React.Dispatch<React.SetStateAction<string[]>>;
}

//The top right part of the modal containing the project leader and project members
function CardModalTopRight({
  project_leader,
  project_members,
  updatedMembers,
  setUpdatedMembers,
  setProjectMembers,
}: CardModalTopRightProps) {
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [newMember, setNewMember] = useState("");
  const [updateMembers, setUpdateMembers] = useState(Array<string>);
  const [membersDisplayed, setMembersDisplayed] = useState(Array<string>);
  const [newMembers, setNewMembers] =  useState(Array<string>);

  //Removes project leader and already added members from the add members list
  let usersList = users.filter((item) => item != project_leader);
  usersList = usersList.filter((item) => !project_members.includes(item));


  //Handles the deletion of member (NOT WORKING YET)
  const handleRemoveMember = (indexToRemove: number) => {
    const updatedMembersArray = updatedMembers.filter(
      (_, index) => index !== indexToRemove
    );
    setUpdatedMembers(updatedMembersArray);
    console.log(updatedMembers);
  };

  const handleShowTagModal = () => {
    setShowMemberModal(true);
  };
  const handleCloseTagModal = () => {
    setShowMemberModal(false);
  };

  //setSelectedMembers(project_members);

  //Adds the new member to the member array when the "lägg till kollegor" button is clicked
  const handleSaveMember = (newMember: string) => {
    console.log(project_members);
    //Makes sure that the input field is filled before the member can be added
    if (newMember.trim() !== "") {
      handleCloseTagModal();
      const updatedMembersArray = [...updateMembers, newMember];

      console.log(updatedMembersArray);
      setUpdateMembers(updatedMembersArray);
      const updatedProjectMemberArray = [
        ...project_members,
        ...updatedMembersArray,
      ];

      setMembersDisplayed(updatedProjectMemberArray);

      //The array of new members added
      setNewMembers(updatedMembersArray);

      //Fetching user IDs for each member
      const userIDs = findUserIds(updatedProjectMemberArray, usersClassArray);

      console.log(userIDs);

      console.log(updatedProjectMemberArray);

      //The new array of members which is sent to the db
      setUpdatedMembers(userIDs);


      setNewMember("");
    }
  };

  return (
    <>
      <div style={projectMembersContainer}>
        <Form.Group>
          <Form.Label>
            <div>
              <b style={{ fontSize: "18px" }}>Förbättringsledare</b>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "20px",
                  fontSize: "15px",
                }}
              >
                {project_leader}
              </div>
              <b style={{ fontSize: "18px" }}>Förbättringsmedlemmar</b>
              {project_members.map((member, index) => (
                <div style={{ marginTop: "10px", fontSize: "15px" }}>
                  {member}
                </div>
              ))}
              {newMembers.map((member, index) => (
                <div style={{ marginTop: "10px", fontSize: "15px" }}>
                  {member}
                </div>
              ))}

              <div>
              <Dropdown style={{ marginBottom: "15px", marginTop: "30px" }}>
            <Dropdown.Toggle
              style={{
                width: "100%",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                border: "1px solid #DDDDDD",
              }}
            >
              Lägg till kollegor
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "100%" }}>
              {
              usersList.map((member) => (
                <Dropdown.Item
                  style={{
                    fontWeight: project_members.includes(member)
                      ? "bold"
                      : "normal",
                  }}
                  onClick={() => 
                    (updatedMembers.includes(member))
                    ? handleRemoveMember(member)
                    : handleSaveMember(member)}
                >
                  {member}
                </Dropdown.Item>
               
              ))}
            </Dropdown.Menu>
          </Dropdown>
              </div>
            </div>
          </Form.Label>
        </Form.Group>
      </div>
    </>
  );
}

export default CardModalTopRight;
