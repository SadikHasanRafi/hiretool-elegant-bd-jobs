import { useContext, useEffect, useState } from "react";
import { JobContext } from "../../../../../Context/JobsProvider";
import {  useNavigate } from "react-router-dom";

const EmployeesAppliedForJob = () => {
  // eslint-disable-next-line no-unused-vars
  const { getEmployeesWhoAppliedForThisJob } = useContext(JobContext);
  const [employeeData, setEmployeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const appliedEmployees = await getEmployeesWhoAppliedForThisJob();
        setEmployeeData(appliedEmployees);
        setIsLoading(false);
        console.log(appliedEmployees);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    getData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleButtonOnlick = (email) =>{
    localStorage.setItem("selectedEmployeeEmail", email);
    navigate("/dashboard/show-employee-details")
    
}

  return (
    <div>
      <p>Number of people applied for this jobs is {employeeData.length}</p>

      {employeeData.map((employee) => (
        <div key={employee.uid}>
            <button onClick={()=>handleButtonOnlick(employee.email)} className="btn bg-green-300 btn-outline rounded-none">{employee.email}</button>
        </div>
      ))
      }
    </div>
  );
};

export default EmployeesAppliedForJob;
