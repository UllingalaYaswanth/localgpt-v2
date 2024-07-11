import admin from 'firebase-admin';

export const authenticateUser = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(401).send('Unauthorized');
  }
};

export const authorizeUser = (roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.uid) {
      return res.status(401).send('Unauthorized');
    }

    const { role } = req.user;

    if (roles.includes(role)) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  };
};