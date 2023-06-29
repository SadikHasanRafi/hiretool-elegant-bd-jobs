import { useContext, useEffect, useState } from "react";
import { JobContext } from "../../Context/JobsProvider";
import ShowJob from "./ShowJob";

const ShowAllJobs = () => {
  const { fetchAllJobs } = useContext(JobContext);
  const [isLoading, setIsLoading] = useState(true);
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAllJobs();
        setAllJobs(response.data);
        // response.data.map(x=>console.log(x))
      } catch (error) {
        console.error("Error fetching all jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchAllJobs]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {allJobs.map((job) => {
            return <ShowJob key={job._id} job={job}></ShowJob>;
          })}
        </>
      )}
    </div>
  );
};

export default ShowAllJobs;
