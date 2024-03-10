import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { doc, getDoc } from "firebase/firestore";
import ProfileSection from "./ProfileSection";
import ProjectsSection from "./ProjectsSection";
// import IdeasAndProgressSection from "./IdeasAndProgressSection";
import { db } from "../firebase";
import IdeasSection from "./IdeasSection";
import ProgressSection from "./ProgressSection";
import {
  ImprovementWork,
  getAllImprovementWorks,
  getUser2,
} from "../ImprovementWorkLib";
import "../styles/LoadingSpinner.css";

export type UserInfoType = {
  hsaID: string;
  admin: any;
  centrum: any;
  clinic: any;
  email: any;
  first_name: any;
  phone_number: any;
  place: any;
  profession: any;
  sur_name: any;
};

function Start() {
  const startStyle = {
    backgroundColor: "white",
  };

  const contentStyle = {
    marginTop: "20px",
    width: "90%",
    height: "60%",
    marginLeft: "5%", // 5% margin on the left
    marginRight: "5%", // 5% margin on the right
  };

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null); // Initialize with the type
  const [improvementWorks, setImprovementWorks] = useState<
    ImprovementWork[] | null
  >(null);

  async function fetchData() {
    if (user?.name) {
      fetchUser(user.name, user, setUserInfo);

      const improvementWorks: ImprovementWork[] | null =
        await getAllImprovementWorks();
      if (improvementWorks !== null) {
        setImprovementWorks(improvementWorks);
      } else {
        console.error("Failed to fetch improvement works");
      }
    }
  }
  //HÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄR
  const refreshImprovementWorks = async () => {
    // Assuming you have a method to fetch the latest improvement works
    const updatedImprovementWorks = await getAllImprovementWorks();
    setImprovementWorks(updatedImprovementWorks);
  };

  function Spinner() {
    return (
      <div className="spinner-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  useEffect(() => {
    // if (isLoading) {
    //   return;
    // }
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [isAuthenticated]);

  return (
    <div>
      <img
        className="background-gradient"
        alt=""
        src="./background-gradient.jpeg"
      />
      {isAuthenticated && userInfo && improvementWorks ? (
        <div style={contentStyle}>
          <ProfileSection
            userInfo={userInfo}
            onRefresh={refreshImprovementWorks}
          />

          {/* <CreateNewProject /> */}
          <ProjectsSection
            title={"Pågående förbättringsarbeten"}
            userInfo={userInfo}
            allImprovementWorks={improvementWorks}
            showClosed={false}
            questionmark={false}
          />
          <div className="d-flex mr-2 w-100" style={{ marginBottom: "2%" }}>
            <IdeasSection
              userInfo={userInfo}
              width={"42%"}
              add_height="250px"
            />
            <ProgressSection improvementWorks={improvementWorks} />
          </div>
          {/* <FinishedProjectsSection userInfo={userInfo} improvementWorks={improvementWorks} /> */}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Start;

//fetches the user data from database, based on the hsa-ID
export async function fetchUser(hsaId: string, user: any, setUserInfo: any) {
  const docRef = doc(db, "users", hsaId);
  const docSnap = await getUser2(docRef);

  if (docSnap.exists()) {
    if (user?.name) {
      const userData: UserInfoType = {
        hsaID: user.name,
        admin: docSnap.data().admin,
        centrum: docSnap.data().centrum,
        clinic: docSnap.data().clinic,
        email: docSnap.data().email,
        first_name: docSnap.data().first_name,
        phone_number: docSnap.data().phone_number,
        place: docSnap.data().place,
        profession: docSnap.data().profession,
        sur_name: docSnap.data().sur_name,
      };
      setUserInfo(userData);
    }
    // console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
