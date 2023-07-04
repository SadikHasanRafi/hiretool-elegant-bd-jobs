import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleClick = async () => {
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    console.log("Email:", emailValue);
    console.log("Password:", passwordValue);
    try {
      await createUser(emailValue, passwordValue).then((result) => {
        // const user = result.user
        if (result.user) {
          navigate("/setrole");
        }
      });
      console.log("User logged in successfully!");
      // Additional logic after successful login
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error
      setError(error.message);
    }
  };

  return (
    // <div className="card">
    //   <input
    //     type="text"
    //     placeholder="Email"
    //     className="input m-1 input-bordered input-accent w-full max-w-xs"
    //     ref={emailRef}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Password"
    //     className="input m-1 input-bordered input-accent w-full max-w-xs"
    //     ref={passwordRef}
    //   />
    //   <button className="btn btn-outline btn-primary m-1" onClick={handleClick}>
    //     Sign Up
    //   </button>
    // </div>

    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 border-[#e9e9e9] border-[0.2px] bg-base-100">
        <div className="card flex-shrink-0 w-full max-w-sm bg-base-100">
          <div className="card-body">
            <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-5">
              Sign Up
            </p>

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
                  <p className="label-text-alt">
                    Already have an account?
                    <Link
                      to="/login"
                      className="label-text-alt link link-hover text-primary">
                      Login
                    </Link>
                  </p>
                </label>
                <span className="text-xs text-red-600">{error}</span>
              </div>
              <div className="form-control mt-6">
                <button className="btn-style" onClick={handleClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
