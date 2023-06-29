import  { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthProvider";

const AddJobs = () => {
    const {user} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    companyName: "",
    companyLogo: "",
    industry: "",
    location: "",
    requirements: [],
    responsibilities: [],
    experienceLevel: "",
    salaryRange: "",
    applicationLink: "",
    postedDate: "",
    categories: "",
    uid:user?.uid,
    whoApplied : [],
    whoSaved : []
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'requirements') {
        const data = value.split(',').map((item) => item.trim());
        setFormData((prevData) => ({
          ...prevData,
          [name]: data
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      }
  };

  const handleRequirementsChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedRequirements = [...prevFormData.requirements];
      updatedRequirements[index] = value;
      return {
        ...prevFormData,
        requirements: updatedRequirements,
      };
    });
  };

  const handleResponsibilitiesChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedResponsibilities = [...prevFormData.responsibilities];
      updatedResponsibilities[index] = value;
      return {
        ...prevFormData,
        responsibilities: updatedResponsibilities,
      };
    });
  };

  const addRequirement = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      requirements: [...prevFormData.requirements, ""],
    }));
  };

  const addResponsibility = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      responsibilities: [...prevFormData.responsibilities, ""],
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/add-job",formData);
      console.log(response.data); // Response from the server
      navigate("/dashboard/show-company-posted-jobs")
    } catch (error) {
      console.error("Error posting data:", error);
    } 

    // console.log(formData); // Logged form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Job Title:
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Job Description:
        <textarea
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Company Name:
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Company Logo:
        <input
          type="text"
          name="companyLogo"
          value={formData.companyLogo}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Industry:
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Requirements (separated by commas):
        {formData.requirements.map((requirement, index) => (
          <input
            key={index}
            type="text"
            value={requirement}
            onChange={(e) => handleRequirementsChange(e, index)}
          />
        ))}
        <button type="button" onClick={addRequirement}>
          Add Requirement
        </button>
      </label>
      <br />


      <label>
        Responsibilities:
        {formData.responsibilities.map((responsibility, index) => (
          <input
            key={index}
            type="text"
            value={responsibility}
            onChange={(e) => handleResponsibilitiesChange(e, index)}
          />
        ))}
        <button type="button" onClick={addResponsibility}>
          Add Responsibility
        </button>
      </label>
      <br />

      <label>
        Experience Level:
        <input
          type="text"
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Salary Range:
        <input
          type="text"
          name="salaryRange"
          value={formData.salaryRange}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Application Link:
        <input
          type="text"
          name="applicationLink"
          value={formData.applicationLink}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Posted Date:
        <input
          type="text"
          name="postedDate"
          value={formData.postedDate}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Categories:
        <input
          type="text"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
        />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddJobs;
