import "bootstrap/dist/css/bootstrap.min.css";
import CreateNewProject from "./CreateNewProject";
import nurseImage from "../Images/genderNeutralWorker.png";
import { UserInfoType } from "./Start";

type ProfileSectionProps = {
  userInfo: UserInfoType;
  //HÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄR
  onRefresh: () => Promise<void>;
};

function ProfileSection({ userInfo, onRefresh }: ProfileSectionProps) {
  const entireSectionStyle = {
    width: "100%",
    height: "140px",
    display: "flex",
    justifyContent: "space-between", // Aligns children at opposite ends
    alignItems: "center", // Aligns children vertically in the middle
    marginBottom: "10px",
  };

  const profileSectionStyle = {
    background: "rgba(255, 255, 255, 0.70)",
    width: "500px",
    height: "130px",
    borderRadius: "10px",
    margin: "0px",
    display: "flex",
    boxShadow: "0px 0px 10px rgba(100, 100, 100, 0.2)",
    fontFamily: "Avenir",
  };

  const buttonSectionStyle = {
    width: "30%",
    height: "140px",
    margin: "0px",
    display: "flex",
    justifyContent: "flex-end",
  };

  const leftDivStyle = {
    flex: "20%",
    padding: "10px",
  };

  const rightDivStyle = {
    marginTop: "2%",
    flex: "60%",
    padding: "10px",
    lineHeight: "0.5",
    marginBottom: "0.1em",
  };

  const circleStyle = {
    width: "110px",
    height: "110px",
    backgroundColor: "white",
    borderRadius: "50%", // Create a circular shape
    display: "flex",
    alignItems: "center", // Center vertically
    justifyContent: "center", // Center horizontally
    marginLeft: "15px",
    boxShadow: "0px 0px 10px rgba(100, 100, 100, 0.2)",
    backgroundImage: `url(${nurseImage})`, // Set the image as background
    backgroundSize: "cover",
  };

  return (
    <div style={entireSectionStyle}>
      <div style={profileSectionStyle}>
        <div style={leftDivStyle}>
          <div style={circleStyle}></div>
        </div>
        <div style={rightDivStyle}>
          <h3>{userInfo.first_name}</h3>
          <p>{userInfo.profession}</p>
          <p>{userInfo.clinic}</p>
        </div>
      </div>
      <div style={buttonSectionStyle}>
        <CreateNewProject onRefreshProjects={onRefresh} />
      </div>
    </div>
  );
}

export default ProfileSection;
