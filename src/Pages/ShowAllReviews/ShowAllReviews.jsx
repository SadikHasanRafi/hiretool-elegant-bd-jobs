/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Review from "./Review";
//ekhane sob review show korbi ok

const ShowAllReviews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchReviews = async () => {
        const fetchedReviews = await axios.get(`http://localhost:5000/get-all-review`)
        .then((res)=>{
            setReviews(res.data);
        })
        // console.log(fetchedReviews.data.filter(review));
        // fetchedReviews.data.filter(review=>console.log())
        // const filteredCountries = fetchedReviews.filter(
        //     (review) => review.review === true
        //   );
        // console.log(fetchedReviews.data)
      };

      fetchReviews();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <div className="items-center h-screen justify-center flex flex-col">
        <p className="text-3xl font-extrabold text-primary mb-8">Top Reviews</p>
      <div className="grid grid-cols-4 w-[70vw] gap-4">
        {
            reviews.map((review,index)=>{
                if (review.review) {
                    return (<Review key={index} review={review}></Review>)
                    // console.log(index)
                }
            })
        }
      </div>
    </div>
  );
};

export default ShowAllReviews;
