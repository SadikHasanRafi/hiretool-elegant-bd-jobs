import 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SetRole = () => {

    const {user} = useContext(AuthContext)
    const [userRole, setUserRole] = useState("")
    const navigate = useNavigate()


    const handleOnclickCompany =async () => {
        setUserRole("company")
        console.log(userRole)
        localStorage.setItem("role", "company");
        let data = {
            displayName:user.displayName,
            email:user.email,
            emailVerified:user.emailVerified,
            phoneNumber:user.phoneNumber,
            photoURL:user.photoURL,
            uid:user.uid,
          }
                
          if (user) {
            const storedRole = localStorage.getItem("role");

            data = {
                ...data,
                role: storedRole
            }
            console.log(data,userRole)
          axios.post("http://localhost:5000/create-new-user-company", data)
          .then((res)=>{
              // console.log("response in signup page line 26",res.data.request)
              if (res.data.request==="success") {
                // console.log("user create kam kore")
                Swal.fire(
                  '',
                  'Your profile created successfully',
                  'success'
                )
                navigate("/set-company-profile")
                localStorage.removeItem("role");      
              }
          }).catch((error)=>{
              console.error("error from signup",error)
          })
      }
    }

    const handleOnclickEmployee = () => {
        toast.success('Successfully toasted!')
     

        /********just for testing perpouse*****/
        localStorage.setItem("role", "employee");
        let data = {
            displayName:user.displayName,
            email:user.email,
            emailVerified:user.emailVerified,
            phoneNumber:user.phoneNumber,
            photoURL:user.photoURL,
            uid:user.uid,
          }
                
          if (user) {
            const storedRole = localStorage.getItem("role");

            data = {
                ...data,
                role: storedRole
            }
            console.log(data,userRole)
          axios.post("http://localhost:5000/create-new-user-employee", data)
          .then((res)=>{
              // console.log("response in signup page line 26",res.data.request)
              if (res.data.request==="success") {
                // console.log("user create kam kore")
                Swal.fire(
                  '',
                  'Your profile created successfully',
                  'success'
                )
                navigate("/set-employee-profile")
                localStorage.removeItem("role");      
              }
          }).catch((error)=>{
              console.error("error from signup",error)
          })
      }
        /********just for testing perpouse *****/


    }



    return (
        <div>
            <button className="btn btn-outline btn-primary" onClick={handleOnclickCompany}>Company</button>
            <button className="btn btn-outline btn-secondary" onClick={handleOnclickEmployee}>Employee</button>
            <Toaster />

        </div>
    );
};

export default SetRole;

































