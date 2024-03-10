import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HelpPopover from "./HelpPopover";
import ProjectCard from "./ProjectCard";
import { ImprovementWork, UserFilterState, getAllImprovementWorks } from "../ImprovementWorkLib";
import { UserInfoType } from "./Start";

type FinishedProjectsSectionProps = {
  userInfo: UserInfoType;
  allImprovementWorks: ImprovementWork[];
};

function FinishedProjectsSection({ userInfo, allImprovementWorks }: FinishedProjectsSectionProps) {
  // const [improvementWorks, setImprovementWorks] = useState<ImprovementWork[] | null>([]);
  const [displayedImprovementWorks, setDisplayedImprovementWorks] = useState<ImprovementWork[] | null>([]);
  const [filterState, setFilterState] = useState<UserFilterState>({
    includeUser: true,
    includeClinic: true,
    includeCentrum: true,
    tagFilter: "all_tags",
    placeFilter: "all_places",
    closed: true
  });

  const fetchData = async () => {
    // const fetchedImprovementWorks: ImprovementWork[] | null = await getUserImprovementWorks(userInfo.hsaID, true)
    // if (fetchedImprovementWorks) setImprovementWorks(fetchedImprovementWorks)

    //Bug searching - getUserImprovementWorks(userInfo.hsaID, true) does not exist plus other functions in improvementWorkLib.tsx
     // const fetchedImprovementWorks: ImprovementWork[] | null = await getAllImprovementWorks()
    // if (fetchedImprovementWorks) 
    //console.log(fetchedImprovementWorks); 
    //setDisplayedImprovementWorks(fetchedImprovementWorks)
  };

  const handleFilter = async (event: any) => {
    if (event.target.value == "user") {
      // const filteredImprovementWorks: ImprovementWork[] | null = await getUserImprovementWorks(userInfo.hsaID, true)
      // if (filteredImprovementWorks) setImprovementWorks(filteredImprovementWorks)
    } else if (event.target.value == "clinic") {
      // const filteredImprovementWorks: ImprovementWork[] = await filterImprovementWorks(event.target.value, userInfo.clinic, true)
      // setImprovementWorks(filteredImprovementWorks)
    }
  };

  useEffect(() => {
//Bug searching, code below was already commented. findUserImprovementWorks removed/does not exist in ImprovementWorkLib.tsx?


   // fetchData();
    // const userImprovementWorks: ImprovementWork[] | null =
    //   findUserImprovementWorks(userInfo.hsaID, improvementWorks, true);
    // setDisplayedImprovementWorks(userImprovementWorks);
  }, []);

  const projectsSectionStyle = {
    background: "rgba(255, 255, 255, 0.70)",
    width: "94.5%",
    height: "20rem",
    borderRadius: "10px",
    // margin: "20px",
    padding: "10px",
    overflowX: "auto" as "auto",
    boxShadow: "0px 0px 10px rgba(100, 100, 100, 0.2)",
    //Added to match kanban board
    marginLeft: "2%",
    marginRight: "2%",
  };

  //Bug Fix Added .finished-projects-section className to only apply scroll behaviour on this compontent
  const scrollBarStyles = `
    .finished-projects-section ::-webkit-scrollbar {
        width: 8px;
    }

    .finished-projects-section ::-webkit-scrollbar-thumb {
        background: #A9A9A9;
        border-radius: 4px;  
    }

    .finished-projects-section ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 2px; 
    }
`;

  const projectsContainerStyle = {
    display: "flex" as "flex",
    flexDirection: "row" as "row",
    maxWidth: "100%", // Set a maximum width to prevent overflowing
    overflowX: "auto" as "auto",
    paddingBottom: "1rem",
  };

  const titleStyle = {
    fontFamily: "Avenir",
    marginLeft: "10px",
    marginTop: "10px",
    marginBottom: "1.5rem",
    fontSize: "2rem",
  };

  return (
    //Added className
    <div className= "finished-projects-section" style={projectsSectionStyle}>
      <style>{scrollBarStyles}</style>
      <div className="d-flex">
        <h1 className="mt-2 ml-2" style={titleStyle}>
          Avslutade förbättringsarbeten
        </h1>
        <div className="ml-2 mt-2">
          <select
            className="form-select"
            aria-label="Filtrera"
            onChange={handleFilter}
            style={{ cursor: "pointer" }}
          >
            <option selected value="user">
              Visa mina
            </option>
            <option value="clinic">Visa klinikens</option>
          </select>
        </div>
        <div className="mt-3 ml-2">
          <HelpPopover content="Här kommer det vara en informationsruta som hjälper användaren att navigera bland avslutade projekt" />
        </div>
      </div>

      <div style={projectsContainerStyle}>
        {displayedImprovementWorks !== null
          ? displayedImprovementWorks.map((improvementWork, index) => (
              <div
                className="col-md-6 col-lg-3"
                style={{ marginRight: "1%" }}
                key={index}
              >
                <ProjectCard
                  title={improvementWork.title}
                  date_created={improvementWork.date_created}
                  place={improvementWork.place}
                  tags={improvementWork.tags}
                  phase={improvementWork.phase}
                  displayPhaseImage={true}
                  improvementWork={improvementWork}
                  isAdmin={userInfo.admin}
                  improvementWorkList={allImprovementWorks}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default FinishedProjectsSection;
