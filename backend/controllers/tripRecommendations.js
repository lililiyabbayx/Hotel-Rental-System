const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// API endpoint for trip recommendations
app.post('/api/recommendations', async (req, res) => {
  const { location, interest } = req.body;

  try {
    const prompt = `Generate a tailored trip plan for someone visiting ${location} interested in ${interest}. Include activities, places to visit, and any useful tips.`;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 200,
    });

    res.json({ plan: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
