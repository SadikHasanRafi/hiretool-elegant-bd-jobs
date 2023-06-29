/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthProvider';
import { JobContext } from '../../../../Context/JobsProvider';

const ShowEmployeeDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [resetButtonLoading, setResetButtonLoading] = useState(false);
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const {user} = useContext(AuthContext)//company data here you have company uid
  const {selectedJobForShowEmployeeDetailsPage} = useContext(JobContext) // here we probably have job _id
  const [buttonDisable,setButtonDisable] = useState(false)
  let params = useParams();



  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      // Retrieve the email from local storage
      const email = localStorage.getItem('selectedEmployeeEmail');

      
      if (email) {
        try {
          // Send a request to the API endpoint with the email
          const response = await axios.get(`http://localhost:5000/get-single-user-info?email=${params.email}`);
          const employeeData = response.data;
          console.log(employeeData);
          setEmployee(employeeData);


          // const responseEmployee = await axios.get(`http://localhost:5000/get-single-employee-info?employeeUID=${response.data.uid}`)
          // console.log("let button disable employee data",responseEmployee.data)
          // responseEmployee.data.calledForInterview.forEach((interview) => {
          //     if (interview?.job_id===selectedJobForShowEmployeeDetailsPage) {
          //       // console.log("job mongo id is ",interview?.job_id);
          //       setButtonDisable(true)
          //     }
          // });
          
          

          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching employee details:', error);
        }
      }
    };



    fetchEmployeeDetails();

  }, []);

  const handleBackButtonClick = () => {
    // Remove the data from local storage
    localStorage.removeItem('selectedEmployeeEmail');
    // Navigate user to previous page
    navigate(-1);
  };

  const handleFormSubmit =async (e) => {
    e.preventDefault();
    const data = {
      employeeUID:employee.uid,
      interviewTime:{
        interviewDate:interviewDate,
        interviewTime:interviewTime
      },
      companyUID:user.uid,
      job_id:selectedJobForShowEmployeeDetailsPage
    }
    // eslint-disable-next-line no-unused-vars
    const result =await axios.put("http://localhost:5000/update-add-an-array",data)
    console.log('Interview Date:', interviewDate);
    console.log('Interview Time:', interviewTime);
    console.log('job id from employee details page:', selectedJobForShowEmployeeDetailsPage);
    console.log(result.status)
    if (result.status==200) {
      setButtonDisable(true)
    }
  };


  const handleRemoveButtonClick = async () => {
    setResetButtonLoading(true); // Set loading state
    try {
      const data = {
        employeeUID: employee.uid,
        job_id: selectedJobForShowEmployeeDetailsPage,
        companyUID:user.uid
      };
      const result = await axios.put('http://localhost:5000/remove-array-item', data);
      console.log('Remove result:', result.data);
      // Add any additional logic after removing the item
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setResetButtonLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Employee details page</p>
          <p>{employee.email}</p>
          <p>{employee.role}</p>
          <p>{employee.uid}</p>
          <p>Job id is {selectedJobForShowEmployeeDetailsPage}</p>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="interviewDate">Interview Date:</label>
              <input
                type="date"
                id="interviewDate"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="interviewTime">Interview Time:</label>
              <input
                type="time"
                id="interviewTime"
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
              />
            </div>
            {
              buttonDisable ?
              <button disabled className='inline-block rounded bg-red-300 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-red-300' type="submit">Submit</button>
              :
              <button className='inline-block rounded bg-green-300 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-green-300' type="submit">Submit</button>
            }
          </form>
          <button className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500' onClick={handleBackButtonClick}>
            Back
          </button>

          {
            resetButtonLoading ?
            <button
            className="inline-block rounded bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-red-500"
            onClick={handleRemoveButtonClick}
          >
            <span className="loading loading-dots loading-sm"></span>
          </button>
            :
            <button
            className="inline-block rounded bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-red-500"
            onClick={handleRemoveButtonClick}
          >
            Remove
          </button>
          }

        </>
      )}
    </div>
  );
};

export default ShowEmployeeDetails;
