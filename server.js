const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // To allow the frontend to send requests

const OPENAI_API_KEY = ''; // Replace this with your OpenAI API key

app.post('/api/openai', async (req, res) => {
    const { userInput } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4-0613',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a chatbot for a website which contains information about food and farms. When given a prompt, answer in maximum 5 lines.'
                    },
                    {
                        role: 'user',
                        content: userInput
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                }
            }
        );

        // Sending the response from OpenAI back to the frontend
        const answer = response.data.choices[0].message.content;
        res.json({ answer });
    } catch (error) {
        console.error('Error fetching from OpenAI:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
