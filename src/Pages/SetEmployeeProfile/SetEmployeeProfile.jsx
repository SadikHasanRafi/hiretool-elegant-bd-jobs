import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const SetEmployeeProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  const [employeeData, setEmployeeData] = useState({
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
    // skillsAndQualifications: {
    //   keySkills: [],
    //   certifications: [],
    // },
    keySkills: [],
    certifications: [],
    desiredJobTitle: "",
    preferredLocation: "",
    savedJobs: [],
    appliedJobs: [],
    calledForInterview:[],
    phone: "",
    address: "",
    displayName:"" || user.displayName,
    email:"" || user.email,
    previousNotificationCount:0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddEducation = () => {
    setEmployeeData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        education: [
          ...prevData.workExperience.education,
          {
            degree: "",
            institution: "",
            major: "",
            graduationDate: "",
          },
        ],
      },
    }));
  };


  const handleAddWorkExperience = () => {
    setEmployeeData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        jobHistory: [
          ...prevData.workExperience.jobHistory,
          {
            company: "",
            jobTitle: "",
            employmentStartDate: "",
            employmentEndDate: "",
          },
        ],
      },
    }));
  };


  const handleEducationInputChange = (event, index) => {
    const { name, value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        education: prevData.workExperience.education.map((edu, i) =>
          i === index ? { ...edu, [name]: value } : edu
        ),
      },
    }));
  };

  const handleKeySkillChange = (event, index) => {
    const { value } = event.target;
    setEmployeeData((prevData) => ({

        ...prevData,
        keySkills: prevData.keySkills.map((skill, i) =>
          i === index ? value : skill
        ),
  
    }));
  };



  const handleAddKeySkill = () => {
    setEmployeeData((prevData) => ({
      ...prevData,

        keySkills: [...prevData.keySkills, ""],

    }));
  };

  const handleAddCertification = () => {
    setEmployeeData((prevData) => ({
      ...prevData,
      certifications: [...prevData.certifications, ""],
    }));
  };
  
  const handleCertificationChange = (event, index) => {
    const { value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      certifications: prevData.certifications.map((cert, i) =>
        i === index ? value : cert
      ),
    }));
  };
  

  const handleWorkExperienceInputChange = (event, index) => {
    const { name, value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      workExperience: {
        ...prevData.workExperience,
        jobHistory: prevData.workExperience.jobHistory.map((job, i) =>
          i === index ? { ...job, [name]: value } : job
        ),
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post(
        "http://localhost:5000/set-employee-profile",
        employeeData
      );

      if (response.data.acknowledged) {
        navigate("/dashboard");
        toast.success("Successfully toasted!");
      }
    } catch (error) {
      // Handle error
      console.log(error);
      toast.error("An error occurred!");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };


  return (
    <form onSubmit={handleSubmit}>
          <h3>Work Experience</h3>
      {employeeData.workExperience.jobHistory.map((job, index) => (
        <div key={index}>
          <input
            type="text"
            name="company"
            value={job.company}
            onChange={(e) => handleWorkExperienceInputChange(e, index)}
            placeholder="Company"
          />
          <input
            type="text"
            name="jobTitle"
            value={job.jobTitle}
            onChange={(e) => handleWorkExperienceInputChange(e, index)}
            placeholder="Job Title"
          />
          <input
            type="text"
            name="employmentStartDate"
            value={job.employmentStartDate}
            onChange={(e) => handleWorkExperienceInputChange(e, index)}
            placeholder="Employment Start Date"
          />
          <input
            type="text"
            name="employmentEndDate"
            value={job.employmentEndDate}
            onChange={(e) => handleWorkExperienceInputChange(e, index)}
            placeholder="Employment End Date"
          />
        </div>
      ))}
      <button type="button" onClick={handleAddWorkExperience}>
        Add Work Experience
      </button>

      <h3>Education</h3>
      {employeeData.workExperience.education.map((edu, index) => (
        <div key={index}>
          <input
            type="text"
            name="degree"
            value={edu.degree}
            onChange={(e) => handleEducationInputChange(e, index)}
            placeholder="Degree"
          />
          <input
            type="text"
            name="institution"
            value={edu.institution}
            onChange={(e) => handleEducationInputChange(e, index)}
            placeholder="Institution"
          />
          <input
            type="text"
            name="major"
            value={edu.major}
            onChange={(e) => handleEducationInputChange(e, index)}
            placeholder="Major"
          />
          <input
            type="text"
            name="graduationDate"
            value={edu.graduationDate}
            onChange={(e) => handleEducationInputChange(e, index)}
            placeholder="Graduation Date"
          />
        </div>
      ))}
      <button type="button" onClick={handleAddEducation}>
        Add Education
      </button>

      <h3>Skills and Qualifications</h3>
      {employeeData.keySkills.map((skill, index) => (
        <div key={index}>
          <input
            type="text"
            value={skill}
            onChange={(e) => handleKeySkillChange(e, index)}
            placeholder="Skill"
          />
        </div>
      ))}
      <button type="button" onClick={handleAddKeySkill}>
        Add Skill
      </button>

        <br />
      {employeeData.certifications.map(
        (cert, index) => (
          <div key={index}>
            <input
              type="text"
              value={cert}
              onChange={(e) => handleCertificationChange(e, index)}
              placeholder="Certification"
              className="input input-bordered input-accent w-full max-w-xs" 
            />
          </div>
        )
      )}
      <button type="button" onClick={handleAddCertification} className="btn btn-outline btn-accent" >
        Add Certification
      </button>
      <h3>Job Preferences</h3>
      <input
        type="text"
        name="desiredJobTitle"
        value={employeeData.desiredJobTitle}
        onChange={handleInputChange}
        placeholder="Desired Job Title"
      />
      <input
        type="text"
        name="preferredLocation"
        value={employeeData.preferredLocation}
        onChange={handleInputChange}
        placeholder="Preferred Location"
      />

      <h3>Contact Information</h3>
      <input
        type="text"
        name="phone"
        value={employeeData.phone}
        onChange={handleInputChange}
        placeholder="Phone"
      />
      <input
        type="text"
        name="address"
        value={employeeData.address}
        onChange={handleInputChange}
        placeholder="Address"
      />
      <input
        type="text"
        name="displayName"
        value={employeeData?.displayName || ""}
        onChange={handleInputChange}
        placeholder="Display Name"
        // defaultValue={user?.displayName}
      />
      <input
        type="text"
        name="email"
        value={employeeData.email}
        onChange={handleInputChange}
        placeholder="Email"
        // defaultValue={user?.email}
        disabled
      />

      <button type="submit">Submit</button>
      <Toaster/>
    </form>
  );
};

export default SetEmployeeProfile;
