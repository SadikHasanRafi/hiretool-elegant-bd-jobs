import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { useContext } from "react";
import logo from "../../assets/logo.svg"
import alternateImg from "../../assets/undefinedImg.jpg"


const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);




  const menuItems = (
    <>
    <NavLink   className={({ isActive }) => isActive ? "text-primary btnOnlyText" : "text-black btnOnlyText"} to="/show-all-jobs">All Jobs</NavLink>
    <NavLink   className={({ isActive }) => isActive ? "text-primary btnOnlyText" : "text-black btnOnlyText"} to="/review">Reviews</NavLink>
</>
);

  return (
    <div className="border-b-[1px] sticky top-0 z-10 w-full bg-white bg-opacity-90 backdrop-blur-md">
     <div className="navbar bg-transparent p-2 bg-base-100 md:w-4/5 mx-auto">
        <div className="navbar-start"> 
          <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/"><img src={logo} className="h-7" alt="logo" /></NavLink>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
          {user?.email ? (
            <>
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL || alternateImg} alt="User Avatar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <NavLink   className={({ isActive }) => isActive ? "text-primary" : "text-black"} to="/dashboard">
                  <button>Dashboard</button>
                </NavLink>
              </li>
              <li>
                <button onClick={() => logOut()}>Logout</button>
              </li>
            </ul>
          </div>
            </>
          ) : (
            <>
          <NavLink   className={({ isActive }) => isActive ? "text-primary btnOnlyText" : "text-black btnOnlyText"} to="/login">Login</NavLink>
          <NavLink   className={({ isActive }) => isActive ? "text-primary btn-style" : "text-black btn-style"} to="/signup">Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
        </div>
  );
};

export default Navbar;
