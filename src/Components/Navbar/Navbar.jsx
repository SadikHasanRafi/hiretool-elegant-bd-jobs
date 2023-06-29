import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);

  return (
    <div>
      <div className="navbar bg-[#E2FCEC]">
        <div className="flex-1">
          <div className="join join-vertical lg:join-horizontal">
            <Link to="/">
              <button className="btn join-item">Home</button>
            </Link>

            {user?.email ? (
              <button className="btn join-item" onClick={() => logOut()}>
                Log out
              </button>
            ) : (
              <>
                <Link to="login">
                  <button className="btn join-item">log in</button>
                </Link>
                <Link to="signup">
                  <button className="btn join-item">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </div>

              <div>
                <Link to="/show-all-jobs" ><button className="btn btn-outline btn-accent" >All Jobs</button>\</Link>
              </div>

        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 border-2 rounded-full">
                <img src={user?.photoURL} alt="User Avatar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard"><button>Dashboard</button></Link>
              </li>
              <li>
                <button onClick={() => logOut()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
