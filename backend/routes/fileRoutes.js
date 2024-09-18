// import express from 'express';
// import axios from 'axios';
// import File from '../Models/fileModel.js';

// const router = express.Router();

// // Route to upload file details
// router.post('/files', async (req, res) => {
//   const { name, path_lower, location } = req.body;

//   try {
//     const existingFile = await File.findOne({ name, path_lower, location });
//     if (existingFile) {
//       return res.status(409).send({ message: 'File already exists' });
//     }

//     const file = new File({ name, path_lower, location });
//     await file.save();
//     res.status(201).send(file);
//   } catch (error) {
//     console.error('Error saving file to database:', error);
//     res.status(500).send({ error: 'Failed to save file' });
//   }
// });

// // Route to fetch documents from Dropbox
// router.get('/files', async (req, res) => {
//   const accessToken = 'sl.B485CHhuPgoGQGqN5_SBOrykA6BMGLSJ8l2s_enlAcIZSDNs1tfrXuZGxoX7JeKEouy5IPDyCK7BzA6NSbGC0fw3cy_c1OPIlTi8ILpu7TSDwqJ6Upk3nOzGfFHTJe7M4t8zz83Eu_PjMHFesNLUhpI';

//   const dbx = axios.create({
//     baseURL: 'https://api.dropboxapi.com/2',
//     headers: {
//       'Authorization': `Bearer ${accessToken}`,
//       'Content-Type': 'application/json'
//     }
//   });

//   const paths = ['/localgpt/levelA', '/localgpt/levelB', '/localgpt/levelC'];

//   try {
//     const promises = paths.map(async (path) => {
//       const response = await dbx.post('/files/list_folder', {
//         path: path
//       });

//       return response.data.entries;
//     });

//     const results = await Promise.all(promises);
//     const allDocuments = results.flat();

//     res.status(200).json(allDocuments);
//   } catch (error) {
//     console.error('Error fetching documents from Dropbox:', error);
//     res.status(500).json({ error: 'Failed to fetch documents' });
//   }
// });

// export default router;


import express from 'express';
import axios from 'axios';
import File from '../Models/fileModel.js';

const router = express.Router();

// Route to upload file details
router.post('/', async (req, res) => {
  console.log('Incoming request body:', req.body); // Log the request body
  const { name, path_lower, location, level } = req.body;

  try {
    const existingFile = await File.findOne({ name, path_lower, location });
    if (existingFile) {
      return res.status(409).send({ message: 'File already exists' });
    }

    const file = new File({ name, path_lower, location, level });
    await file.save();
    res.status(201).send(file);
  } catch (error) {
    console.error('Error saving file to database:', error);
    res.status(500).send({ error: 'Failed to save file' });
  }
});


// Route to fetch documents from MongoDB

router.get('/', async (req, res) => {
  try {
    const documents = await File.find().select('name level createdAt');
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
});

// Route to fetch documents from Dropbox
router.get('/', async (req, res) => {
  const accessToken = 'enter access token'; // Use environment variables for sensitive data
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