/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import undefinedImg from "../../assets/undefinedImg.jpg"

const Review = ({review}) => {
    return (
        <div className='card-style py-10 flex flex-col items-center'>
            <img src={review?.photoURL || review?.companyLogo || undefinedImg} className='w-20 mb-4' alt="" />
            <p className='font-bold text-4xl text-yellow-500'> {review?.rating}.00</p>
            <p><strong className='capitalize'>{review?.displayName}</strong></p>
            <p>{review?.review}</p>
        </div>
    );
};

export default Review;