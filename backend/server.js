// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import admin from 'firebase-admin';
// import fs from 'fs';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import User from './userModel.js'; // Adjust the path as needed
// import multer from 'multer';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:5173', // Adjust to your React app's origin
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type'],
// }));

// // Serve static files from the 'uploads' directory
// app.use('/uploads', express.static('uploads'));

// // Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Initialize Firebase Admin SDK
// const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

// try {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//   });
//   console.log('Firebase Admin initialized');
// } catch (error) {
//   console.error('Error initializing Firebase Admin:', error);
// }

// // Set up multer storage for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads'); // Specify where to store uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Rename the file if needed
//   }
// });

// const upload = multer({ storage });

// // Route to register a new user
// app.post('/register', upload.single('profileImage'), async (req, res) => {
//   const { firstName, lastName, emailAddress, password, role, level, designation } = req.body;

//   try {
//     // Check if required fields are provided
//     if (!firstName || !lastName || !emailAddress || !password || !role || !level || !designation) {
//       throw new Error('All fields are required');
//     }

//     // Create user in Firebase Authentication to get UID
//     const userRecord = await admin.auth().createUser({
//       email: emailAddress,
//       password: password,
//       displayName: `${firstName} ${lastName}`
//     });

//     const firebaseUid = userRecord.uid; // Get the Firebase UID
//     const profileImage = req.file ? req.file.filename : 'default.jpg'; // Default image if not provided

//     const newUser = new User({ firstName, lastName, emailAddress, role, level, firebaseUid, profileImage, designation });
//     await newUser.save();

//     const profileImageUrl = `http://localhost:5000/uploads/${profileImage}`;

//     res.status(201).json({ message: 'User registered successfully', user: newUser, profileImageUrl });
//   } catch (error) {
//     console.error('Error registering user:', error.message);
//     res.status(400).json({ error: error.message }); // Return specific error message to client
//   }
// });

// // Route to login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     th
//     const userCredential = await admin.auth().getUserByEmail(email);
//     const firebaseUid = userCredential.uid;
//     const user = await User.findOne({ firebaseUid });

//     if (!user) {
//       throw new Error('User not found');
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ token, user });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(400).json({ error: error.message });
//   }
// });

// // Route to fetch all users
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // groups ---------------------------

// app.post('/api/admin/groups', async (req, res) => {
//   const { name, selectedUsers, documents } = req.body;

//   try {
//     if (!name, !selectedUsers.length, !documents.length) {
//       throw new Error('Group name, users, and documents are required');
//     }

//     const usersDetails = await User.find({ _id: { $in: selectedUsers } }, 'firstName lastName');

//     const documentsDetails = await File.find({ _id: { $in: documents } }, 'name');

//     const users = usersDetails.map(user => ({
//       firstName: user.firstName,
//       lastName: user.lastName
//     }));

//     const documents = documentsDetails.map(doc => ({
//       name: doc.name
//     }));

//     // Create new AdminGroup instance
//     const newGroup = new AdminGroup({
//       name,
//       users,
//       documents
//     });

//     // Save the group to MongoDB
//     await newGroup.save();

//     res.status(201).json({ message: 'Group created successfully', group: newGroup });
//   } catch (error) {
//     console.error('Error creating group:', error);
//     res.status(400).json({ error: error.message });
//   }
// });

// // doc----------------------
// app.post('/api/files', async (req, res) => {
//   const { name, path_lower, location } = req.body;

//   try {
//     // Check if the file already exists
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


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import admin from 'firebase-admin';
// import fs from 'fs';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import User from './userModel.js'; // Adjust the path as needed
// import multer from 'multer';
// import File from './fileModel.js'; // Adjust the path as needed
// import axios from 'axios';
// import Group from './groupModel.js'; // Assuming you have a Group model defined
// import AdminGroup from './adminGroupModel.js'; // Assuming you have an AdminGroup model defined

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:5173', // Adjust to your React app's origin
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type'],
// }));

// // Serve static files from the 'uploads' directory
// app.use('/uploads', express.static('uploads'));

// // Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Initialize Firebase Admin SDK
// const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

