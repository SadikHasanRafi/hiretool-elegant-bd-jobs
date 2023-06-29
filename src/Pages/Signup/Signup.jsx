import  { useContext, useRef } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const {createUser} = useContext(AuthContext)
  const navigate = useNavigate()
    



  const handleClick =async () => {
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    console.log('Email:', emailValue);
    console.log('Password:', passwordValue);
    try {
        await createUser(emailValue, passwordValue)
        .then((result)=>{
          // const user = result.user
          if (result.user) {
               navigate("/setrole")
          }
      });
        console.log('User logged in successfully!');
        // Additional logic after successful login
      } catch (error) {
        console.error('Login error:', error);
        // Handle login error
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
      <button className="btn btn-outline btn-primary m-1" onClick={handleClick}>
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
