/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */

import { useEffect } from "react";

const Notification = (props) => {

    // eslint-disable-next-line react/prop-types
    const {interviewWith} = props

    const {job,company,interviewTime} = interviewWith

console.log(interviewTime)


    


/// {   
        // appointmentCompanyUID : "QIiqJpQfKddNbhX9VsocpbBPnhc2",
//     interviewTime : {interviewDate: '2023-06-05', interviewTime: '02:07'}
//     job_id : "649ddb94ef11bc2731187cbf"
// }


    return (
        <div>
            <p>You have an interview with {company?.companyName} as a {job.jobTitle} at {interviewTime.interviewTime} in {interviewTime.interviewDate}</p>
        </div>
    );
};

export default Notification;