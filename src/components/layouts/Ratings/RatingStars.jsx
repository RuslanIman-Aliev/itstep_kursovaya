import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";  
import './RatingStars.css'
const RatingStars = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);  
  const hasHalfStar = rating % 1 >= 0.5;  
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); 

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="star" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="star-half" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="star-empty" />);
  }

  return <div className="rating-stars">{stars}</div>;
};

export default RatingStars;
