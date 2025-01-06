import React, { useState } from 'react';
import axios from 'axios';

const TouristRecommendations = () => {
  const [location, setLocation] = useState('');
  const [interest, setInterest] = useState('');
  const [tripPlan, setTripPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/recommendations', {
        location,
        interest,
      });
      setTripPlan(response.data.plan);
    } catch (error) {
      console.error('Error fetching trip plan:', error);
      setTripPlan('Failed to generate a trip plan. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AI-Powered Trip Recommendations</h2>
      <div>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location (e.g., Paris)"
          />
        </label>
      </div>
      <div>
        <label>
          Interest:
          <input
            type="text"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder="Enter interest (e.g., Adventure)"
          />
        </label>
      </div>
      <button onClick={handleGeneratePlan} disabled={loading}>
        {loading ? 'Generating...' : 'Get Recommendations'}
      </button>
      {tripPlan && (
        <div>
          <h3>Your Trip Plan:</h3>
          <p>{tripPlan}</p>
        </div>
      )}
    </div>
  );
};

export default TouristRecommendations;
