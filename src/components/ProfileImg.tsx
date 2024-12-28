import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../modal/user";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ProfileImg: React.FC = () => {
  const userProfileString = localStorage.getItem("user") ?? "";
  const userInfo: User | undefined =
    userProfileString != "" ? JSON.parse(userProfileString) : undefined;

  if (userInfo && userInfo.profileImageUrl) {
    return (
      <img
        src={userInfo.profileImageUrl}
        alt="Profile"
        width={40}
        height={40}
      />
    );
  } else {
    return <FontAwesomeIcon icon={faUser} />;
  }
};

export default ProfileImg;
