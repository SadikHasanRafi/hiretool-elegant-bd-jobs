import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const ShowAllRegisteredCompany = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [showCompanyDetails, setShowCompanyDetails] = useState({})
    const [deleteButtonClicked, setDeleteButtonClicked] = useState(false)
  
    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:5000/superadmin-get-all-company");
            const data = response.data;
            const mew=[]
            console.log(data)
            data.forEach((k) => {
                if (k?.approval==true && k?.isRejected==="2") {
                    mew.push(k)
                    console.log(k)
                }
              });
    
             setCompanies(mew);
    
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
           
            setIsLoading(false);


          }
        };
    
        fetchData();
    
        return () => {
          // Perform clean-up tasks if needed
        };
      }, [deleteButtonClicked]);



      const handleShowCompanyDetails = async (uid) => {
        setModalLoading(true);
        window.my_modal_3.showModal();
        try {
          const response = await axios.get(`http://localhost:5000/get-company-details/${uid}`);
          const data = response.data;
          setShowCompanyDetails(data);
        } catch (error) {
          console.error("Error fetching company details:", error);
        }finally{
            setModalLoading(false);
        }
      }


      
      const handleDeleteCompany = async (uid) => {
        setDeleteButtonClicked(true)
        try {
            console.log(uid)
          // eslint-disable-next-line no-unused-vars
          const result = await axios.delete(`http://localhost:5000/delete-single-company-bysuperadmin/${uid}`);
          // eslint-disable-next-line no-unused-vars, no-undef
          const data = result.data;
          // eslint-disable-next-line no-undef
          console.log(result)
        } catch (error) {
          console.error("Error fetching company details:", error);
        }finally{
            setDeleteButtonClicked(false)
        }
      }
   


      return (
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : companies.length===0 ?
           (
            <p>No registered company</p>
    
          )
            :(
                <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Company Name</th>
                      <th>Registration ID</th>
                      <th>Website</th>
                      <th>Address</th>
                      <th>Phone Number</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                          
                      }
                    {companies.map((company, index) => (
                      <tr key={index}>
                          <td>{index+1}</td>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img srcSet={company?.companyLogo} alt="No image to display" />
                              </div>
                            </div>
                            <div>
                                   <p className="font-bold">{company?.companyName}</p>
                            </div>
                          </div>
                        </td>
                      
                        <td>{company?.registerID}</td>
                        <td>
                          <button className="btn btn-ghost btn-xs">{company.website.toLowerCase()}</button>
                        </td>
                        <td>
                          <button className="btn btn-ghost btn-xs">{company.locations}</button>
                        </td>
                        <td>
                          <button className="btn btn-ghost btn-xs">{company.phone}</button>
                        </td>
                        <td>
                          <button onClick={()=>handleShowCompanyDetails(company.uid)} className="btn btn-outline btn-accent">Details approve from reject to approve {company.uid}</button>
                          <button onClick={()=>handleDeleteCompany(company.uid)} className="btn btn-outline btn-error">Delete</button>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
      
      
      
      
                {
          modalLoading ?
          <dialog id="my_modal_3" className="modal">
          <form method="dialog" className="modal-box">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <span className="loading loading-spinner loading-md"></span>
          </form>
          </dialog>
          :
          <dialog id="my_modal_3" className="modal">
          <form method="dialog" className="modal-box">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <h3 className="font-bold text-lg"></h3>
              <p className="py-4">Company name <span className="font-extrabold"> {showCompanyDetails?.companyName}</span></p>
              <p className="py-4">approval details {showCompanyDetails?.approval}</p>
              <p className="py-4">uid {showCompanyDetails?.uid}</p>
              <p className="py-4">email {showCompanyDetails?.email}</p>
             
          </form>
        </dialog>
         }
      
      
      
      
      
      
      
      
      
 
              </div>
    
            )
        }
    
            <Toaster position="top-center" reverseOrder={false}/>
        </div>
      );
};

export default ShowAllRegisteredCompany;


