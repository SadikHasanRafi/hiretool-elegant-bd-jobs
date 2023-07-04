import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../../Context/AuthProvider";
import CompanyNotification from "./CompanyNotification";
import Loading from "../../../../Shared/Loading";

const CompanyInfoComponent = () => {
  const [dataForNotifications, setDataForNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notification");
        const companies = response.data.resultCompany;
        const company = companies.find((c) => c.uid === user.uid);

        setDataForNotifications(company.appointmentDetails);
      } catch (error) {
        console.error("Error fetching company info:", error);
      } finally {
        setIsLoading(false); // Set loading state to false after data is fetched or if there's an error
      }
    };

    fetchData(); // Initial API call

    const interval = setInterval(fetchData, 30000); // API call every 1 minutes

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading></Loading> // Show loading indicator only for the initial API call
      ) : (
        <div>
          <p>compnay notifications</p>
          {dataForNotifications.map((notification, i) => {
            return (<CompanyNotification
              key={i}
              index={i}
              notification={notification}
            ></CompanyNotification>)
          })}

     

        </div>
      )}
    </div>
  );
};

export default CompanyInfoComponent;
