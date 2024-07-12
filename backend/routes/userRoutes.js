import express from 'express';
import { admin, jwt } from '../server.js';
import upload from '../middleware/upload.js';
import User from '../Models/userModel.js';

const router = express.Router();

// Route to register a new user
router.post('/register', upload.single('profileImage'), async (req, res) => {
  const { firstName, lastName, emailAddress, password, role, level, designation } = req.body;

  try {
    if (!firstName || !lastName || !emailAddress || !password || !role || !level || !designation) {
      throw new Error('All fields are required');
    }

    const userRecord = await admin.auth().createUser({
      email: emailAddress,
      password: password,
      displayName: `${firstName} ${lastName}`
    });

    const firebaseUid = userRecord.uid;
    const profileImageFileName = req.file ? req.file.filename : 'default.jpg';

    const newUser = new User({ firstName, lastName, emailAddress, role, level, firebaseUid, profileImage: profileImageFileName, designation });
    await newUser.save();

    const profileImageUrl = `http://localhost:5000/uploads/${profileImageFileName}`;

    res.status(201).json({ message: 'User registered successfully', user: newUser, profileImageUrl });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Route to login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Authenticate user using Firebase Auth
    const userCredential = await admin.auth().getUserByEmail(email);
    const firebaseUid = userCredential.uid;

    // Find user in MongoDB by Firebase UID
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      throw new Error('User not found');
    }

    // Generate JWT token for authentication
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(400).json({ error: error.message });
  }
});

// Route to fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
