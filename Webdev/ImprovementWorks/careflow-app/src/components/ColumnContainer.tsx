import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Project } from "../types";
import { useMemo } from "react";
import PlusIcon from "../icons/Plusicon";
import "../styles/Kanban.css";
import ShowCard from "./ShowCard";
import HelpPopover from "./HelpPopover";
import { ImprovementWork } from "../ImprovementWorkLib";
import Modal from "react-bootstrap/Modal";
import IdeasSection from "./IdeasSection";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserInfoType, fetchUser } from "./Start";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  column: Column;
  improvementWorkList: ImprovementWork[];
  isAdmin: boolean;
  fetchProjects: () => void;
}

function ColumnContainer({
  column,
  improvementWorkList,
  isAdmin,
  fetchProjects,
}: Props) {
  // Memoize task IDs for use in SortableContext
  const tasksIds = useMemo(() => {
    return improvementWorkList.map((improvementWork) => improvementWork.id);
  }, [improvementWorkList]);

  const [showModal, setShowModal] = useState(false);

  const { user } = useAuth0();

  const handlePlusClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // UseSortable hook for drag-and-drop functionality
  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null); // Initialize with the type

  useEffect(() => {
    // Fetch user info to check if admin
    if (user?.name) {
      //console.log(user);
      fetchUser(user.name, user, setUserInfo);
      console.log("User info:", userInfo);
    }
  }, []);

  // Count the number of tasks in the  column
  const taskCount = improvementWorkList.length;

  // Render the column
  return (
    <div ref={column.id === 1 ? null : setNodeRef} className="kanban-column">
      <div className="kanban-columnTitle">
        <div className="flex gap-2">
          {column.title}
          {column.id === 1 && (
            <div onClick={handlePlusClick} className="plus-icon-hover">
              <PlusIcon />
            </div>
          )}
        </div>

        <HelpPopover content={column.columnDescription} position="top" />
      </div>
      <div className="kanban-tasksContainer">
        <SortableContext items={tasksIds}>
          {improvementWorkList.map((improvementWork) => (
            <ShowCard
              key={improvementWork.id}
              improvementWork={improvementWork}
              isAdmin={isAdmin}
              fetchProjects={fetchProjects}
              improvementWorkList={improvementWorkList}
            />
          ))}
        </SortableContext>
      </div>
      <div className="kanban-footerButton">Antal: {taskCount}</div>

      <Modal
        show={showModal}
        onHide={handleClose}
        dialogClassName="custom-modal-width"
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "100%" }}>
          {userInfo && (
            <IdeasSection
              userInfo={userInfo}
              width={"100%"}
              add_height="260px"
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ColumnContainer;
