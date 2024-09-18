import express from 'express';
import axios from 'axios';

const router = express.Router();

// Route to fetch documents from Dropbox
router.get('/dropbox', async (req, res) => {
  const accessToken = 'sl.B5DLTaa-dijAKak0bbej2J5fV8y6d8JcYpgtqNyFu99itN21TmnclV-S8_C626INRE_7g3Hvt9Rp8eNl903KZq0CgCgB6oar4FgL4rYxI3-D2jZ5QKK2r9jjNRRbSQemcT6VK4Fxaz-ZFcMOr5-OU7o'; // Replace with your Dropbox access token
  const dbx = axios.create({
    baseURL: 'https://api.dropboxapi.com/2',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  const paths = ['/localgpt/levelA', '/localgpt/levelB', '/localgpt/levelC'];

  try {
    const promises = paths.map(async (path) => {
      const response = await dbx.post('/files/list_folder', { path });
      console.log('Dropbox response:', response.data); // Log Dropbox response
      return response.data.entries;
    });

    const results = await Promise.all(promises);
    const allDocuments = results.flat();

    res.status(200).json(allDocuments);
  } catch (error) {
    console.error('Error fetching documents from Dropbox:', error.response ? error.response.data : error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

export default router;
