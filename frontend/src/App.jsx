// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { Dashboard, DevDashboard, Auth } from './layouts'; 
// import { SignIn , ForgotPassword} from './pages/auth'; 
// import UserApp from './UserApp';

// function App() {
//   return (
//     <Routes>
//       <Route path="/dashboard/*" element={<Dashboard />} />
//       <Route path="/dev-dashboard/*" element={<DevDashboard />} />
//       <Route path="/user" element={<UserApp />} />
//       <Route path="/auth/*" element={<Auth />} />
//       <Route path="/auth/forgotpwd" element={<ForgotPassword />} />
//       <Route path="/" element={<SignIn />} /> 

//     </Routes>
//   );
// }

// export default App;


// App.js
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { Dashboard, DevDashboard, Auth } from './layouts'; 
// import { SignIn , ForgotPassword } from './pages/auth'; 
// import UserApp from './UserApp';
// import { AuthProvider } from './AuthContext';
// import PrivateRoute from './PrivateRoute';

// function App() {
//   return (
//     <AuthProvider>
//       <Routes>
//         <PrivateRoute path="/dashboard/*" element={<Dashboard />} />
//         <PrivateRoute path="/dev-dashboard/*" element={<DevDashboard />} />
//         <PrivateRoute path="/user" element={<UserApp />} />
//         <Route path="/auth/*" element={<Auth />} />
//         <Route path="/auth/forgotpwd" element={<ForgotPassword />} />
//         <Route path="/" element={<SignIn />} />
//       </Routes>
//     </AuthProvider>
//   );
// }

// export default App;



// App.js
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { Dashboard, DevDashboard, Auth } from './layouts'; 
// import { SignIn , ForgotPassword } from './pages/auth'; 
// import UserApp from './UserApp';
// import { AuthProvider } from './AuthContext.jsx';
// import PrivateRoute from './PrivateRoute';

// function App() {
//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path="/" element={<SignIn />} />
//         <Route path="/auth/*" element={<Auth />} />
//         <Route path="/auth/forgotpwd" element={<ForgotPassword />} />

//         <Route element={<PrivateRoute />}>
//           <Route path="/dashboard/*" element={<Dashboard />} />
//           <Route path="/dev-dashboard/*" element={<DevDashboard />} />
//           <Route path="/user" element={<UserApp />} />
//         </Route>
//       </Routes>
//     </AuthProvider>
//   );
// }

// export default App;


// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard, DevDashboard, Auth } from './layouts'; 
import { SignIn , ForgotPassword } from './pages/auth'; 
import UserApp from './UserApp';
import { AuthProvider } from './AuthContext.jsx';
import PrivateRoute from './PrivateRoute.jsx'; // Adjust the import path as needed

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/auth/forgotpwd" element={<ForgotPassword />} />

        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
        
        <Route element={<PrivateRoute allowedRoles={['developer']} />}>
          <Route path="/dev-dashboard/*" element={<DevDashboard />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={['user']} />}>
          <Route path="/user" element={<UserApp />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
