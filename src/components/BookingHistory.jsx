import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingHistory = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch booking history
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/history/${userId}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };

    fetchBookings();
  }, [userId]);

  const handleReviewSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/bookings/review', {
        bookingId: selectedBooking._id,
        userId,
        comment,
        rating,
      });
      alert('Review submitted successfully!');
      setComment('');
      setRating('');
      setSelectedBooking(null);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const fetchReviews = async (stayName) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bookings/reviews/${stayName}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  return (
    <div>
      <h2>Booking History</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            {booking.stayName} - {booking.location} ({new Date(booking.checkInDate).toDateString()} - {new Date(booking.checkOutDate).toDateString()})
            <button onClick={() => setSelectedBooking(booking)}>Add Review</button>
            <button onClick={() => fetchReviews(booking.stayName)}>View Reviews</button>
          </li>
        ))}
      </ul>

      {selectedBooking && (
        <div>
          <h3>Add Review for {selectedBooking.stayName}</h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your feedback here"
          />
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating (1-5)"
            min="1"
            max="5"
          />
          <button onClick={handleReviewSubmit}>Submit Review</button>
        </div>
      )}

      {reviews.length > 0 && (
        <div>
          <h3>Reviews</h3>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                {review.comment} - {review.rating}/5 (Posted on {new Date(review.date).toDateString()})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
