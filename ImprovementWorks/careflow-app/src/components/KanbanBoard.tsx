import { useState, useContext, useEffect } from "react";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import "../styles/Kanban.css";
import { ProjectContext } from "./Projects";
import { doc, updateDoc } from "firebase/firestore";
import ShowCard from "./ShowCard";
import { db } from "../firebase";
import { ImprovementWork } from "../ImprovementWorkLib";

import {draggable} from "./ShowCard";



const columns: Column[] = [
  {
    id: 1,
    title: "Förslag",
    columnDescription:
      "Här finns inskickade förslag som ej är påbörjade förbättringsarbeten. Klicka på ett kort för att se mer information och eventuellt påbörja en PGSA-cykel.",
  },
  {
    id: 2,
    title: "Planera",
    columnDescription:
      "I planeringsfasen tar vi fram en plan för vad som ska göras utifrån den idén vi har valt samt de mål och mått som vi har identifierat. Vi planerar hur det ska göras samt när och vem som ska genomföra det. Sist agerar vi på de framtagna punkterna.",
  },
  {
    id: 3,
    title: "Göra",
    columnDescription:
      "I denna fas genomför vi mätningarna och testerna som i studera-fasen ska studeras. Vi fångar fakta genom synpunkter, iakttagelser och erfarenheter. \n Här noterar vi även problem och oväntade händelser samt tar del av erfarenheter. Det är viktigt att se till att de som är involverade förstår problemet och vilka förbättringar som ska utföras.",
  },
  {
    id: 4,
    title: "Studera",
    columnDescription:
      "I studera fasen så analyserar vi och jämför resultatet med vårt mål och eventuella mätetal. Vi använder eventuellt olika statistiska metoder för att studera resultatet. \n När en positiv effekt uppnåtts och kvaliteten förbättrats, utvärderar vi behovet av fortsatta kontroller för att se till att förbättringarna bibehålls.",
  },
  {
    id: 5,
    title: "Agera",
    columnDescription:
      "I sista fasen tar vi hand om lärdomar från genomförandet. Vi summerar och reflekterar över de lärdomar vi kommit fram till. Vi tar ställning till om förbättringen ska förkastas, vi vill göra ett till varv med samma idé men justerat eller med en av våra andra idéer. \n \n Om vi nått önskat resultat, så kanske förbättringar ska implementeras som den är. Även då behövs en plan för det fortsätta arbetet. Vi tar också beslut om att sprida förbättringen och utanför den egna enheten.",
  },
];


function KanbanBoard() {

  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error(
      "KanbanBoard must be used within a ProjectContext Provider"
    );
  }
  const {
    improvementWorkList,
    setImprovementWorkList,
    isAdmin,
    fetchProjects,
  } = context;
  const [activeImprovementWork, setActiveImprovementWork] =
    useState<ImprovementWork | null>(null);

 
   const sensors =
    useSensors(
       useSensor(PointerSensor, {
         activationConstraint: {
          distance: 10,
        }
        }
       ));
      


  return (
    <div className="board">
      <img
        className="background-gradient"
        alt=""
        src="./background-gradient.jpeg"
      />
      <div className="board-container">
        <div className="column-group">
          {/* Render the column where column.id === 1 outside the DndContext */}
          {columns
            .filter((col) => col.id === 1)
            .map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                improvementWorkList={improvementWorkList.filter(
                  (ImprovementWork) =>
                    ImprovementWork.phase === col.id && !ImprovementWork.closed
                )}
                isAdmin={isAdmin}
                fetchProjects={fetchProjects}
              />
            ))}

          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          >
            <div className="column-group">
              {/* Render all other columns inside the DndContext */}
              {columns
                .filter((col) => col.id !== 1)
                .map((col) => (
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    improvementWorkList={improvementWorkList.filter(
                      (ImprovementWork) =>
                        ImprovementWork.phase === col.id &&
                        !ImprovementWork.closed
                    )}
                    isAdmin={isAdmin}
                    fetchProjects={fetchProjects}
                  />
                ))}
            </div>

            {createPortal(
              <DragOverlay>
                {activeImprovementWork && (
                  <ShowCard
                    improvementWork={activeImprovementWork}
                    isAdmin={isAdmin}
                    fetchProjects={fetchProjects} improvementWorkList={[]}                  />
                )}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        </div>
      </div>
    </div>
  );

 


  // Update function for dragdrop
  async function updateImprovementWork(id: any, newColumn: any) {
    const userDoc = doc(db, "improvementWorks", id);
    const newFields = { phase: newColumn };
    
    console.log("updateImprovementWork in db");
    await updateDoc(userDoc, newFields);
  }

  function onDragStart(event: DragStartEvent) {
    console.log("Försöker dra: ", draggable);
    if (event.active.data.current?.type === "ImprovementWork" && draggable==true) {
      setActiveImprovementWork(event.active.data.current.improvementWork);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveImprovementWork(null);
    console.log("Försöker släppa: ", draggable);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
    //console.log("DRAG END");
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAImprovementWork =
      active.data.current?.type === "ImprovementWork";
    const isOverAImprovementWork =
      over.data.current?.type === "ImprovementWork";

    if (!isActiveAImprovementWork) return;

    // Dropping a Task over another Task
    if (isActiveAImprovementWork && isOverAImprovementWork && draggable==true) {
      setImprovementWorkList((improvementWorkList) => {
        const activeIndex = improvementWorkList.findIndex(
          (t) => t.id === activeId
        );
        const overIndex = improvementWorkList.findIndex((t) => t.id === overId);

        let newImprovementWorkList;
        if (
          improvementWorkList[activeIndex].phase !==
          improvementWorkList[overIndex].phase
        ) {
          improvementWorkList[activeIndex].phase =
            improvementWorkList[overIndex].phase;
          newImprovementWorkList = arrayMove(
            improvementWorkList,
            activeIndex,
            overIndex - 1
          );
        } else {
          newImprovementWorkList = arrayMove(
            improvementWorkList,
            activeIndex,
            overIndex
          );
        }

        //console.log("DROPPING PROJECT OVER another task", { activeIndex });

        // Update the project in the database after reassigning to a new phase or position
        updateImprovementWork(
          activeId,
          improvementWorkList[activeIndex].phase
        ).catch((error) => {
          console.error(
            "Kanban - Failed to update project phase in Firestore:",
            error
          );
        });

        return newImprovementWorkList;
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // dropping a Task over a column
    if (isActiveAImprovementWork && isOverAColumn && draggable==true) {
      setImprovementWorkList((improvementWorkList) => {
        const activeIndex = improvementWorkList.findIndex(
          (t) => t.id === activeId
        );

        improvementWorkList[activeIndex].phase = overId;
        //console.log("DROPPING PROJECT OVER COLUMN", { activeIndex });
        return arrayMove(improvementWorkList, activeIndex, activeIndex);
      });

      // `overId` is the new phase for the project
      // uppdate the prodject phase in the database
      updateImprovementWork(activeId, overId).catch((error) => {
        console.error(
          "Kanban - Failed to update project phase in Firestore:",
          error
        );
      });
    }
  }

  /*
  //function to update phase in view (not db)
  function updateImprovementWorkPhase(
    improvementWork: ImprovementWork,
    newPhase: number
  ) {
    const newImprovementWorks = improvementWorkList.map((work) => {
      if (work.id !== improvementWork.id) return work;
      return { ...work, phase: newPhase };
    });
    setImprovementWorkList(newImprovementWorks);
    console.log("Update improvementWork phase in UI");
  }
  */
}


export default KanbanBoard;
