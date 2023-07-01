import "react";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

const Filter = () => {
    const [showText, setShowText] = useState(false);

    const handleToggleText = () => {
      setShowText(!showText);
    };
  return (
    <div>


        {/* Filter */}
      <div className="flex h-screen">
        <div
          className={`menu focus:text-indigo-100 ${showText ? "w-80 absolute" : "w-fit relative"} md:relative z-[9] text-base-content h-screen bg-base-100 border-r-[0.5px]`}
        >
          <ul className="space-y-2">
            <li>
              <Link to="Filter/user" className="p-4 inline-flex">
                <svg
                  height={24}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"
                    fill="rgba(38,187,172,1)"
                  ></path>
                </svg>
                {showText && <span className="pl-3">Dash-bard</span>}
              </Link>
            </li>
            <li>
              <Link to="Filter/savedjobs" className="p-4 inline-flex">
                <svg
                  height={24}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z"
                    fill="rgba(38,187,172,1)"
                  ></path>
                </svg>
                {showText && <span className="pl-3">Saved Jobs</span>}
              </Link>
            </li>
            <li>
              <a className="p-4 inline-flex" onClick={handleToggleText}>
                <svg
                  height={24}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`${showText ? "rotate-180" : "rotate-0"} transition-transform`}
                >
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    fill="rgba(38,187,172,1)"
                  ></path>
                </svg>
                {showText && <span className="pl-3">Hide Texts</span>}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Filter;
