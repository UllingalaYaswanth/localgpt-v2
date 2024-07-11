// import {
//   Card,
//   Input,
//   Button,
//   Typography,
// } from "@material-tailwind/react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from 'axios'; // Import Axios for HTTP requests

// export function SignIn() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post('/login', { email, password });
//       const { token, user } = response.data;

//       // Store token in localStorage or sessionStorage for future requests
//       localStorage.setItem('token', token);

//       // Determine the redirection based on user role or any other logic
//       switch(user.role) {
//         case 'dashboard':
//           navigate('/Admin-dashboard/home');
//           break;
//         case 'developer':
//           navigate('/developer');
//           break;
//         case 'user':
//           navigate('/user');
//           break;
//         default:
//           console.error('Unknown role');
//       }
//     } catch (error) {
//       console.error('Error logging in:', error.response.data.error);
//       // Handle error display or state update for invalid login
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
//               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
//               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <Button className="mt-10" fullWidth type="submit">
//             Sign In
//           </Button>

//           <div className="flex items-center justify-end gap-2 mt-6">
//             <Typography variant="small" className="font-medium text-gray-900">
//               <a href="#">
//                 Forgot Password
//               </a>
//             </Typography>
//           </div>
//         </form>
//       </div>
//       <div className="w-2/5 h-full hidden lg:block">
//         <img
//           src="/img/pattern.png"
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
// import axios from 'axios';

// export function SignIn() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSignIn = async (event) => {
//     event.preventDefault();

//   }

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
//               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
//               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
//               <a href="#">Forgot Password</a>
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

// export default SignIn



import React, { useState } from 'react';
import { Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/login', { email, password });
      const { token, user } = response.data;

      // Example logic to redirect based on user role
      if (user.role === 'admin') {
        navigate('/dashboard');
      } else if (user.role === 'developer') {
        navigate('/dev-dashboard');
      } else {
        navigate('/user');
      }

      // Optionally, you can save the token to localStorage or sessionStorage for authentication purposes
      localStorage.setItem('token', token);
    } catch (error) {
      setError(error.response.data.error);
    }
  }

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
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
              <a href="#">Forgot Password</a>
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
