const { Gtts } = require('gtts');
const streamToBuffer = require('stream-to-buffer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Create gTTS instance
    const speech = new Gtts(text, 'en');
    
    // Convert stream to buffer
    const audioStream = speech.stream();
    const buffer = await new Promise((resolve, reject) => {
      const chunks = [];
      audioStream.on('data', (chunk) => chunks.push(chunk));
      audioStream.on('end', () => resolve(Buffer.concat(chunks)));
      audioStream.on('error', reject);
    });

    // Send the audio
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(buffer);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error generating speech' });
  }
}