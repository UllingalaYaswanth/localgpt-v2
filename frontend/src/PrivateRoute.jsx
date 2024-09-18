// // PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const PrivateRoute = ({ element: Component, ...rest }) => {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated ? (
//     <Route {...rest} element={Component} />
//   ) : (
//     <Navigate to="/" />
//   );
// };

// export default PrivateRoute;


// PrivateRoute.jsx
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const PrivateRoute = () => {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
// };

// export default PrivateRoute;


// PrivateRoute.jsx
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from './AuthContext.jsx'; // Adjust the import path as needed

// const PrivateRoute = () => {
//   const { isAuthenticated } = useAuth();

//   const storedAuth = localStorage.getItem('isAuthenticated');
//   const isAuth = isAuthenticated || JSON.parse(storedAuth);

//   return isAuth ? <Outlet /> : <Navigate to="/" />;
// };

// export default PrivateRoute;


// PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  const storedAuth = localStorage.getItem('isAuthenticated');
  const isAuth = isAuthenticated || JSON.parse(storedAuth);
  const storedRole = localStorage.getItem('userRole');

  return isAuth && allowedRoles.includes(storedRole || userRole) ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
