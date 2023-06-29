import  { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const {login,setLoading} = useContext(AuthContext)
  const [error, setError] = useState("")
  const navigate = useNavigate()



  const handleClick =async () => {
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    try {
        await login(emailValue, passwordValue)
        .then( () => navigate("/dashboard") )
        .catch(error=>{
          console.log(error)
          setLoading(false)
          setError(error)
        });

        // Additional logic after successful login
      } catch (error) {
        console.log('Login error:', error);
        // Handle login error
        setLoading(false)
        setError(error)
      }
  };

  return (
    <div className="card">
      <input
        type="text"
        placeholder="Email"
        className="input m-1 input-bordered input-accent w-full max-w-xs"
        ref={emailRef}
      />
      <input
        type="text"
        placeholder="Password"
        className="input m-1 input-bordered input-accent w-full max-w-xs"
        ref={passwordRef}
      />
      <small>{error}</small>
      <button className="btn btn-outline btn-secondary m-1" onClick={handleClick}>
        Login
      </button>
    </div>
  );
};

export default Login;