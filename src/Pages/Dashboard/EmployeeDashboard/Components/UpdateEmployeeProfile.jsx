/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";


const UpdateEmployeeProfile = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [employmentStartDate, setEmploymentStartDate] = useState('');
  const [employmentEndDate, setEmploymentEndDate] = useState('');

  const [preferredJobLocation, setPreferredJobLocation] = useState("");
  const [desiredJobTitle, setDesiredJobTitle] = useState("");

  
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/get-single-employee/${uid}`
        );
        setPreferredJobLocation(response.data.payload.employee?.preferredLocation)
        setJobTitle(response.data.payload.employee?.desiredJobTitle)
        setEmployeeData(response.data.payload.employee);
        setLoading(false);
        // console.log( employeeData.preferredLocation);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [employeeData]);


  const handleRemoveJobExperience = async (index) => {
    try {
      setLoading(true);
  
      const jobHistoryArray = employeeData.workExperience.jobHistory;
      let newArray = [];
  
      for (let i = 0; i < jobHistoryArray.length; i++) {
        if (i !== index) {
          newArray.push(jobHistoryArray[i]);
        }
      }
  
      employeeData.workExperience.jobHistory = newArray;
      setEmployeeData(employeeData);
  
      const response = await axios.patch(`http://localhost:5000/update-employee-profile-jobHistory-section/${uid}`, employeeData);
      if (response.data.acknowledged) {
        toast.success('Successfully removed!')
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRemoveEducation = async (index) =>{

    try {
      setLoading(true);
  
      const educationArray = employeeData.workExperience.education;
      let newArray = [];
  
      for (let i = 0; i < educationArray.length; i++) {
        if (i !== index) {
          newArray.push(educationArray[i]);
        }
      }
  
      employeeData.workExperience.education = newArray;
      setEmployeeData(employeeData);
  
      const response = await axios.patch(`http://localhost:5000/update-employee-profile-education/${uid}`, employeeData);
      if (response.data.acknowledged) {
        toast.success('Successfully removed!')
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddJob = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Create an object with the input field values
    const formData = {
      company,
      jobTitle,
      employmentStartDate,
      employmentEndDate,
    };

    // Log the object
    console.log(formData);
    employeeData.workExperience.jobHistory.push(formData)

    try {
      // Make the API call
      const response = await axios.patch(`http://localhost:5000/update-employee-profile-jobHistory-section/${uid}`,employeeData);

      if (response.data.acknowledged) {
        toast.success('Job added successfully!');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    // Clear the input fields
    setCompany('');
    setJobTitle('');
    setEmploymentStartDate('');
    setEmploymentEndDate('');
  };


  const handleSubmit =async (event) => {
    event.preventDefault();
  
    // Get the input field values
    const degree = event.target[0].value;
    const institution = event.target[1].value;
    const subject = event.target[2].value;
    const graduationDate = event.target[3].value;
  
    // Create an object with the input field values
    const formData = {
      degree,
      institution,
      subject,
      graduationDate,
    };
  
    // Log the form data
    console.log(formData);
    employeeData.workExperience.education.push(formData)
    try {
      // Make the API call
      const response = await axios.patch(`http://localhost:5000/update-employee-profile-education/${uid}`,employeeData);

      if (response.data.acknowledged) {
        toast.success('Job added successfully!');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  
    // Clear the input fields
    event.target.reset();
  };


  function handleUpdate(fieldName) {
    if (fieldName === 'desiredJobTitle') {
      console.log(employeeData?.desiredJobTitle);
    } else if (fieldName === 'preferredJobLocation') {
      console.log(employeeData?.preferredLocation);
    }
  }
  
  

  

  

  if (loading) {
    return <p>Loading...</p>;
  }



  return (
    <div>
     
     <div>
      <p>work experience section</p>
     {
        employeeData?.workExperience?.jobHistory?.map((job,index)=>
      
            <div key={index || -1} className="flex gap-6 my-5">
              <p><strong className="text-red-500">{index}</strong>. <strong>{job.company}</strong> as <strong>{job.jobTitle}</strong>......from <strong>{job.employmentEndDate}</strong> to <strong>{job.employmentStartDate}</strong></p>
              <button onClick={() => handleRemoveJobExperience(index)} className="btn btn-outline btn-error">Remove</button>
            </div>

        )
      }

      <form className="flex">
        <input value={company}           onChange={(e) => setCompany(e.target.value)}  type="text" placeholder="Enter company name" className="input input-bordered input-primary w-full max-w-xs" />
        <input value={jobTitle}           onChange={(e) => setJobTitle(e.target.value)} type="text" placeholder="Enter you job title" className="input input-bordered input-primary w-full max-w-xs" />
        <input  value={employmentStartDate}    onChange={(e) => setEmploymentStartDate(e.target.value)}  type="text" placeholder="Enter joining date" className="input input-bordered input-primary w-full max-w-xs" />
        <input  value={employmentEndDate}      onChange={(e) => setEmploymentEndDate(e.target.value)} type="text" placeholder="Enter leaving date" className="input input-bordered input-primary w-full max-w-xs" />

        <button type="submit" onClick={handleAddJob} className="btn btn-outline btn-primary">Add New Experience</button>
      </form>
     </div>


     <div>
      <p>Educational qualification section</p>
     {
        employeeData?.workExperience?.education?.map((edu,index)=>
          
            <div key={index || -1} className="flex gap-6 my-5">
              <p><strong className="text-red-500">{index}</strong>. From <strong>{edu.institution}</strong>  in  <strong>{edu.graduationDate}</strong> I did <strong>{edu.degree}</strong> in <strong>{edu.major}</strong></p>
              <button onClick={() => handleRemoveEducation(index)} className="btn btn-outline btn-error">Remove</button>
            </div>
          
        )
      }

{/* onSubmit={handleAddEducation} */}
      <form onSubmit={handleSubmit} className="flex"> 
          <input type="text" placeholder="Enter degree name" className="input input-bordered input-primary w-full max-w-xs" />
          <input type="text" placeholder="Enter institution name" className="input input-bordered input-primary w-full max-w-xs" />
          <input type="text" placeholder="Enter subject name" className="input input-bordered input-primary w-full max-w-xs" />
          <input type="text" placeholder="Enter graduation date" className="input input-bordered input-primary w-full max-w-xs" />

          <button type="submit" className="btn btn-outline btn-primary">Add new educational qualification</button>
        </form>
     </div>


     <div>

     <div className="flex">
       <input  type="text"  value={preferredJobLocation} placeholder="Preferred job location" className="input input-bordered input-accent w-full max-w-xs" />
      <button onClick={() => handleUpdate('preferredJobLocation')} className="btn btn-active btn-accent">Update</button>
     </div>

     <div className="flex">
       <input  type="text"  value={desiredJobTitle} placeholder="Entered desired title for your job" className="input input-bordered input-accent w-full max-w-xs" />
      <button onClick={() => handleUpdate('desiredJobTitle')} className="btn btn-active btn-accent">Update</button>
     </div>


     </div>






<Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  );
};

export default UpdateEmployeeProfile;














/*

import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import axios from "axios";

const UpdateEmployeeProfile = () => {
  
  const [jobHistory, setJobHistory] = useState([]);

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [leavingDate, setLeavingDate] = useState("");

  const [updatedData, setUpdatedData] = useState({
    workExperience: {
      jobHistory: [
        {
          company: "",
          jobTitle: "",
          employmentStartDate: "",
          employmentEndDate: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          major: "",
          graduationDate: "",
        },
      ],
    },
    skillsAndQualifications: {
      keySkills: [],
      certifications: [],
    },
    desiredJobTitle: "",
    preferredLocation: "",
    phone: "",
    address: "",
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleJobHistoryChange = (event, index) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        jobHistory: prevData.workExperience.jobHistory.map((job, i) => {
          if (i === index) {
            return {
              ...job,
              [name]: value,
            };
          }
          return job;
        }),
      },
    }));
  };

  const handleEducationChange = (event, index) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        education: prevData.workExperience.education.map((education, i) => {
          if (i === index) {
            return {
              ...education,
              [name]: value,
            };
          }
          return education;
        }),
      },
    }));
  };



  const handleRemoveEducation = (index) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        education: prevData.workExperience.education.filter(
          (education, i) => i !== index
        ),
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      console.log("Updated Data:", updatedData);
      const response = await axios.patch(
        `http://localhost:5000/update-employee-profile/${uid}`,
        updatedData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  //by me not chat gpt
  const handleAddWorkExperience = () => {
    const updatedWorkExperience = {
      company: companyName,
      jobTitle: jobTitle,
      joiningDate: joiningDate,
      leavingDate: leavingDate,
    };
    employeeData.workExperience.jobHistory.push(updatedWorkExperience)
    console.log("newEmployee:",employeeData)
  };

  const handleRemoveJobHistory = (index) => {
    // Create a copy of the jobHistory array
    const jobHistory = [...employeeData.workExperience.jobHistory];
    
    // Remove the element at the specified index
    jobHistory.splice(index, 1);
    
    // Update the employeeData with the modified jobHistory array
    setEmployeeData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        jobHistory: jobHistory,
      },
    }));
    console.log(employeeData)
  };
  



  return (
    <div>
      <p>Update profile</p>
      <form onSubmit={handleSubmit}>
        <label>Desired Job Title:</label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          name="desiredJobTitle"
          value={updatedData.desiredJobTitle || employeeData.desiredJobTitle}
          onChange={handleInputChange}
        />

        <label>Preferred Location:</label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          name="preferredLocation"
          value={
            updatedData.preferredLocation || employeeData.preferredLocation
          }
          onChange={handleInputChange}
        />

        <label>Phone:</label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          name="phone"
          value={updatedData.phone || employeeData.phone}
          onChange={handleInputChange}
        />

        <label>Address:</label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          name="address"
          value={updatedData.address || employeeData.address}
          onChange={handleInputChange}
        />

        <h3>Job History</h3>

        <br />
        <br />

        {jobHistory?.map((history, index) => (
          <div key={index}>
            <label>{index + 1}. </label>
            <label>Company: {history?.company}</label>
            <label>______Job title: {history?.jobTitle}</label>
            <label>______Joining date: {history?.employmentStartDate}</label>
            <label>______Ending date: {history?.employmentEndDate}</label>
            <button
              className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
              onClick={() => handleRemoveJobHistory(index)}
            >
              {" "}
              Remove Job{" "}
            </button>
          </div>
        ))}

        <div className="flex">
          <input
            type="text"
            placeholder="Enter company name"
            className="input input-bordered input-secondary w-full max-w-xs"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your job title"
            className="input input-bordered input-secondary w-full max-w-xs"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <input
            type="date"
            placeholder="Enter your joining date"
            className="input input-bordered input-secondary w-full max-w-xs"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="Enter your leaving date"
            className="input input-bordered input-secondary w-full max-w-xs"
            value={leavingDate}
            onChange={(e) => setLeavingDate(e.target.value)}
          />
          <button
            onClick={handleAddWorkExperience}
            className="inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
          >
            <span className="block rounded-sm bg-white px-8 py-3 text-sm font-medium hover:bg-transparent">
              Add Job Experience
            </span>
          </button>
        </div>

        <h3>Education</h3>
        {employeeData.workExperience.education.map((education, index) => (
          <div key={index}>
            <label>Degree:</label>
            <input
              className="input input-bordered input-info w-full max-w-xs"
              placeholder="Degree"
              type="text"
              name="degree"
              value={
                updatedData.workExperience.education[index]?.degree ||
                education.degree
              }
              onChange={(event) => handleEducationChange(event, index)}
            />

            <label>Institution:</label>
            <input
              className="input input-bordered input-info w-full max-w-xs"
              placeholder="Institution"
              type="text"
              name="institution"
              value={
                updatedData.workExperience.education[index]?.institution ||
                education.institution
              }
              onChange={(event) => handleEducationChange(event, index)}
            />

            <button
              className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
              onClick={() => handleRemoveEducation(index)}
            >
              Remove Education
            </button>
          </div>
        ))}

        <button
          className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployeeProfile;
*/