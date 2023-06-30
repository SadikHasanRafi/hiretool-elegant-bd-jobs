import { Link, Outlet } from "react-router-dom";

const SuperAdminDashboard = () => {
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
      <Link to="/dashboard/show-pending-company" ><li><button className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Show all pending company</button></li></Link>
      <Link to="/dashboard/show-all-active-employee" ><li><button className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Show all active company</button></li></Link>
      <Link to="/dashboard/show-all-registered-company" ><li><button className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Show all registered company</button></li></Link>
      <Link to="/dashboard/show-all-rejected-company" ><li><button className="relative font-medium text-indigo-300 p-1 px-2 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">Rejected Companies</button></li></Link>
    </ul>
  
  </div>
        </div>
    );
};

export default SuperAdminDashboard;