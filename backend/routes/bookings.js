const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Fetch booking history for a user
router.get('/history/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.find({ userId });
    res.json(bookings);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch booking history' });
  }
});

// Submit a review for a stay
router.post('/review', async (req, res) => {
  const { bookingId, userId, comment, rating } = req.body;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    booking.reviews.push({ userId, comment, rating });
    await booking.save();

    res.json({ message: 'Review added successfully', booking });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// Fetch reviews for a stay
router.get('/reviews/:stayName', async (req, res) => {
  const { stayName } = req.params;
  try {
    const bookings = await Booking.find({ stayName });
    const reviews = bookings.flatMap((booking) => booking.reviews);
    res.json(reviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
