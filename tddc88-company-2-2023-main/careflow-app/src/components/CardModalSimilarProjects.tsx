import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import {
  UserFilterState,
  ImprovementWork,
  filterForUser,
  findTagOptions,
  filterOnTags,
} from "../ImprovementWorkLib";
import ProjectsSection from "./ProjectsSection";
import SimiliarWorkCard from "./SimiliarWorkCard";

const whiteContainerStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E8E7E7",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "15px",
  borderRadius: "10px",
};

const formGroupStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
};

const projectsContainerStyle = {
  display: "flex" as "flex",
  flexDirection: "row" as "row",
  maxWidth: "100%", // Set a maximum width to prevent overflowing
  overflowX: "auto" as "auto",
  paddingBottom: "1rem",
};

interface similarImprovementWorksProps {
  tags: Array<string>;
  improvementWorkList: ImprovementWork[];
  title: string;
}

function CardModalSimilarProjects({
  tags,
  improvementWorkList,
  title,
}: similarImprovementWorksProps) {
  let allFilteredImprovementWorks: ImprovementWork[] = [];

  // Loop through each tag and filter projects for each one
  tags.forEach((tag) => {
    let filteredImprovementWorksForTag = filterOnTags(improvementWorkList, tag, "date_created");
    // Combine the results, avoiding duplicates
    filteredImprovementWorksForTag.forEach((work) => {
      if (!allFilteredImprovementWorks.some((fWork) => fWork.id === work.id)) {
        allFilteredImprovementWorks.push(work);
      }
    });
  });

  // filter out the current project from the results
  let displayedImprovementWorks: ImprovementWork[] = allFilteredImprovementWorks.filter(
    (improvementWork) => improvementWork.title !== title
  );
  if (displayedImprovementWorks.length > 0) {
    return (
      <>
        <Form.Group style={formGroupStyle}>
          <Form.Label>
            <b>Liknande förbättringsarbeten</b>
          </Form.Label>
          <div style={whiteContainerStyle}>
            <div style={projectsContainerStyle}>
              {displayedImprovementWorks != null
                ? displayedImprovementWorks.map((improvementWork, index) => (
                    <div
                      className="col-md-6 col-lg-3"
                      style={{ marginRight: "1%" }}
                      key={index}
                    >
                      <SimiliarWorkCard
                        title={improvementWork.title}
                        date_created={improvementWork.date_created}
                        place={improvementWork.place}
                        tags={improvementWork.tags}
                        phase={improvementWork.phase}
                        displayPhaseImage={false}
                        improvementWork={improvementWork}
                        isAdmin={false}
                        improvementWorkList={improvementWorkList}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </Form.Group>
      </>
    );
  } else return <></>;
}

export default CardModalSimilarProjects;
