import  { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {

  const [totalJobs, setTotalJobs] = useState(0)
  const [totalCompany, setTotalCompany] = useState(0)
  const [totalEmployee, setTotalEmployee] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-total-count");
        const data = response.data
        setTotalCompany(data.totalCompany)
        setTotalEmployee(data.totalEmployees)
        setTotalJobs(data.totalJobs)
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      // eslint-disable-next-line no-empty
      }finally{

      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <p>number of company {totalCompany}</p>
            <p>number of employee {totalEmployee}</p>
            <p>number of jobs {totalJobs}</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
