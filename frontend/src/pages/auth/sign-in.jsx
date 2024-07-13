// import React, { useState } from 'react';
// import { Input, Button, Typography } from "@material-tailwind/react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../../../backend/firebase"; // Adjust the import path as needed
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import axios from 'axios';

// export function SignIn() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSignIn = async (event) => {
//     event.preventDefault();
  
//     try {
//       // Firebase authentication
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
  
//       console.log('Firebase authentication successful:', user);
  
//       // Fetch user details from your backend
//       const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
  
//       if (!response.data) {
//         throw new Error('Invalid response from backend');
//       }
  
//       // Store user role and email in local storage
//       localStorage.setItem('userRole', response.data.user.role);
//       localStorage.setItem('userEmail', email);
  
//       console.log('Login successful. User role:', response.data.user.role);
  
//       // Redirect based on user role
//       switch (response.data.user.role) {
//         case 'admin':
//           console.log('Redirecting to admin dashboard');
//           navigate('/dashboard');
//           break;
//         case 'developer':
//           console.log('Redirecting to developer dashboard');
//           navigate('/dev-dashboard');
//           break;
//         default:
//           console.log('Redirecting to user dashboard');
//           navigate('/user');
//           break;
//       }
  
//       // Save the token for authentication purposes
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       console.error('Error signing in:', error);
//       setError(error.response?.data?.error || error.message); // Display specific error message from server
//     }
//   };
  

//   return (
//     <section className="m-8 flex gap-4">
//       <div className="w-full lg:w-3/5 mt-24">
//         <div className="text-center">
//           <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
//         </div>
//         <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignIn}>
//           <div className="mb-1 flex flex-col gap-6">
//             <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
//               Your email
//             </Typography>
//             <Input
//               size="lg"
//               placeholder="name@mail.com"
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
//               Password
//             </Typography>
//             <Input
//               type="password"
//               size="lg"
//               placeholder="********"
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           {error && <Typography variant="small" className="text-red-500">{error}</Typography>}
//           <Button className="mt-10" fullWidth type="submit">
//             Sign In
//           </Button>

//           <div className="flex items-center justify-end gap-2 mt-6">
//             <Typography variant="small" className="font-medium text-gray-900">
//             <a href="/auth/forgotpwd">Forgot Password</a>
//             </Typography>
//           </div>
//         </form>
//       </div>
//       <div className="w-2/5 h-full hidden lg:block">
//         <img
//           src="/img/pattern.png"
//           alt="Pattern"
//           className="h-full w-full object-cover rounded-3xl"
//         />
//       </div>
//     </section>
//   );
// }

// export default SignIn;


// SignIn.js
// import React, { useState } from 'react';
// import { Input, Button, Typography } from "@material-tailwind/react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../../../backend/firebase"; // Adjust the import path as needed
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import axios from 'axios';
// import { useAuth } from '../../AuthContext'; // Adjust the import path as needed