// try {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//   });
//   console.log('Firebase Admin initialized');
// } catch (error) {
//   console.error('Error initializing Firebase Admin:', error);
// }

// // Set up multer storage for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads'); // Specify where to store uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Rename the file if needed
//   }
// });

// const upload = multer({ storage });

// // Route to register a new user
// app.post('/register', upload.single('profileImage'), async (req, res) => {
//   const { firstName, lastName, emailAddress, password, role, level, designation } = req.body;

//   try {
//     // Check if required fields are provided
//     if (!firstName || !lastName || !emailAddress || !password || !role || !level || !designation) {
//       throw new Error('All fields are required');
//     }

//     // Create user in Firebase Authentication to get UID
//     const userRecord = await admin.auth().createUser({
//       email: emailAddress,
//       password: password,
//       displayName: `${firstName} ${lastName}`
//     });

//     const firebaseUid = userRecord.uid; // Get the Firebase UID
//     const profileImage = req.file ? req.file.filename : 'default.jpg'; // Default image if not provided

//     const newUser = new User({ firstName, lastName, emailAddress, role, level, firebaseUid, profileImage, designation });
//     await newUser.save();

//     const profileImageUrl = `http://localhost:5000/uploads/${profileImage}`;

//     res.status(201).json({ message: 'User registered successfully', user: newUser, profileImageUrl });
//   } catch (error) {
//     console.error('Error registering user:', error.message);
//     res.status(400).json({ error: error.message }); // Return specific error message to client
//   }
// });

// // Route to login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userCredential = await admin.auth().getUserByEmail(email);
//     const firebaseUid = userCredential.uid;
//     const user = await User.findOne({ firebaseUid });

//     if (!user) {
//       throw new Error('User not found');
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ token, user });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(400).json({ error: error.message });
//   }
// });

// // Route to fetch all users
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Route to upload file details
// app.post('/api/files', async (req, res) => {
//   const { name, path_lower, location } = req.body;

//   try {
//     // Check if the file already exists
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
// app.get('/api/files', async (req, res) => {
//   const accessToken = 'sl.B47xV-zNbI5GO9qGUPfud6s-9-w7flgmGF3bKtpZhw-mqAGKyfw0bdWiYLq5sU6iDu4yEhS62JGckOthzl7Ixt46aSeKJ02Na4ZQQ_2BrNOt7YFFTLjLuYBvl7W_rQTDLo-lo2xUrhNP-_2DDbsNbC8'; // Replace with your Dropbox access token

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
//     const allDocuments = results.flat(); // Flatten the array of arrays

//     res.status(200).json(allDocuments);
//   } catch (error) {
//     console.error('Error fetching documents from Dropbox:', error);
//     res.status(500).json({ error: 'Failed to fetch documents' });
//   }
// });


// app.post('/api/admin/groups', async (req, res) => {
//   try {
//     const { name, documents, selectedUsers, access_level } = req.body;

//     // Assuming selectedUsers and documents are arrays of ObjectId strings
//     const group = new Group({
//       name,
//       users: selectedUsers,
//       documents,
//       access_level
//     });

//     const savedGroup = await group.save();
//     res.status(201).json(savedGroup);
//   } catch (error) {
//     console.error('Error creating group:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import admin from 'firebase-admin';
// import fs from 'fs';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import User from './userModel.js'; // Adjust the path as needed
// import multer from 'multer';
// import File from './fileModel.js'; // Adjust the path as needed
// import axios from 'axios';
// import Group from './groupModel.js'; // Assuming you have a Group model defined

// dotenv.config();

// const app = express();
// app.use(express.json());
// // app.use(cors({
// //   origin: 'http://localhost:5173', // Adjust to your React app's origin
// //   methods: ['GET', 'POST'],
// //   allowedHeaders: ['Content-Type'],
// // }));

// app.use(cors())
// // Serve static files from the 'uploads' directory
// app.use('/uploads', express.static('uploads'));

// // Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Initialize Firebase Admin SDK
// const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

// try {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//   });
//   console.log('Firebase Admin initialized');
// } catch (error) {
//   console.error('Error initializing Firebase Admin:', error);
// }

