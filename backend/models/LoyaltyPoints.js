const mongoose = require('mongoose');

const loyaltyPointsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
  redemptionHistory: [
    {
      redeemedPoints: Number,
      reward: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('LoyaltyPoints', loyaltyPointsSchema);
