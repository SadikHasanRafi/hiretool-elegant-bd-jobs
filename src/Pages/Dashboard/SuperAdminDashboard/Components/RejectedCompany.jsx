import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Loading from "../../../Shared/Loading";

const RejectedCompany = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [approvedButtonPressed, setApprovedButtonPressed] = useState(false);
  

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:5000/superadmin-get-all-company");
            const data = response.data;
            const mew=[]
            data.forEach((k) => {
                console.log("k = ",k?.approval)
                if (!k?.approval && k.isRejected==="1") {
                    console.log(k)
                    mew.push(k)
                }
              });
            // console.log(mew)
    
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
      }, [approvedButtonPressed]);
   


      const handleRejectToApproved = async (uid) => {
        setApprovedButtonPressed(true)
        try {
          const response = await axios.get(`http://localhost:5000/get-company-details/${uid}`);
          // eslint-disable-next-line no-unused-vars
          const result = await axios.put(`http://localhost:5000/update-single-company/${uid}`, {approval:true, isRejected: "2" });
          // eslint-disable-next-line no-unused-vars
          const data = response.data;
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching company details:", error);
        }finally{
            setApprovedButtonPressed(false)
        }
      };





      return (
        <div>
          {isLoading ? (
            <Loading></Loading>
          ) : companies.length===0 ?
           (
            <p>No rejected companies</p>
    
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
                          <button onClick={()=>handleRejectToApproved(company.uid)} className="btn btn-outline btn-accent">Details approve from reject to approve {company.uid}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
      
      
      
      
      
      
      
      
      
      
      
      
      
      
 
              </div>
    
            )
        }
    
            <Toaster position="top-center" reverseOrder={false}/>
        </div>
      );
};

export default RejectedCompany;