// // Set up multer storage for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads'); // Specify where to store uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Rename the file if needed
//   }
// });

// const upload = multer({ storage });

// // Route to register a new user
// app.post('/register', upload.single('profileImage'), async (req, res) => {
//   const { firstName, lastName, emailAddress, password, role, level, designation } = req.body;

//   try {
//     // Check if required fields are provided
//     if (!firstName || !lastName || !emailAddress || !password || !role || !level || !designation) {
//       throw new Error('All fields are required');
//     }

//     // Create user in Firebase Authentication to get UID
//     const userRecord = await admin.auth().createUser({
//       email: emailAddress,
//       password: password,
//       displayName: `${firstName} ${lastName}`
//     });

//     const firebaseUid = userRecord.uid; // Get the Firebase UID
//     const profileImage = req.file ? req.file.filename : 'default.jpg'; // Default image if not provided

//     const newUser = new User({ firstName, lastName, emailAddress, role, level, firebaseUid, profileImage, designation });
//     await newUser.save();

//     const profileImageUrl = `http://localhost:5000/uploads/${profileImage}`;

//     res.status(201).json({ message: 'User registered successfully', user: newUser, profileImageUrl });
//   } catch (error) {
//     console.error('Error registering user:', error.message);
//     res.status(400).json({ error: error.message }); // Return specific error message to client
//   }
// });

// // Route to login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userCredential = await admin.auth().getUserByEmail(email);
//     const firebaseUid = userCredential.uid;
//     const user = await User.findOne({ firebaseUid });

//     if (!user) {
//       throw new Error('User not found');
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ token, user });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(400).json({ error: error.message });
//   }
// });

// // Route to fetch all users
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Route to upload file details
// app.post('/api/files', async (req, res) => {
//   const { name, path_lower, location } = req.body;

//   try {
//     // Check if the file already exists
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
// app.get('/api/files', async (req, res) => {
//   const accessToken = 'sl.B47xV-zNbI5GO9qGUPfud6s-9-w7flgmGF3bKtpZhw-mqAGKyfw0bdWiYLq5sU6iDu4yEhS62JGckOthzl7Ixt46aSeKJ02Na4ZQQ_2BrNOt7YFFTLjLuYBvl7W_rQTDLo-lo2xUrhNP-_2DDbsNbC8'; // Replace with your Dropbox access token

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
//     const allDocuments = results.flat(); // Flatten the array of arrays

//     res.status(200).json(allDocuments);
//   } catch (error) {
//     console.error('Error fetching documents from Dropbox:', error);
//     res.status(500).json({ error: 'Failed to fetch documents' });
//   }
// });

// // Route to create a new group
// app.post('/api/admin/groups', async (req, res) => {
//   try {
//     const { name, users, documents, access_level } = req.body;
//     const group = new Group({
//       name,
//       users,
//       documents,
//       access_level,
//     });
//     const savedGroup = await group.save();
//     res.status(201).json(savedGroup);
//   } catch (error) {
//     console.error('Error creating group:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route to fetch all groups with their respective accounts and documents
// app.get('/api/admin/groups', async (req, res) => {
//   try {
//     const groups = await Group.find()
//       .populate('users', 'firstName lastName emailAddress') // Adjust as per your user schema
//       .populate('documents', 'name path_lower location'); // Adjust as per your document schema

//     res.status(200).json(groups);
//   } catch (error) {
//     console.error('Error fetching groups:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route to fetch a single group by ID with its respective accounts and documents
// app.get('/api/admin/groups/:groupId', async (req, res) => {
//   try {
//     const { groupId } = req.params;

//     const group = await Group.findById(groupId)
//       .populate('users', 'firstName lastName emailAddress') // Adjust as per your user schema
//       .populate('documents', 'name path_lower location'); // Adjust as per your document schema

//     if (!group) {
//       return res.status(404).json({ error: 'Group not found' });
//     }

