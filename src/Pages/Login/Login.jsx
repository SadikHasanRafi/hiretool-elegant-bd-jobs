import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login, setLoading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    // setLoading(true);

    try {
      await login(emailValue, passwordValue)
        .then(() => navigate("/dashboard"))
        .catch((error) => {
          console.log(error.message);
          setLoading(false);
          setError(error.message);
        });

      // Additional logic after successful login
    } catch (error) {
      console.log('Login error:', error);
      // setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 border-[#e9e9e9] border-[0.2px] bg-base-100">
        <div className="card flex-shrink-0 w-full max-w-sm bg-base-100">
          <div className="card-body">
            <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-5">Login</p>

            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  ref={emailRef}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  ref={passwordRef}
                />
                <label className="label">
                  <p className="label-text-alt">Don't have any account? 
                  <Link to="/signup" className="label-text-alt link link-hover text-primary">
                     Create Account
                  </Link>
                  </p>
                </label>
                <span className="text-xs text-red-600">{error}</span>
              </div>
              <div className="form-control mt-6">
                <button className="btn-style" onClick={handleClick}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;






    // </div>








//   );
// };

// export default Login;






// import  { useContext, useRef, useState } from 'react';
// import { AuthContext } from '../../Context/AuthProvider';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// const Login = () => {
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);
//   // eslint-disable-next-line no-unused-vars
//   const {login,setLoading} = useContext(AuthContext)
//   const [error, setError] = useState("")
//   const navigate = useNavigate()



//   const handleClick =async () => {
//     const emailValue = emailRef.current.value;
//     const passwordValue = passwordRef.current.value;
//     try {
//         await login(emailValue, passwordValue)
//         .then( () => navigate("/dashboard") )
//         .catch(error=>{
//           console.log(error)
//           setLoading(false)
//           setError(error)
//         });

//         // Additional logic after successful login
//       } catch (error) {
//         console.log('Login error:', error);
//         // Handle login error
//         setLoading(false)
//         setError(error)
//       }
//   };

//   return (
//     <div className="card">
//       <input
//         type="text"
//         placeholder="Email"
//         className="input m-1 input-bordered input-accent w-full max-w-xs"
//         ref={emailRef}
//       />
//       <input
//         type="text"
//         placeholder="Password"
//         className="input m-1 input-bordered input-accent w-full max-w-xs"
//         ref={passwordRef}
//       />
//       <small>{error}</small>
//       <button className="btn btn-outline btn-secondary m-1" onClick={handleClick}>
//         Login
//       </button>
//     </div>
//   );
// };

// export default Login;