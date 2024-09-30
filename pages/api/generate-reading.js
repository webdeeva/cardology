import { OpenAI } from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  console.log('API route hit:', req.method);
  
  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;
      console.log('Received prompt:', prompt);

      if (!prompt) {
        throw new Error('No prompt provided');
      }

      const response = await client.chat.completions.create({
        model: "gpt-4o-2024-08-06", // Updated to the latest available model
        messages: [
          {"role": "system", "content": "You are an expert Cardologer/Astrologer providing detailed and insightful readings based on the provided card data. Strictly use the information given for each card. No need for proving direct interactions like thank you or cordialties"},
          {"role": "user", "content": prompt}
        ],
        temperature: 0.6,
        max_tokens: 9800,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.1
      });

      console.log('OpenAI response received');

      const reading = response.choices[0].message.content;
      res.status(200).json({ reading });
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ error: error.message || 'An error occurred while generating the reading.' });
    }
  } else {
    console.log('Method not allowed:', req.method);
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}