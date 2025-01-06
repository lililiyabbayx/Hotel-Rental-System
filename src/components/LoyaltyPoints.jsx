import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoyaltyPoints = ({ userId }) => {
  const [loyaltyData, setLoyaltyData] = useState(null);
  const [redeemPoints, setRedeemPoints] = useState('');
  const [reward, setReward] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch loyalty points
    const fetchLoyaltyData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/loyalty-points/${userId}`);
        setLoyaltyData(response.data);
      } catch (error) {
        console.error('Error fetching loyalty points:', error);
      }
    };

    fetchLoyaltyData();
  }, [userId]);

  const handleRedeem = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/loyalty-points/redeem', {
        userId,
        redeemedPoints: redeemPoints,
        reward,
      });
      setMessage(response.data.message);
      setRedeemPoints('');
      setReward('');
      setLoyaltyData(response.data.loyaltyPoints);
    } catch (error) {
      console.error('Error redeeming points:', error);
      setMessage(error.response?.data?.error || 'Failed to redeem points');
    }
  };

  return (
    <div>
      <h2>Loyalty Points</h2>
      {loyaltyData ? (
        <div>
          <p>Total Points: {loyaltyData.totalPoints}</p>
          <h3>Redemption History</h3>
          <ul>
            {loyaltyData.redemptionHistory.map((entry, index) => (
              <li key={index}>
                Redeemed {entry.redeemedPoints} points for {entry.reward} on{' '}
                {new Date(entry.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <h3>Redeem Points</h3>
      <input
        type="number"
        placeholder="Points to Redeem"
        value={redeemPoints}
        onChange={(e) => setRedeemPoints(e.target.value)}
      />
      <input
        type="text"
        placeholder="Reward (e.g., Spa, Food)"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
      />
      <button onClick={handleRedeem}>Redeem</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default LoyaltyPoints;

