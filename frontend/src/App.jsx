// import { Routes, Route, Navigate } from "react-router-dom";
// import { Dashboard, Auth, DevDashboard } from "@/layouts";
// import { SignIn } from "./pages/auth";

// function App() {
//   return (
//     <Routes>
//       <Route path="/dashboard/*" element={<Dashboard />} />
//       <Route path="/dev-dashboard/*" element={<DevDashboard />} />
//       <Route path="/auth/*" element={<Auth />} />
//       <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
//       <Route path="/auth/sign-in" element={<SignIn />} />
//     </Routes>
//   );
// }

// export default App;


// App.js

// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { Dashboard, DevDashboard, Auth } from '@/layouts'; // Adjust import paths as needed
// import { SignIn } from '@/pages/auth/sign-in'; // Adjust import paths as needed

// function App() {
//   return (
//     <Routes>
//       <Route path="/dashboard/*" element={<Dashboard />} />
//       <Route path="/dev-dashboard/*" element={<DevDashboard />} />
//       <Route path="/auth/*" element={<Auth />} />
//       <Route path="/auth/sign-in" element={<SignIn />} />
//       <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
//     </Routes>
//   );
// }

// export default App;


// App.js

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { Dashboard, DevDashboard, Auth } from './layouts'; // Adjust import paths as needed
// import { SignIn } from './pages/auth'; // Adjust import paths as needed

// function App() {
//   return (
//     <Routes>
//       <Route path="/dashboard/*" element={<Dashboard />} />
//       <Route path="/dev-dashboard/*" element={<DevDashboard />} />
//       <Route path="/auth/*" element={<Auth />} />
//       <Route path="/" element={<SignIn />} /> {/* Default route to SignIn */}
//       {/* Other routes */}
//     </Routes>
//   );
// }

// export default App;


// App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard, DevDashboard, Auth } from './layouts'; // Adjust import paths as needed
import { SignIn } from './pages/auth'; // Adjust import paths as needed
import UserApp from './UserApp';

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/dev-dashboard/*" element={<DevDashboard />} />
      <Route path="/user" element={<UserApp />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/" element={<SignIn />} /> {/* Default route to SignIn */}
    </Routes>
  );
}

export default App;
