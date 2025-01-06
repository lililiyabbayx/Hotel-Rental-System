const express = require('express');
const router = express.Router();
const LoyaltyPoints = require('../models/LoyaltyPoints');

// Fetch loyalty points for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    let loyaltyPoints = await LoyaltyPoints.findOne({ userId });
    if (!loyaltyPoints) {
      loyaltyPoints = new LoyaltyPoints({ userId });
      await loyaltyPoints.save();
    }
    res.json(loyaltyPoints);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch loyalty points' });
  }
});

// Add points based on spending or nights stayed
router.post('/add', async (req, res) => {
  const { userId, points } = req.body;
  try {
    const loyaltyPoints = await LoyaltyPoints.findOneAndUpdate(
      { userId },
      { $inc: { totalPoints: points } },
      { new: true, upsert: true }
    );
    res.json(loyaltyPoints);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to add points' });
  }
});

// Redeem points for rewards
router.post('/redeem', async (req, res) => {
  const { userId, redeemedPoints, reward } = req.body;
  try {
    const loyaltyPoints = await LoyaltyPoints.findOne({ userId });
    if (!loyaltyPoints || loyaltyPoints.totalPoints < redeemedPoints) {
      return res.status(400).json({ error: 'Insufficient points' });
    }

    loyaltyPoints.totalPoints -= redeemedPoints;
    loyaltyPoints.redemptionHistory.push({ redeemedPoints, reward });
    await loyaltyPoints.save();

    res.json({ message: 'Points redeemed successfully', loyaltyPoints });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to redeem points' });
  }
});

module.exports = router;
