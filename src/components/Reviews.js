import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import bex from './../img/bex.webp';

const Reviews = () => {
  //   const [reviews, setReviews] = useState([]);

  //   useEffect(() => {
  //     // This function will be called when the component mounts
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch('api-endpoint');
  //         const data = await response.json();
  //         setReviews(data);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  const reviews = [
    {
      Name: 'Alim Zhumabekov',
      Stars: 4,
      Comment: 'Mischiaveous Mischiaveous Mischiaveous',
      img: bex,
    },
    {
      Name: 'Bexeit Atabek',
      Stars: 5,
      Comment: 'Fantastic Fantastic Fantastic Fantastic Fantastic',
      img: bex,
    },
    {
      Name: 'Nyshanov Yerzhan',
      Stars: 4,
      Comment: 'Cool Cool Cool Cool Cool Cool Cool Cool Cool',
      img: bex,
    },
  ];

  const createStarIcons = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <FontAwesomeIcon key={index} icon={faStar} />
    ));
  };

  return (
    <div className="reviews-wrapper">
      <h1 className="header__primary">Our Reviews</h1>
      <div className="reviews">
        {reviews.map((review, index) => (
            <div className="review" key={index}>
              <img src={review.img} alt={review.Name}/>
              <h1 className="header__primary">{review.Name}</h1>
              <p className="review-comment">{review.Comment}</p>
              <div className="stars">{createStarIcons(review.Stars)}</div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
