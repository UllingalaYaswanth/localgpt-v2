// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import admin from 'firebase-admin';
// import fs from 'fs';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';
// import userRoutes from './routes/userRoutes.js';
// import groupRoutes from './routes/groupRoutes.js';
// import fileRoutes from './routes/fileRoutes.js';

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());
// app.use('/uploads', express.static('uploads'));

// const sessionMiddleware = session({
//   secret: process.env.SESSION_SECRET || 'your_session_secret',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGO_URI,
//     collectionName: 'sessions'
//   }),
//   cookie: {
//     maxAge: 1000 * 60 * 60 // 1 hour
//   }
// });
// app.use(sessionMiddleware);


// // Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));

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

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/admin', groupRoutes);
// app.use('/api/files', fileRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// export { admin, jwt, sessionMiddleware };


// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import admin from 'firebase-admin';
// import fs from 'fs';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';
// import userRoutes from './routes/userRoutes.js';
// import groupRoutes from './routes/groupRoutes.js';
// import fileRoutes from './routes/fileRoutes.js';

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());
// app.use('/uploads', express.static('uploads'));

// // Custom static session ID generator function
// const generateSessionId = () => 'hello123'; // Replace with your own static ID generator

// const sessionMiddleware = session({
//   secret: process.env.SESSION_SECRET || 'your_session_secret',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGO_URI,
//     collectionName: 'sessions'
//   }),
//   genid: generateSessionId, // Use the custom session ID generator
//   cookie: {
//     maxAge: 1000 * 60 * 60 // 1 hour
//   }
// });
// app.use(sessionMiddleware);

// // Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));

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

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/admin', groupRoutes);
// app.use('/api/files', fileRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// export { admin, jwt, sessionMiddleware };


// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import admin from 'firebase-admin';
// import fs from 'fs';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';
// import userRoutes from './routes/userRoutes.js';
// import groupRoutes from './routes/groupRoutes.js';
// import fileRoutes from './routes/fileRoutes.js';

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());
// app.use('/uploads', express.static('uploads'));

// // Custom static session ID generator function
// const generateSessionId = () => 'hello123'; // Replace with your own static ID generator

// const sessionMiddleware = session({
//   secret: process.env.SESSION_SECRET || 'your_session_secret',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGO_URI,
//     collectionName: 'sessions'
//   }),
//   genid: generateSessionId, // Use the custom session ID generator
//   cookie: {
//     maxAge: 1000 * 60 * 60 // 1 hour
//   }
// });
// app.use(sessionMiddleware);

// // Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));

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

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/admin', groupRoutes);
// app.use('/api/files', fileRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// export { admin, jwt, sessionMiddleware };

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import fs from 'fs';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userRoutes from './routes/userRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique session IDs

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Custom dynamic session ID generator function using uuid
const generateSessionId = () => uuidv4();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  genid: generateSessionId, // Use the custom session ID generator
  cookie: {
    maxAge: 1000 * 60 * 60 // 1 hour
  }
});
app.use(sessionMiddleware);

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

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', groupRoutes);
app.use('/api/files', fileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { admin, jwt, sessionMiddleware };
