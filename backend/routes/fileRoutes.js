import express from 'express';
import axios from 'axios';
import File from '../Models/fileModel.js';

const router = express.Router();

// Route to upload file details
router.post('/files', async (req, res) => {
  const { name, path_lower, location } = req.body;

  try {
    const existingFile = await File.findOne({ name, path_lower, location });
    if (existingFile) {
      return res.status(409).send({ message: 'File already exists' });
    }

    const file = new File({ name, path_lower, location });
    await file.save();
    res.status(201).send(file);
  } catch (error) {
    console.error('Error saving file to database:', error);
    res.status(500).send({ error: 'Failed to save file' });
  }
});

// Route to fetch documents from Dropbox
router.get('/files', async (req, res) => {
  const accessToken = 'sl.B47xV-zNbI5GO9qGUPfud6s-9-w7flgmGF3bKtpZhw-mqAGKyfw0bdWiYLq5sU6iDu4yEhS62JGckOthzl7Ixt46aSeKJ02Na4ZQQ_2BrNOt7YFFTLjLuYBvl7W_rQTDLo-lo2xUrhNP-_2DDbsNbC8';

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
      const response = await dbx.post('/files/list_folder', {
        path: path
      });

      return response.data.entries;
    });

    const results = await Promise.all(promises);
    const allDocuments = results.flat();

    res.status(200).json(allDocuments);
  } catch (error) {
    console.error('Error fetching documents from Dropbox:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

export default router;
