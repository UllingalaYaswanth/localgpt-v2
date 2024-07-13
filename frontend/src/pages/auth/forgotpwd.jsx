import React, { useState } from 'react';
import { Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../backend/firebase"; // Adjust the import path as needed
import { sendPasswordResetEmail } from 'firebase/auth';
import axios from 'axios';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    try {
      // Firebase send password reset email
      await sendPasswordResetEmail(auth, email);

      setSuccessMessage('Password reset email sent. Please check your email.');
      setError('');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setError(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Forgot Password</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleForgotPassword}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Enter your email
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
          </div>
          {error && <Typography variant="small" className="text-red-500">{error}</Typography>}
          {successMessage && <Typography variant="small" className="text-green-500">{successMessage}</Typography>}
          <Button className="mt-10" fullWidth type="submit">
            Send Reset Email
          </Button>

          <div className="flex items-center justify-end gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#" onClick={() => navigate('/')}>Back to Sign In</a>
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

export default ForgotPassword;
