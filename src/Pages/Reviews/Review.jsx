import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const reviewData = {
      rating: rating,
      review: review,
      email: user?.email,
      displayName: user?.displayName || "Anonymous",
      photoURL: user?.photoURL,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    //     <div className="h-screen">
    //       <div className="flex flex-col justify-center items-center">
    //       <label className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
    //         <span className="text-xs font-medium text-gray-700">Name</span>
    //         <input
    //           disabled
    //           value={user?.displayName || "Anonymous"}
    //           type="email"
    //           id="UserEmail"
    //           placeholder="anthony@rhcp.com"
    //           className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
    //         />
    //       </label>

    //       <label className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
    //         <span className="text-xs font-medium text-gray-700">Email</span>
    //         <input
    //           disabled
    //           value={user?.email}
    //           type="email"
    //           id="UserEmail"
    //           placeholder="anthony@rhcp.com"
    //           className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
    //         />
    //       </label>
    //       <label className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
    //         <span className="text-xs font-medium text-gray-700">Enter your review:</span>
    //         <input
    //           type="text"
    //           id="UserReview"
    //           placeholder="Your review about our app"
    //           className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
    //           value={review}
    //           onChange={handleReviewChange}
    //         />
    //       </label>
    //       <div className="rating rating-md">
    //         <input
    //           type="radio"
    //           name="rating-7"
    //           className="mask mask-star-2 bg-orange-400"
    //           value="1"
    //           checked={rating === 1}
    //           onChange={handleRatingChange}
    //         />
    //         <input
    //           type="radio"
    //           name="rating-7"
    //           className="mask mask-star-2 bg-orange-400"
    //           value="2"
    //           checked={rating === 2}
    //           onChange={handleRatingChange}
    //         />
    //         <input
    //           type="radio"
    //           name="rating-7"
    //           className="mask mask-star-2 bg-orange-400"
    //           value="3"
    //           checked={rating === 3}
    //           onChange={handleRatingChange}
    //         />
    //         <input
    //           type="radio"
    //           name="rating-7"
    //           className="mask mask-star-2 bg-orange-400"
    //           value="4"
    //           checked={rating === 4}
    //           onChange={handleRatingChange}
    //         />
    //         <input
    //           type="radio"
    //           name="rating-7"
    //           className="mask mask-star-2 bg-orange-400"
    //           value="5"
    //           checked={rating === 5}
    //           onChange={handleRatingChange}
    //         />
    //       </div>
    //       </div>

    // {
    //     loading ?
    //     <button
    //     className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
    //     disabled
    //     >
    //     <span className="loading loading-dots loading-md"></span>

    //     </button>
    //     :
    //     <button
    //     className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
    //     onClick={handleSubmit}
    //     >
    //     Review
    //     </button>
    // }

    //       <Toaster
    //   position="top-center"
    //   reverseOrder={false}
    // />
    //     </div>





    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 border-[#e9e9e9] border-[0.2px] bg-base-100">
        <div className="card flex-shrink-0 w-full max-w-sm bg-base-100">
          <div className="card-body">
            <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-5">
              Review
            </p>

            <div>
            <div className="form-control mb-4 w-full">
          <div className="rating rating-md w-full justify-center flex">
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400 m-2"
              value="1"
              checked={rating === 1}
              onChange={handleRatingChange}
            />
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400 m-2"
              value="2"
              checked={rating === 2}
              onChange={handleRatingChange}
            />
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400 m-2"
              value="3"
              checked={rating === 3}
              onChange={handleRatingChange}
            />
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400 m-2"
              value="4"
              checked={rating === 4}
              onChange={handleRatingChange}
            />
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400 m-2"
              value="5"
              checked={rating === 5}
              onChange={handleRatingChange}
            />
          </div>
          </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  value={user?.displayName || "Anonymous"}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  value={user?.email}
                />
              </div>


              <div>


<div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Your Review</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Your review about our app"
                  name="password"
                  className="input input-bordered"
                  value={review}
                  onChange={handleReviewChange}
                />
              </div>





              <div className="form-control mb-4 mt-6">
                {loading ? (
                  <button
                    className="btn-style" disabled>
                    <span className="loading loading-dots loading-md"></span>
                  </button>
                ) : (
                  <button
                    className="btn-style"
                    onClick={handleSubmit}>
                    Review
                  </button>
                )}
              </div>
              <Toaster position="top-center" reverseOrder={false}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};

export default Review;
