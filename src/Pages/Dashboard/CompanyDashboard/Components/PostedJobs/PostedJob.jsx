/* eslint-disable react/prop-types */
import  'react';
import { useContext, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { JobContext } from '../../../../../Context/JobsProvider';
import axios from 'axios';
import { AuthContext } from '../../../../../Context/AuthProvider';



const PostedJob = ({job}) => {

    const {_id,uid,jobTitle,whoApplied} = job
    const {setEmployeesWhoAppliedForThisJob,setSelectedJobForShowEmployeeDetailsPage} = useContext(JobContext)
    const {user} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    // console.log(job)

    const handleOnClick =() =>{
        // console.log(whoApplied)
        if (whoApplied.length===0) {
            // console.log("array length is zero")
            toast.error("No one applied for this job.")
        }else{
            // localStorage.setItem('whoApplied', JSON.stringify(whoApplied));
            setEmployeesWhoAppliedForThisJob(whoApplied)
            setSelectedJobForShowEmployeeDetailsPage(_id)
        }
    }

    const handleDeleteJob = async () => {
        setIsLoading(true); // Set loading state to true

        try {
      
          const response = await axios.delete(`http://localhost:5000/delete-a-job?job_id=${_id}&companyUID=${user.uid}`);

          console.log("Deleted job:", response);
      
          // Perform any necessary actions after successful deletion
      
        } catch (error) {
          console.error("Error deleting job:", error);
        } finally {
          setIsLoading(false); // Set loading state to false
          window.location.reload(); // Refresh the page

        }
      };
      

    return (
        <div>
           <p> Job title:  <strong>{jobTitle}</strong></p>
            <p>job mongo id is -{_id}- and its uid is -{uid}-.</p>

{
    whoApplied.length===0 ?
    <Link to="/dashboard/show-who-applied"><button disabled onClick={handleOnClick} className='inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75'>Show who applied for that jobs  <div className="badge badge-secondary">{whoApplied.length}</div></button></Link>
    :
    <Link to="/dashboard/show-who-applied"><button onClick={handleOnClick} className='inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75'>Show who applied for that jobs  <div className="badge badge-secondary">{whoApplied.length}</div></button></Link>
}            <Toaster/>
        






<button className="group relative inline-block focus:outline-none focus:ring" onClick={handleDeleteJob} >
  <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-red-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
  <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
  Delete this job
  </span>
</button>


        
        </div>
    );
};

export default PostedJob;