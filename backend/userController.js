import Session from '../models/sessionModel.js';

// Create a new session
export const createSession = async (userId, token) => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // Set session expiration to 1 hour from now

  await Session.create({
    userId,
    token,
    expiresAt
  });
};

// Handle user logout and delete session
export const logout = async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  await Session.deleteOne({ token });
  res.status(200).send('Logged out successfully');
};
