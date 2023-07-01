import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)


  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  
  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleSubmit = async () => {
    setLoading(true)
    const reviewData = {
      rating: rating,
      review: review,
      email: user.email,
      displayName: user.displayName || "Anonymous",
    };

    try {
      const response = await axios.patch(
        `http://localhost:5000/insert-a-review/${user.uid}`,
        reviewData
      );

      if (response.data.acknowledged) {
        toast.success("Successfully toasted!");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      // Handle error scenarios
    }finally{
        setLoading(false)
    }
  }
   

  return (
    <div>
      <label className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <span className="text-xs font-medium text-gray-700">Name</span>
        <input
          disabled
          value={user.displayName || "Anonymous"}
          type="email"
          id="UserEmail"
          placeholder="anthony@rhcp.com"
          className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        />
      </label>
      <label className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <span className="text-xs font-medium text-gray-700">Email</span>
        <input
          disabled
          value={user.email}
          type="email"
          id="UserEmail"
          placeholder="anthony@rhcp.com"
          className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        />
      </label>
      <label className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <span className="text-xs font-medium text-gray-700">Enter your review:</span>
        <input
          type="text"
          id="UserReview"
          placeholder="Your review about our app"
          className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          value={review}
          onChange={handleReviewChange}
        />
      </label>
      <div className="rating rating-md">
        <input
          type="radio"
          name="rating-7"
          className="mask mask-star-2 bg-orange-400"
          value="1"
          checked={rating === 1}
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          name="rating-7"
          className="mask mask-star-2 bg-orange-400"
          value="2"
          checked={rating === 2}
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          name="rating-7"
          className="mask mask-star-2 bg-orange-400"
          value="3"
          checked={rating === 3}
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          name="rating-7"
          className="mask mask-star-2 bg-orange-400"
          value="4"
          checked={rating === 4}
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          name="rating-7"
          className="mask mask-star-2 bg-orange-400"
          value="5"
          checked={rating === 5}
          onChange={handleRatingChange}
        />
      </div>
    

{
    loading ?
    <button
    className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
    disabled
    >
    <span className="loading loading-dots loading-md"></span>

    </button>
    :
    <button
    className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
    onClick={handleSubmit}
    >
    Review
    </button>
}


  



      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  );
};

export default Review;
