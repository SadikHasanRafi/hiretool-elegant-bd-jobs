import { useContext, useEffect, useState,useRef } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
// import ReactPDF, {  PDFDownloadLink } from "@react-pdf/renderer";
// import CVpdf from "./CVpdf";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";


const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const componentPDF = useRef()
  const [userInfo, setUserInfo] = useState(null);
  // const [badgeClass, setBadgeClass] = useState("")
  // ReactPDF.render(<CVpdf />, `${user.displayName}/example.pdf`);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-single-user-info?uid=${user.uid}`);
        const data = await response.json();
        if (data.previousNotificationCount !== undefined && Array.isArray(data.calledForInterview) && data.previousNotificationCount !== data.calledForInterview.length) {
          localStorage.setItem("badge","badge badge-primary")
        }
        console.log(data)
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);


  const handleDownloadPDF = useReactToPrint({
    content:()=>componentPDF.current,
    documentTitle:"cv",
    onAfterPrint:()=>Swal.fire('Good job!','You clicked the button!','success')
  })

  return (
    <div>
      {userInfo ? (
       <>
       
       
         <div ref={componentPDF}>


       
  
     
        <p>email : {userInfo.email}</p>
        <p>role: {userInfo.role}</p>

        <button onClick={handleDownloadPDF} className="btn w-32  btn-outline btn-primary">Download</button>
        </div>



       </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default MyProfile;
