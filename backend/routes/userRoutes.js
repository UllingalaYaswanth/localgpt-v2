import express from 'express';
import { admin, jwt } from '../server.js';
import upload from '../middleware/upload.js';
import User from '../Models/userModel.js';
import Session from '../Models/sessionModel.js';

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

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await admin.auth().getUserByEmail(email);
    const firebaseUid = userCredential.uid;

    const user = await User.findOne({ firebaseUid });

    if (!user) {
      throw new Error('User not found');
    }

    // Set session data
    req.session.userId = user._id;
    req.session.email = user.emailAddress;
    req.session.role = user.role;

    // Create or update session record
    const sessionId = req.sessionID;
    const session = await Session.findOneAndUpdate(
      { sessionId },
      { userId: user._id, sessionId, startTime: new Date() },
      { upsert: true, new: true }
    );

    // Log session ID and start time to console
    console.log(`Session ID ${sessionId} started at ${session.startTime}`);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const responseData = {
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        role: user.role,
        profileImageUrl: `http://localhost:5000/uploads/${user.profileImage}`
      }
    };

    console.log('Login response data:', responseData); // Log login response data

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(400).json({ error: error.message });
  }
});


router.post('/logout', async (req, res) => {
  if (req.session) {
    try {
      const endTime = new Date();
      const sessionId = req.sessionID;

      // Update the session record with endTime
      await Session.findOneAndUpdate(
        { sessionId, endTime: { $exists: false } },
        { endTime },
        { new: true }
      );

      // Log session ID and end time to console
      console.log(`Session ID ${sessionId} logged out at ${endTime}`);

      // Destroy session
      req.session.destroy((err) => {
        if (err) {
          console.error('Failed to log out:', err);
          return res.status(500).json({ error: 'Failed to log out' });
        } else {
          res.status(200).json({ message: 'Logged out successfully' });
        }
      });
    } catch (error) {
      console.error('Error logging out:', error.message);
      console.error('Error stack:', error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(200).json({ message: 'No active session' });
  }
});



router.get('/sessions', async (req, res) => {
  try {
    const sessions = await Session.find({}, 'userId sessionId startTime endTime')
      .populate('userId', 'firstName lastName');

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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

// Example backend route to fetch user details based on email
router.get('/api/users', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ emailAddress: email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: `http://localhost:5000/uploads/${user.profileImage}`
    };

    console.log('User data fetched:', userData);

    res.status(200).json({ user: userData });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(400).json({ error: error.message });
  }
});



export default router;