//     res.status(200).json(group);
//   } catch (error) {
//     console.error('Error fetching group:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import admin from 'firebase-admin';
// import fs from 'fs';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import User from './Models/userModel.js'; // Adjust the path as needed
// import multer from 'multer';
// import File from './Models/fileModel.js'; // Adjust the path as needed
// import axios from 'axios';
// import Group from './Models/groupModel.js'; // Assuming you have a Group model defined

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use('/uploads', express.static('uploads'));

// // Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Initialize Firebase Admin SDK
// const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

// try {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//   });
//   console.log('Firebase Admin initialized');
// } catch (error) {
//   console.error('Error initializing Firebase Admin:', error);
// }

// // Set up multer storage for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// // Route to register a new user
// app.post('/register', upload.single('profileImage'), async (req, res) => {
//   const { firstName, lastName, emailAddress, password, role, level, designation } = req.body;

//   try {
//     if (!firstName || !lastName || !emailAddress || !password || !role || !level || !designation) {
//       throw new Error('All fields are required');
//     }

//     const userRecord = await admin.auth().createUser({
//       email: emailAddress,
//       password: password,
//       displayName: `${firstName} ${lastName}`
//     });

//     const firebaseUid = userRecord.uid;
//     const profileImageFileName = req.file ? req.file.filename : 'default.jpg';

//     const newUser = new User({ firstName, lastName, emailAddress, role, level, firebaseUid, profileImage: profileImageFileName, designation });
//     await newUser.save();

//     const profileImageUrl = `http://localhost:5000/uploads/${profileImageFileName}`;

//     res.status(201).json({ message: 'User registered successfully', user: newUser, profileImageUrl });
//   } catch (error) {
//     console.error('Error registering user:', error.message);
//     res.status(400).json({ error: error.message });
//   }
// });

// // Route to login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Authenticate user using Firebase Auth
//     const userCredential = await admin.auth().getUserByEmail(email);
//     const firebaseUid = userCredential.uid;

//     // Find user in MongoDB by Firebase UID
//     const user = await User.findOne({ firebaseUid });

//     if (!user) {
//       throw new Error('User not found');
//     }

//     // Generate JWT token for authentication
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ token, user });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(400).json({ error: error.message });
//   }
// });


// // Route to fetch all users
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Route to upload file details
// app.post('/api/files', async (req, res) => {
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
// app.get('/api/files', async (req, res) => {
//   const accessToken = 'sl.B47xV-zNbI5GO9qGUPfud6s-9-w7flgmGF3bKtpZhw-mqAGKyfw0bdWiYLq5sU6iDu4yEhS62JGckOthzl7Ixt46aSeKJ02Na4ZQQ_2BrNOt7YFFTLjLuYBvl7W_rQTDLo-lo2xUrhNP-_2DDbsNbC8';

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

// // Route to create a new group
// app.post('/api/admin/groups', async (req, res) => {
//   try {
//     const { name, users, documents, access_level } = req.body;
//     const group = new Group({
//       name,
//       users,
//       documents,
//       access_level,
//     });
//     const savedGroup = await group.save();
//     res.status(201).json(savedGroup);
//   } catch (error) {
//     console.error('Error creating group:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route to fetch all groups with their respective accounts and documents
// app.get('/api/admin/groups', async (req, res) => {
//   try {
//     const groups = await Group.find()
//       .populate('users', 'firstName lastName emailAddress')
//       .populate('documents', 'name path_lower location');

//     res.status(200).json(groups);
//   } catch (error) {
//     console.error('Error fetching groups:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route to fetch a single group by ID with its respective accounts and documents
// app.get('/api/admin/groups/:groupId', async (req, res) => {
//   try {
//     const { groupId } = req.params;

//     const group = await Group.findById(groupId)
//       .populate('users', 'firstName lastName emailAddress')
//       .populate('documents', 'name path_lower location');

//     if (!group) {
//       return res.status(404).json({ error: 'Group not found' });
//     }

//     res.status(200).json(group);
//   } catch (error) {
//     console.error('Error fetching group:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import fs from 'fs';
import cors from 'cors';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
  console.log('Firebase Admin initialized');
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
}

// Import routes
import userRoutes from './routes/userRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import fileRoutes from './routes/fileRoutes.js';

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { admin, jwt };
