import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const SetComPanyProfile = () => {
    const {user} = useContext(AuthContext)
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate()
  
    const [formData, setFormData] = useState({
      companyName: "",
      companyLogo: user?.photoURL || null,
      industry: "",
      registerID:"",
      locations: "",
      website: "",
      email: ""||user?.email,
      phone: "",
      description: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      uid: user?.uid,
      technologies: [],
      approval:false,
      jobs: [],
      appointmentDetails:[],
      isRejected:"0"
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit =async (event) => {
      event.preventDefault();
      console.log(formData);
      setFormData({
        ...formData,
      })
      console.log("form data is ",formData)
      axios.put(`http://localhost:5000/update-single-user/${user.uid}`,formData)
      .then((res)=>{
        console.log("set company profile theke response kortisi",res)
        if (res.data.acknowledged) {
            navigate("/approval")
            return toast.success('Profile created successfully!')
        }
      })
    };
  
    const handleKeyTechnologiesChange = (e) => {
      const { value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
          technologies: value.split(",").map((tech) => tech.trim()),
      }));
    };
  
    return (
      <div className="max-w-md mx-auto m-10 shadow-lg bg-white p-8 border border-gray-300 rounded">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
    
          <div className="mb-4">
            <label className="block font-bold mb-1">Company Logo</label>
            <input
              type="text"
              name="companyLogo"
              disabled
              value={formData.companyLogo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Registered ID:</label>
            <input
              type="text"
              name="registerID"
              value={formData.registerID}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
    
          <div className="mb-4">
            <label className="block font-bold mb-1">Industry</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
    
          <div className="mb-4">
            <label className="block font-bold mb-1">Locations</label>
            <input
              type="text"
              name="locations"
              value={formData.locations}
              // value={formData.locations.join(', ')}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
    
          <div className="mb-4">
            <label className="block font-bold mb-1">Website</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
    
          <div className="mb-4">
            <label className="block font-bold mb-1">Email</label>
            {user && <input
              disabled
              type="email"
              name="email"
              value={formData.email || user?.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />}
          </div>
    
          <div className="mb-4">
            <label className="block font-bold mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
    
          <div className="mb-4">
            <label className="block font-bold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
          </div>
    
          <div className="mb-4">
            <label className="block font-bold mb-1">Technologies</label>
            <input
              type="text"
              name="technologies"
              placeholder='separate by comma (,) '
              value={formData.technologies.join(", ")}
              onChange={handleKeyTechnologiesChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
    
          <div className="mb-4">
            <label className="block font-bold mb-1">Facebook</label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
    
          <div className="mb-4">
            <label className="block font-bold mb-1">Twitter</label>
            <input
              type="text"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
    
          <div className="mb-4">
            <label className="block font-bold mb-1">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
    
          <div className="mb-4">
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    );
    
  }
export default SetComPanyProfile;