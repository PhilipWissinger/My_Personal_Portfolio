import React, { useState, useEffect} from "react";
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectCard from "./ProjectCard";
import "../styles/DisplayAllProjects.css";
import '../font/font.css';
import {
  ArchiveFilterState, ImprovementWork, filterAll, filterOnTags,
  findCentrumOptions, findClinicOptions, findPlaceOptions, findTagOptions,
  getAllImprovementWorks, sortByDateCreated, sortByOldestDate, sortByTitleAscending,
  sortByTitleDescending, searchImprovementWorks
} from "../ImprovementWorkLib";
import { IoSearchOutline } from "react-icons/io5";
import { ProjectCardProps } from "./ProjectCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/DisplayAllProjects.css";
import "../font/font.css";
import { UserInfoType, fetchUser } from "./Start";
import TitleBox from "./TitleBox";

function DisplayAllProjects() {

  const [allImprovementWorks, setAllImprovementWorks] = useState<ImprovementWork[]>([]);
  const [filteredImprovementWorks, setFilteredImprovementWorks] = useState<ImprovementWork[]>([]);
  const [currentProjects, setCurrentProjects] = useState<ImprovementWork[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8; // Adjust this based on your layout
  const { user } = useAuth0();
  const [totalProjects, setTotalProjects] = useState<number>(0)

  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [placeOptions, setPlaceOptions] = useState<string[]>([]);
  const [clinicOptions, setClinicOptions] = useState<string[]>([]);
  const [centrumOptions, setCentrumOptions] = useState<string[]>([]);
  const [searchTitle, setSearchTitle] = useState<string>('');

  // const closedOptions:string[] = ["all", "open", "closed"]

  const [sortBy, setSortBy] = useState<
    "date_created" | "oldest_date" | "ascending" | "descending">("date_created");

  const [filterState, setFilterState] = useState<ArchiveFilterState>({
    clinic: "all_clinics",
    centrum: "all_centrums",
    tag: "all_tags",
    place: "all_places",
    closed: "all",
    phase: "all_phases"
  });


  const clearFilters = () => {
    setFilterState({
      clinic: "all_clinics",
      centrum: "all_centrums",
      tag: "all_tags",
      place: "all_places",
      closed: "all",
      phase: "all_phases"
    });
  };

  const ButtonStyle: React.CSSProperties = {
        backgroundColor: "#051F6F",
        fontFamily: "Avenir",
        margin: "10px",
        border: "none",
        cursor: "pointer",
        width: "10rem",
    };

  const fetchData = async () => {
    // if (user?.name) {
    const fetchedImprovementWorks: ImprovementWork[] | null = await getAllImprovementWorks();
    setAllImprovementWorks(fetchedImprovementWorks);
    setFilteredImprovementWorks(fetchedImprovementWorks)
    const tags = findTagOptions(fetchedImprovementWorks)
    setTagOptions(tags);
    const places = findPlaceOptions(fetchedImprovementWorks)
    setPlaceOptions(places);
    const clinic = findClinicOptions(fetchedImprovementWorks)
    setClinicOptions(clinic);
    const centrum = findCentrumOptions(fetchedImprovementWorks)
    setCentrumOptions(centrum);
    // }
  };
  useEffect(() => {
    if (filteredImprovementWorks) {
      setTotalProjects(filteredImprovementWorks.length)
      const lastProjectIndex = currentPage * projectsPerPage;
      const firstProjectIndex = lastProjectIndex - projectsPerPage;
      setCurrentProjects(filteredImprovementWorks.slice(firstProjectIndex, lastProjectIndex))
    }
  }, [filteredImprovementWorks]);

  useEffect(() => {
    if (filteredImprovementWorks) {
      const lastProjectIndex = currentPage * projectsPerPage;
      const firstProjectIndex = lastProjectIndex - projectsPerPage;
      setCurrentProjects(filteredImprovementWorks.slice(firstProjectIndex, lastProjectIndex))
    }
  }, [currentPage])

  // for admin func
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null); // Initialize with the type

  useEffect(() => {
    fetchData();

    // Fetch user info to check if admin
    if (user?.name) {
      fetchUser(user.name, user, setUserInfo);
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // denna uppdaterar vilken tag som ska filtreras på.
  const handleTags = (event: any) => {
    setFilterState(prev => ({ ...prev, tag: event.target.value })); //när denna är färdiguppdaterad körs alltså useEffect
  }

  const handlePlace = (event: any) => {
    setFilterState(prev => ({ ...prev, place: event.target.value })); //när denna är färdiguppdaterad körs alltså useEffect
  }

  const handleClinic = (event: any) => {
    setFilterState(prev => ({ ...prev, clinic: event.target.value })); //när denna är färdiguppdaterad körs alltså useEffect
  }

  const handleCentrum = (event: any) => {
    setFilterState(prev => ({ ...prev, centrum: event.target.value })); //när denna är färdiguppdaterad körs alltså useEffect
  }

  const handleClosed = (event: any) => {
    setFilterState(prev => ({ ...prev, closed: event.target.value })); //när denna är färdiguppdaterad körs alltså useEffect
  }

  const handlePhases = (event: any) => {
    setFilterState(prev => ({ ...prev, phase: event.target.value })); //när denna är färdiguppdaterad körs alltså useEffect
  }


  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOption = event.target.value as
      | "date_created"
      | "oldest_date"
      | "ascending"
      | "descending";
    setSortBy(selectedSortOption);

    console.log(sortBy)
    if (selectedSortOption === "oldest_date") {
      const sortedProjects = sortByOldestDate(filteredImprovementWorks);
      console.log(sortedProjects)
      setCurrentProjects(sortedProjects);
      setFilteredImprovementWorks(sortedProjects);
    } else if (selectedSortOption === "date_created") {
      const sortedProjects = sortByDateCreated(filteredImprovementWorks);
      console.log(sortedProjects)
      setCurrentProjects(sortedProjects);
      setFilteredImprovementWorks(sortedProjects);
    } else if (selectedSortOption === "ascending") {
      const sortedProjects = sortByTitleAscending(filteredImprovementWorks);
      setCurrentProjects(sortedProjects);
      setFilteredImprovementWorks(sortedProjects);
    } else if (selectedSortOption === "descending") {
      const sortedProjects = sortByTitleDescending(filteredImprovementWorks);
      setCurrentProjects(sortedProjects);
      setFilteredImprovementWorks(sortedProjects);
    }
  };

  const handleTitleSearch = (searchValue: string) => {
    setSearchTitle(searchValue);
  };

  useEffect(() => {
    const works: ImprovementWork[] = filterAll(allImprovementWorks, filterState, sortBy)
    setFilteredImprovementWorks(works)
  }, [filterState])

  useEffect(() => {
    if (searchTitle) {
      const filteredImprovementWorks: ImprovementWork[] = filterAll(allImprovementWorks, filterState, sortBy)
      const searchedImprovementWorks: ImprovementWork[] = searchImprovementWorks(filteredImprovementWorks, searchTitle, sortBy)
      setFilteredImprovementWorks(searchedImprovementWorks)
    } else {
      if (userInfo) {
        const filteredImprovementWorks: ImprovementWork[] = filterAll(allImprovementWorks, filterState, sortBy)
        console.log("search filter")
        setFilteredImprovementWorks(filteredImprovementWorks)
      }
    }
  }, [searchTitle])

  const contentStyle = {
    marginTop: '20px',
    width: "90%",
    height: "60%",
    marginLeft: "5%", // 5% margin on the left
    marginRight: "5%", // 5% margin on the right
  }

  return (
    <div style={contentStyle}>
      <div className="d-flex">
        <div>
          <TitleBox
            title={"Alla förbättringsarbeten"}
            description="Här kan du bläddra bland pågående projekt och se vilken status de har. \n \n
        Du kan välja vilken avdelning, vårdenhet eller region som projekten ska beröra. Det finns även ett flertal filter att välja bland, som gör att du kan smalna av sökningen och göra resultaten relevanta för vad du söker. \n \n I fritext-rutan kan du skriva in sökord och få resultat relaterade till dem. 
        Projekten dyker upp som kort där en översikt med den viktigaste informationen visas. \n \n Det finns fem olika faser som ett projekt kan befinna sig i och korten flyttas mellan dem i takt med att projektet fortskrider."
          />
          <div className="description" style={{ marginLeft: "2vw" }}>
            <p style={{ fontFamily: 'Avenir', fontStyle: 'italic', fontSize: "110%", fontWeight: "normal" }}>
              Här kan du se alla pågående och avslutade förbättringsarbeten inom regionen.
              <br />
              Använd sök- och filterfunktionerna för att leta efter förbättringsarbeten som du är intresserad av.
            </p>
          </div>
          </div>


        <div className="d-inline-flex ml-auto mr-2">
          <div className="input-group rounded align-self-end">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Sök"
              aria-label="Search"
              aria-describedby="search-addon"
              style={{ width: "20rem" }}
              value={searchTitle}
              onChange={(e) => handleTitleSearch(e.target.value)}
            />
            <IoSearchOutline
              style={{ fontSize: "1.5rem", marginLeft: "0.5rem", marginTop: "0.4rem" }}
            />
          </div>
        </div>
      </div>

      <div className="projects-section">

        <div className="d-flex flex-wrap">
          <div className="ml-2 mt-2">
            {/* <label htmlFor="sortDropdown" className="form-label me-2">
            Sortera:
          </label> */}
            <select
              id="sortDropdown"
              value={sortBy}
              className="form-select"
              aria-label="Filtrera"
              onChange={handleSortChange}
            // style={{ width: "8.5rem" }} // Adjust the width as needed
            >
              <option selected value="date_created">
                Visa senaste
              </option>
              <option value="oldest_date">Visa äldsta</option>
              <option value="ascending">
                Visa a-ö
              </option>
              <option value="descending">Visa ö-a</option>
            </select>
          </div>
          <div className="ml-2 mt-2">
            <select className="form-select" aria-label="Filtrera" value={filterState.closed} onChange={handleClosed}>
              <option selected value="all">Öppna och stängda</option>
              <option value="open">Visa öppna</option>
              <option value="closed">Visa stängda</option>
            </select>
          </div>
          <div className="ml-2 mt-2">
            <select className="form-select" aria-label="Filtrera" value={filterState.phase} onChange={handlePhases}>
              <option selected value="all_phases">Visa alla faser</option>
              <option value="phase_p">P</option>
              <option value="phase_g">G</option>
              <option value="phase_s">S</option>
              <option value="phase_a">A</option>
            </select>
          </div>
          <div className="ml-2 mt-2">
            <select className="form-select" aria-label="Filtrera" value={filterState.tag} onChange={handleTags}>
              <option selected value="all_tags">Visa alla nyckelord</option>
              {
                tagOptions.map((tag) => (
                  <option key={tag} value={tag}> {tag}</option>
                ))
              }
            </select>
          </div>
          <div className="ml-2 mt-2">
            <select className="form-select" aria-label="Filtrera" value={filterState.place} onChange={handlePlace}>
              <option selected value="all_places">Visa alla platser</option>
              {
                placeOptions.map((place) => (
                  <option key={place} value={place}> {place}</option>
                ))
              }

            </select>
          </div>
          <div className="ml-2 mt-2">
            <select className="form-select" aria-label="Filtrera" value={filterState.clinic} onChange={handleClinic}>
              <option selected value="all_clinics">Visa alla kliniker</option>
              {
                clinicOptions.map((clinic) => (
                  <option key={clinic} value={clinic}> {clinic}</option>
                ))
              }

            </select>
          </div>
          <div className="ml-2 mt-2">
            <select className="form-select" aria-label="Filtrera" value={filterState.centrum} onChange={handleCentrum}>
              <option selected value="all_centrums">Visa alla centrum</option>
              {
                centrumOptions.map((centrum) => (
                  <option key={centrum} value={centrum}> {centrum}</option>
                ))
              }
            </select>
          </div>
          <div className="ml-auto d-flex">
          <Button  style={{ ...ButtonStyle}} onClick={clearFilters}>Rensa filter</Button>
          </div>
        </div>
        <div className="projects-container">
          {currentProjects.map((project, index) => (
            <div
              className="col-md-6 col-lg-3"
              style={{ marginRight: "0%", }}
              key={index}
            >
              <div style={{ margin: "1%" }}>
                <ProjectCard
                  title={project.title}
                  date_created={project.date_created}
                  place={project.place}
                  tags={project.tags}
                  phase={project.phase}
                  displayPhaseImage={true}
                  improvementWork={project}
                  isAdmin={userInfo?.admin || false} // Use a default value if userInfo is not available
                  improvementWorkList={allImprovementWorks}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <div style={{ marginLeft: "1px", marginBottom: "5px" }}>
            Antal: <strong>{totalProjects}</strong>
          </div>
          <div className="pagination-buttons">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="pagination-arrow"
              disabled={currentPage === 1}
            >
              {"<"} {/* Left arrow */}
            </button>
            {Array.from({
              length: Math.ceil(totalProjects / projectsPerPage),
            }).map((page, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className="pagination-number"
                style={{
                  backgroundColor:
                    currentPage === index + 1 ? "#051F6E" : "white",
                  color: currentPage === index + 1 ? "white" : "#051F6E",
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="pagination-arrow"
              disabled={
                currentPage === Math.ceil(totalProjects / projectsPerPage)
              }
            >
              {">"} {/* Right arrow */}
            </button>
          </div >
        </div >
      </div >
    </div>
  );
}

export default DisplayAllProjects;
