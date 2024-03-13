import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "react-bootstrap/ProgressBar";

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { ImprovementWork, getGoals } from "../ImprovementWorkLib";

type ProgressSectionProps = {
  // userInfo: UserInfoType;
  improvementWorks: ImprovementWork[] | null;
};

function ProgressSection({ improvementWorks }: ProgressSectionProps) {
  const [completedProjects, setCompletedProjects] = useState<number>(0);
  const [goal, setGoal] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true); //True while loading data from firebase
  const [goalNotFound, setGoalNotFound] = useState<boolean>(true); //True when no active year/goal in firebase, or more than one active goal

  //test
  const progressSectionStyle = {
    background: "rgba(255, 255, 255, 0.70)",
    width: "56%",
    height: "250px",
    borderRadius: "10px",
    //padding: "10px",
    margin: "0px",
    paddingTop: "20px",
    marginLeft: "2%",
    fontFamily: "Avenir",
    boxShadow: "0px 0px 10px rgba(100, 100, 100, 0.2)",
  };

  const innerProgressSectionStyle = {
    height: "150px",
    borderRadius: "10px",
    backgroundColor: "white",
    margin: "20px",
    padding: "10px",
    paddingTop: "20px",
    paddingLeft: "20px",
    border: "1px solid #E8E7E7",
    //boxShadow: "0px 0px 10px rgba(100, 100, 100, 0.2)",
  };

  const headingStyle = {
    // other styles...
    marginTop: "25px", // Adjust this value as needed
    fontStyle: "italic",
    fontSize: "17px",
  };

  // Function to fetch data on goal for current year
  async function getGoal() {
    const q = query(collection(db, "goals"));
    const querySnapshot = await getGoals(q);
    let activeGoals: number = 0;

    querySnapshot.forEach((doc) => {
      if (doc.data().active === true) {
        //Current year is marked as active in firestore, year and goal set from admin page?
        activeGoals++;
        setGoal(doc.data().goal);
        setYear(doc.data().year);
        return doc.data().goal, doc.data().year;
      }
    });
    if (activeGoals === 1) {
      setGoalNotFound(false); //Prevent render on progress when no active goal or more than one active goal
    }
    return 0;
  }

  //Function to count all completed projects
  async function countProjects() {
    setCompletedProjects(0); // Set count to 0 in case function is run again during runtime

    if (improvementWorks) {
      improvementWorks.forEach((improvementWork) => {
        //Loop through all projects
        if (
          improvementWork.closed &&
          year === improvementWork.date_created.toDate().getFullYear()
        ) {
          //Only increase counter on completed projects
          setCompletedProjects((prev) => prev + 1); //Set counter to +1. Prev is used for react to render after database read
        }
      });
    }
  }

  useEffect(() => {
    if (year != 0 && goal != 0) {
      countProjects();
      setLoading(false); // Set loading to false when data is loaded
    } else if (year == 0 && goal == 0) {
      getGoal();
    }
  }, [year]);

  return (
    /* 
    - Render loading when data is not fetched yet. 
    - Don't render year variable if goal data is not found/invalid
    - Don't render progress bar and info if goal data is not found/invalid
    - If goal <= 0, show 100% goal completion
 
    */
    <div style={progressSectionStyle}>
      {loading ? (
        <p>Loading data</p>
      ) : (
        <>
          <h2
            style={{
              fontSize: "23px",
              fontWeight: "bold",
              paddingLeft: "20px",
            }}
          >
            Framsteg för Region Östergötland under{" "}
            {goalNotFound ? <p> </p> : <>{year}</>}{" "}
          </h2>

          <div style={innerProgressSectionStyle}>
            <h4
              style={{
                fontSize: "20px",
              }}
            >
              Avslutade förbättringsarbeten: {completedProjects}
            </h4>
            <>
              {goalNotFound ? (
                <p>No active goal</p>
              ) : (
                <>
                  <ProgressBar
                    animated
                    now={goal <= 0 ? 100 : (completedProjects / goal) * 100}
                    label={`${(goal <= 0
                      ? 100
                      : (completedProjects / goal) * 100
                    ).toFixed(2)}%`}
                    style={{ height: "20px", width: "99%" }}
                  />
                  <h5 style={headingStyle}>
                    Mål till 31 December {year}: {goal}
                  </h5>
                </>
              )}
            </>
          </div>
        </>
      )}
    </div>
  );
}

export default ProgressSection;
