/* eslint-disable react/prop-types */
import "react";

const Job = (props) => {
  return (
    <div>
      <div className="card-style cursor-pointer">
        <div className="card-body flex flex-row w-full justify-between items-center">
          <div>
            <h2 className="card-title mb-1">
              {props.title}
            </h2>
            <p>{props.company} - {props.category}</p>
            <p className="mb-3">{props.location}</p>
            <p className="w-[800px]">{props.description}</p>

            {/* requirements */}
            <p className="mt-1">
            {props.requirements.map((requirement) => {
              if(requirement.length > 0){
                  <span className="badge-ghost badge">{requirement}</span>
                  // console.log(requirement);
                }
              })}
              </p>


          </div>
          <div className="card-actions justify-end block">
            <button className="btn-style">See details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
