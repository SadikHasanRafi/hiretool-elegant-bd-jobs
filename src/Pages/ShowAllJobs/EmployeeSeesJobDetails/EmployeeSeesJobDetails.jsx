/* eslint-disable no-unused-vars */
import axios from "axios";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import { useContext, useEffect, useState } from "react";

const EmployeeSeesJobDetails = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    const param = useParams()    
    const {_id}= param
    const {uid} = user
    const [applyStatus, setApplyStatus] = useState(null);
    const [jobDetails, setJobDetails] = useState(null);
    const [companyDetails, setCompanyDetails] = useState({})
    const [getPostedJobsByThisCompany, setGetPostedJobsByThisCompany] = useState([])
    const [needToRender, setNeedToRender] = useState(false)
    const [loadingPostOtherJobsByThisCompany, setLoadingPostOtherJobsByThisCompany] = useState(false)

    useEffect(() => {
        const fetchJobData = async () => {
        try {
            setLoadingPostOtherJobsByThisCompany(true)
            const id = param._id
            const response = await axios.get(`http://localhost:5000/get-single-job-details-employee/${id}`);
            setJobDetails(response.data);
            const getCompanyDetails = await axios.get(`http://localhost:5000/get-company-for-employee/${response.data.uid}`);
            setCompanyDetails(getCompanyDetails.data)
            const getPostedJobsByThisCompanyk = await axios.get(`http://localhost:5000/get-other-posted-jobs-by-this-company/${getCompanyDetails.data.uid}`);
            setGetPostedJobsByThisCompany(getPostedJobsByThisCompanyk.data)
            console.log(getPostedJobsByThisCompanyk.data)
        } catch (error) {
            console.error(error);
        }finally{
            setNeedToRender(false)
            setLoadingPostOtherJobsByThisCompany(false)
        }
        };

        fetchJobData();
    }, [needToRender]);

    useEffect(() => {
        let timer;

        if (applyStatus === "warning"||applyStatus==="success") {
            timer = setTimeout(() => {
                setApplyStatus(null);
            }, 5000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [applyStatus]);

    if (!jobDetails) {
        return <p>Loading job data...</p>;
      }

    const {salaryRange,whoApplied,jobTitle,location,postedDate,jobDescription,industry,experienceLevel,companyName,categories} = jobDetails
    
    
    const handleApplyJob =async () => {
        const applyData = {
            _id:_id,
            applyStatus:false
        }

      const response = await axios.post("http://localhost:5000/set-employee-apply-job", { _id, uid });
        if (response.data==="UpdatedJob") {
            setApplyStatus("success");
        }else if(response.data ==="You already applied here..."){
            setApplyStatus("warning");
        }
    }


    const handleShowDetails  = (_id) => {
        console.log(_id);
        setNeedToRender(true)
        navigate(`/${_id}`);
    }

    return (
        <div>
            <p>{jobTitle}</p>
            <p>company name is : <strong>{companyDetails?.companyName}</strong></p>
            <button onClick={handleApplyJob} className="btn glass bg-purple-200">Apply jobs</button>
















            {applyStatus === "success" && (
                <div className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Successfully applied...</span>
                </div>
            )}

            {applyStatus === "warning" && (
                <div className="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>You already applied here...</span>
                </div>
            )}


{
  loadingPostOtherJobsByThisCompany ? (
    <p>Loading</p>
  ) : (
    getPostedJobsByThisCompany.length === 1 ? (
      <p>No posted jobs available</p>
    ) : (
      getPostedJobsByThisCompany.map((postedJob, index) => (
        <div key={index}>
          <p>{index + 1}. Posted job name is {postedJob.jobTitle} and its id is {postedJob._id}</p>
          <button className="btn btn-warning" onClick={() => handleShowDetails(postedJob._id)}>Show Details</button>
        </div>
      ))
    )
  )
}




                {
                    getPostedJobsByThisCompany.length === 0 && <p>No jobs posted by this company</p>
                }





      



        </div>
    );
};

export default EmployeeSeesJobDetails;