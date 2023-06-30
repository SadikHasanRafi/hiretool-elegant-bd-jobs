import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const ApprovalPage = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-company-details/${user.uid}`);
        const data = response.data;
        console.log(data.approval);
        setIsApproved(data?.approval);
        setIsRejected(data?.isRejected);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      // Perform clean-up tasks if needed
    };
  }, [user.uid]);

  const handleOnClick = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {isApproved && isRejected === "2" ? (
            <>
              <p>Approved</p>
              <button className="btn btn-outline" onClick={handleOnClick}>Go to dashboard</button>
            </>
          ) : isRejected === "1" ? (
            <div>
              <p>You have been rejected by the authority. For more details</p>
              <Link to="/contact-us"><button>Contact us</button></Link>
            </div>
          ) : isRejected === "0" ? (
            <p>We will soon approve your joining request</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ApprovalPage;
