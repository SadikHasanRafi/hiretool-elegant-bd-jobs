import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import CompanyDashboard from "./CompanyDashboard/CompanyDashboard";
import EmployeeDashboard from "./EmployeeDashboard/EmployeeDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard/SuperAdminDashboard";
import Loading from "../Shared/Loading";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("employee")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user-type?uid=${user.uid}`);
        const data = await response.json();
        // Process the retrieved data here
        console.log(data.role);
        setRole(data.role)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false when API call is finished
      }
    };

    fetchData();

    // Clean-up function
    return () => {
      // Perform clean-up tasks if needed
    };
  }, []);

//   const role="company"

  return (
    <div>
    {isLoading ? (
      <Loading></Loading>
    ) : (
      <>
        {role === "superAdmin" ? (
          <SuperAdminDashboard />
        ) : role === "company" ? (
          <CompanyDashboard />
        ) : (
          <EmployeeDashboard />
        )}
      </>
    )}
  </div>
  );
};

export default Dashboard;
