import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardButton from "./CardButton";
import CardModal from "./CardModal";
//import "./ShowCard.css";
import { useSortable } from "@dnd-kit/sortable";
import { ImprovementWork, getMemberName } from "../ImprovementWorkLib";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export var draggable : boolean = true;
export var notDraggable : boolean = true;

interface ShowCardProps {
  improvementWork: ImprovementWork;
  isAdmin: boolean;
  fetchProjects: () => void;
  improvementWorkList: ImprovementWork[];
}

function ShowCard({ improvementWork, isAdmin, fetchProjects, improvementWorkList }: ShowCardProps) {
  // State to track whether the mouse is over the task card
  const [isDraggable, setIsDraggable] = useState(draggable);

  const [show, setShow] = useState(false);

  const modalClose = (data?: any) => {
    setIsDraggable(true);
    draggable=true;
    setShow(false);
    console.log("Modal close Dragbar:", isDraggable);
    //console.log("modalClosed in showcard", show);
    console.log("data sent onHide: (True = load data)", data);
    // If data is true, then fetch projects
    if (data) {
      fetchProjects();
    }
  };

  const modalShow = () => {
    setShow(true);
    console.log("setShow in showcard", show);
  };

  const { isLoading } = useAuth0();
  const [leaderName, setLeaderName] = useState<string | null>(null);
  const [memberNames, setMemberNames] = useState<string[]>([]);
  //const [isDraggable, setIsDraggable] = useState(true);
  const modalToggle = () => {
    setShow((prevShow) => !prevShow); // Toggle the modal state
    setIsDraggable(false);
    draggable=false;
    console.log("setShow in showcard", show);
  };

  useEffect(() => {
    draggable=isDraggable;
    const fetchData = async () => {
      if (isLoading) {
        return;
      }
      try {
        //console.log("Hej");
        const leaderName = await getMemberName(improvementWork.project_leader);
        setLeaderName(leaderName);
        console.log("hämtar från showCard: ");
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
  }, [isDraggable]);

  // UseSortable hook for drag-and-drop functionality
  const { setNodeRef, attributes, listeners, transition, isDragging } =
    useSortable({
      id: improvementWork.id,
      data: {
        type: "ImprovementWork",
        improvementWork,
      },
    });

  // Define the style based on drag-and-drop transition
  const style = {
    transition,
  };

  if (isDragging) {
    // Styling for when the task is being dragged
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
          opacity-30
          bg-mainBackgroundColor p-2.5 h-[10vh] min-h-[140px] w-[15vw] items-center flex text-left rounded-xl border-2 border-blue-500 cursor-grab relative
        "
      />
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>
        <CardButton
          title={improvementWork.title}
          tags={improvementWork.tags}
          date_created={improvementWork.date_created}
          improvementWork={improvementWork}
          isAdmin={isAdmin}
          modalToggle={modalToggle} // send toggle function to cardButton
          fetchProjects={fetchProjects}
        />

        {
          <CardModal
            show={show}
            onHide={modalClose}
            improvementWork={improvementWork}
            improvementWorkList={improvementWorkList}
          />
        }
      </div>
    </div>
  );
}

export default React.memo(ShowCard);