// export function SignIn() {
//   const navigate = useNavigate();
//   const { login } = useAuth(); // Use the login function from the context
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSignIn = async (event) => {
//     event.preventDefault();

//     try {
//       // Firebase authentication
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       console.log('Firebase authentication successful:', user);

//       // Fetch user details from your backend
//       const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

//       if (!response.data) {
//         throw new Error('Invalid response from backend');
//       }

//       // Store user role and email in local storage
//       localStorage.setItem('userRole', response.data.user.role);
//       localStorage.setItem('userEmail', email);

//       console.log('Login successful. User role:', response.data.user.role);

//       // Mark the user as authenticated
//       login();

//       // Redirect based on user role
//       switch (response.data.user.role) {
//         case 'admin':
//           console.log('Redirecting to admin dashboard');
//           navigate('/dashboard');
//           break;
//         case 'developer':
//           console.log('Redirecting to developer dashboard');
//           navigate('/dev-dashboard');
//           break;
//         default:
//           console.log('Redirecting to user dashboard');
//           navigate('/user');
//           break;
//       }

//       // Save the token for authentication purposes
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       console.error('Error signing in:', error);
//       setError(error.response?.data?.error || error.message); // Display specific error message from server
//     }
//   };

//   return (
//     <section className="m-8 flex gap-4">
//       <div className="w-full lg:w-3/5 mt-24">
//         <div className="text-center">
//           <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
//         </div>
//         <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignIn}>
//           <div className="mb-1 flex flex-col gap-6">
//             <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
//               Your email
//             </Typography>
//             <Input
//               size="lg"
//               placeholder="name@mail.com"
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
//               Password
//             </Typography>
//             <Input
//               type="password"
//               size="lg"
//               placeholder="********"
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           {error && <Typography variant="small" className="text-red-500">{error}</Typography>}
//           <Button className="mt-10" fullWidth type="submit">
//             Sign In
//           </Button>

//           <div className="flex items-center justify-end gap-2 mt-6">
//             <Typography variant="small" className="font-medium text-gray-900">
//               <a href="/auth/forgotpwd">Forgot Password</a>
//             </Typography>
//           </div>
//         </form>
//       </div>
//       <div className="w-2/5 h-full hidden lg:block">
//         <img
//           src="/img/pattern.png"
//           alt="Pattern"
//           className="h-full w-full object-cover rounded-3xl"
//         />
//       </div>
//     </section>
//   );
// }

// export default SignIn;


// SignIn.jsx
// import React, { useState } from 'react';
// import { Input, Button, Typography } from "@material-tailwind/react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../../../backend/firebase"; // Adjust the import path as needed
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import axios from 'axios';
// import { useAuth } from '../../AuthContext'; // Adjust the import path as needed

// export function SignIn() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSignIn = async (event) => {
//     event.preventDefault();
  
//     try {
//       // Firebase authentication
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
  
//       console.log('Firebase authentication successful:', user);
  
//       // Fetch user details from your backend
//       const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
  
//       if (!response.data) {
//         throw new Error('Invalid response from backend');
//       }
  
//       // Store user role and email in local storage
//       localStorage.setItem('userRole', response.data.user.role);
//       localStorage.setItem('userEmail', email);
  
//       console.log('Login successful. User role:', response.data.user.role);
  
//       // Set authentication state
//       login();
  
//       // Redirect based on user role
//       switch (response.data.user.role) {
//         case 'admin':
//           console.log('Redirecting to admin dashboard');
//           navigate('/dashboard');
//           break;
//         case 'developer':
//           console.log('Redirecting to developer dashboard');
//           navigate('/dev-dashboard');
//           break;
//         default:
//           console.log('Redirecting to user dashboard');
//           navigate('/user');
//           break;
//       }
  
//       // Save the token for authentication purposes
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       console.error('Error signing in:', error);
//       setError(error.response?.data?.error || error.message); // Display specific error message from server
//     }
//   };

//   return (
//     <section className="m-8 flex gap-4">
//       <div className="w-full lg:w-3/5 mt-24">
//         <div className="text-center">
//           <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
//         </div>
//         <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignIn}>
//           <div className="mb-1 flex flex-col gap-6">
//             <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
//               Your email
//             </Typography>
//             <Input
//               size="lg"
//               placeholder="name@mail.com"
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
//               Password
//             </Typography>
//             <Input
//               type="password"
//               size="lg"
//               placeholder="********"
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           {error && <Typography variant="small" className="text-red-500">{error}</Typography>}
//           <Button className="mt-10" fullWidth type="submit">
//             Sign In
//           </Button>

//           <div className="flex items-center justify-end gap-2 mt-6">
//             <Typography variant="small" className="font-medium text-gray-900">
//             <a href="/auth/forgotpwd">Forgot Password</a>
//             </Typography>
//           </div>
//         </form>
//       </div>
//       <div className="w-2/5 h-full hidden lg:block">
//         <img
//           src="/img/pattern.png"
//           alt="Pattern"
//           className="h-full w-full object-cover rounded-3xl"
//         />
//       </div>
//     </section>
//   );
// }

// export default SignIn;

// SignIn.jsx
import React, { useState } from 'react';
import { Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../backend/firebase"; // Adjust the import path as needed
import { signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { useAuth } from '../../AuthContext'; // Adjust the import path as needed

export function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      // Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('Firebase authentication successful:', user);

      // Fetch user details from your backend
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

      if (!response.data) {
        throw new Error('Invalid response from backend');
      }

      // Store user role and email in local storage
      localStorage.setItem('userRole', response.data.user.role);
      localStorage.setItem('userEmail', email);

      console.log('Login successful. User role:', response.data.user.role);

      // Set authentication state
      login(response.data.user.role);

      // Redirect based on user role
      switch (response.data.user.role) {
        case 'admin':
          console.log('Redirecting to admin dashboard');
          navigate('/dashboard');
          break;
        case 'developer':
          console.log('Redirecting to developer dashboard');
          navigate('/dev-dashboard');
          break;
        default:
          console.log('Redirecting to user dashboard');
          navigate('/user');
          break;
      }

      // Save the token for authentication purposes
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error.response?.data?.error || error.message); // Display specific error message from server
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignIn}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <Typography variant="small" className="text-red-500">{error}</Typography>}
          <Button className="mt-10" fullWidth type="submit">
            Sign In
          </Button>

          <div className="flex items-center justify-end gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
            <a href="/auth/forgotpwd">Forgot Password</a>
            </Typography>
          </div>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          alt="Pattern"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default SignIn;
