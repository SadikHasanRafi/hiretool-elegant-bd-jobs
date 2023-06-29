import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import axios from "axios";
import Notification from "./Notification/Notification";

const EmployeeNotifications = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;
  const [loading, setLoading] = useState(true);
  const [employeeNotification, setEmployeeNotification] = useState([]);

  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/get-single-employee/${uid}`);
        setEmployeeNotification(response.data?.payload?.employee?.calledForInterview || []);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEmployeeInfo();
  }, [uid]);

  useEffect(() => {
    const fetchCompanyData = async () => {

      try {
        let companyArray = []
        setLoading(true);
        // eslint-disable-next-line no-unused-vars
        const companiesData = await Promise.all(
          employeeNotification.map(async (company) => {
            const response = await axios.get(`http://localhost:5000/get-company-details/${company.appointmentCompanyUID}`);
            return response.data;
          })
        );
        // Do something with the companiesData array (e.g., set state)
        companyArray.push(companiesData)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [employeeNotification]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Notification employeeNotification={employeeNotification} />
      )}
    </div>
  );
};

export default EmployeeNotifications;
