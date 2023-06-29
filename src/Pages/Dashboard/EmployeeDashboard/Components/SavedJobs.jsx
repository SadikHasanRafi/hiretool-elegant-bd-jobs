import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../Context/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SavedJobs = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(null);
  const [savedJobs, setSavedJobs] = useState()
  const navigate = useNavigate();


  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-single-employee/${uid}`);
        setEmployeeData(response.data.payload.employee);
        const employeeSavedJobs = response.data.payload.employee.savedJobs;
        let arr = [];
  
        if (employeeSavedJobs.length === 0) {
          setSavedJobs(null);
        } else {
          await Promise.all(employeeSavedJobs.map(async (job) => {

            const res = await axios.get(`http://localhost:5000/get-all-saved-jobs/${job}`)
            console.log(res)            
            arr.push(res.data);
          }));
        }

        setSavedJobs(arr)
  
        console.log("arr is ",arr);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  
    fetchEmployeeData();
  }, [uid]);
  
  const handleShowDetails = (_id) =>{
    console.log(_id);
    navigate(`/${_id}`);
  }

  return (
    <div>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <p>Saved jobs</p>
        {savedJobs.map((savedJob, index) => (
          <div key={index}>
            <p>{index + 1}. {savedJob.jobTitle}</p>
            <button onClick={() => handleShowDetails(savedJob._id)} className="btn btn-outline btn-primary">See Details</button>
          </div>
        ))}
        {/* Display employeeData or other content */}
      </div>
    )}
  </div>
  );
};

export default SavedJobs;
