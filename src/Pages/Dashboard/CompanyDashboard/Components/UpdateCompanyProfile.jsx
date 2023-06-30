import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import axios from "axios";

const UpdateCompanyProfile = () => {
    const { user } = useContext(AuthContext);
    const { uid } = user;
    const [company, setCompany] = useState({});
    const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/get-company-details/${uid}`
        );
        const data = response.data;
        // Handle the response data
        console.log();
        setCompany(response.data)
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchData(); // Call the API when the component mounts
    console.log(company)
    return () => {
      // Perform clean-up tasks if needed
    };
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData)
    // Filter out the empty fields from formData
    const nonEmptyFields = Object.entries(formData).filter(
      ([key, value]) => value.trim() !== ""
    );

    // Log the non-empty fields
    nonEmptyFields.forEach(([key, value]) => {
    //   console.log(`${key}: ${value}`);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
         <form onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">Currently company name is {company?.companyName}</span>
            </label>
            <input  onChange={handleInputChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">Working Industry {company?.industry}</span>
            </label>
            <input  onChange={handleInputChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">website {company?.website}</span>
            </label>
            <input  onChange={handleInputChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">phone {company?.phone}</span>
            </label>
            <input  onChange={handleInputChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">description {company?.description}</span>
            </label>
            <input  onChange={handleInputChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">facebook {company?.facebook}</span>
            </label>
            <input  onChange={handleInputChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>

        <button className="btn btn-accent">Update</button>
        
        
        </form>

    </div>
  );
};

export default UpdateCompanyProfile;
