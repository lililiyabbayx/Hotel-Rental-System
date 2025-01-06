const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  stayName: { type: String, required: true },
  location: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  reviews: [
    {
      userId: String,
      comment: String,
      rating: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});


module.exports = mongoose.model('Booking', bookingSchema);

