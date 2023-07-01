import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  // const [badgeClass, setBadgeClass] = useState("")

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-single-user-info?uid=${user.uid}`);
        const data = await response.json();
        if (data.previousNotificationCount !== undefined && Array.isArray(data.calledForInterview) && data.previousNotificationCount !== data.calledForInterview.length) {
          localStorage.setItem("badge","badge badge-primary")
        }
        console.log(data)
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [user.uid]);

  return (
    <div>
      {userInfo ? (
       <>
        <p>Email: {userInfo.email}</p>
        <p>Role: {userInfo.role}</p>
       </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default MyProfile;
