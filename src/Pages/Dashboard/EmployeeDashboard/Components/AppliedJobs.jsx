import  { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../../../Context/AuthProvider';
import axios from 'axios';

const AppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-employee-applied-jobs/${uid}`);
        setAppliedJobs(response.data.appliedJobs);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [uid]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Applied Jobs</p>
      {appliedJobs.map((jobID) => (
        <AppliedJob key={jobID} jobID={jobID} />
      ))}

    </div>
  );
};

export default AppliedJobs;




const AppliedJob =(props ) => {

    const {jobID} = props
    const [loading, setLoading] = useState(true);
    const [appliedJobDetails, setAppliedJobDetails] = useState({})    

    useEffect(() => {
        const fetchAppliedJobs = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/get-single-job-details-employee/${jobID}`);
            setAppliedJobDetails(response.data);
            setLoading(false);
            console.log(response.data);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };
    
        fetchAppliedJobs();
      }, [jobID]);
    
      if (loading) {
        return <p>Loading...</p>;
      }


    return (
        <div>
          <p>{appliedJobDetails.jobTitle}</p>
          {/* Render applied jobs here */}
          
        </div>
      );

}