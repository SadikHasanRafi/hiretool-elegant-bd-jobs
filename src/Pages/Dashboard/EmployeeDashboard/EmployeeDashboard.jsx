import { Link, Outlet } from "react-router-dom";

const EmployeeDashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet></Outlet>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <Link to="/dashboard/my-profile"  ><li><button className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">My Profile</button></li></Link>
            <Link to="/dashboard/update-employee-profile" ><li><button className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Update Profile</button></li></Link>
            <Link to="/dashboard/saved-jobs" ><li><button className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Saved Jobs</button></li></Link>
            <Link to="/dashboard/applied-jobs" ><li><button className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Applied Jobs</button></li></Link>
            <Link to="/dashboard/employee-notifications" ><li><button className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Notifications</button></li></Link>
          </ul>
        
        </div>
              </div>
    );
};

export default EmployeeDashboard;