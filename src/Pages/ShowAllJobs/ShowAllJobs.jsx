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

  const handleLocationChange = (event) => {
    console.log(event.target.id);
  };


  const [checkboxValues, setCheckboxValues] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false
  });

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(checkboxValues);
  };

  return (
    <div>
      <div>
        <div className="flex min-h-screen">
          <div className="p-8 focus:text-indigo-100 w-80 text-base-content bg-base-100 border-r-[0.5px] border-b-[0.5px] min-h-[50vh]">
            <div>
              <h1 className="text-base mb-4 font-semibold">Location</h1>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Rajshahi</span>
                  <input
                    type="radio"
                    id="rajshahi"
                    name="radio-10"
                    className="radio checked:bg-blue-500"
                    defaultChecked
                    onClick={handleLocationChange}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Dhaka</span>
                  <input
                    type="radio"
                    id="dhaka"
                    name="radio-10"
                    className="radio checked:bg-blue-500"
                    defaultChecked
                    onClick={handleLocationChange}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">All</span>
                  <input
                    type="radio"
                    id="all"
                    name="radio-10"
                    className="radio checked:bg-blue-500"
                    defaultChecked
                    onClick={handleLocationChange}
                  />
                </label>
              </div>
            </div>

            <div>
              <h1 className="text-base my-4 mt-6 font-semibold">Category</h1>
              <form className="form-control" onSubmit={handleSubmit}>
                <div className="mb-5">
                <label className="cursor-pointer label w-fit px-3 m-1" >
                  <span className="label-text pr-2">Back-end Web Developer</span>
                  <input type="checkbox" className="checkbox w-[1rem] h-[1rem]"  defaultChecked={checkboxValues.option1} onClick={handleCategoryChange}/>
                </label>
                <label className="cursor-pointer label w-fit px-3 m-1" >
                  <span className="label-text pr-2">Digital Marketing</span>
                  <input type="checkbox" className="checkbox w-[1rem] h-[1rem]"  defaultChecked={checkboxValues.option2} onClick={handleCategoryChange}/>
                </label>
                <label className="cursor-pointer label w-fit px-3 m-1" >
                  <span className="label-text pr-2">Designing</span>
                  <input type="checkbox" className="checkbox w-[1rem] h-[1rem]"  defaultChecked={checkboxValues.option3} onClick={handleCategoryChange}/>
                </label>
                <label className="cursor-pointer label w-fit px-3 m-1" >
                  <span className="label-text pr-2">Project Manager</span>
                  <input type="checkbox" className="checkbox w-[1rem] h-[1rem]"  defaultChecked={checkboxValues.option4} onClick={handleCategoryChange}/>
                </label>
                </div>
                <button type="submit" className="btn">Apply</button>
              </form>
            </div>
          </div>



          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-[70vw] mx-auto mb-20">
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
        </div>
      </div>
    </div>
  );
};

export default ShowAllJobs;
