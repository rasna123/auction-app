import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';


const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username:'',
    email: '',
    password: '',
    receiveEmails: false
  });
  
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword(formData.password)) {
        try {
            const response = await fetch('http://localhost:5050/api/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData)
            });
      
            const data = await response.json();
      
            if (!response.ok) {
              throw new Error(data.message || 'Signup failed');
            }
      
            // Store token if using JWT
            if (data.token) {
              localStorage.setItem('token', data.token);
            }
      
            window.location.href = '/auctions';
      
          } catch (err) {
            throw new Error(err);
          }
      console.log('Form submitted:', formData);
    }
  };

  const handleSocialSignup = (provider) => {
    // Implement social signup logic
    console.log(`Signing up with ${provider}`);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 p-12">
        <h2 className="mb-2 text-2xl font-bold">Sign up</h2>
        <p className="mb-8 text-gray-600">
          New bidders, as soon as you have submitted your information you will be eligible to bid in the auction.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block mb-1">User Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="User Name"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  passwordError ? 'border-red-500' : ''
                }`}
                value={formData.password}
                onChange={(e) => {
                  setFormData({...formData, password: e.target.value});
                  validatePassword(e.target.value);
                }}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => {
                  // Toggle password visibility
                }}
              >
                👁️
              </button>
            </div>
            {passwordError && (
              <p className="mt-1 text-sm text-red-500">{passwordError}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">Password criteria check</p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="receiveEmails"
              className="w-4 h-4 mr-2 border-gray-300 rounded"
              checked={formData.receiveEmails}
              onChange={(e) => setFormData({...formData, receiveEmails: e.target.checked})}
            />
            <label htmlFor="receiveEmails" className="text-sm text-gray-600">
              Receive outbid emails
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <button
              onClick={() => handleSocialSignup('google')}
              className="flex items-center justify-center p-2 border rounded hover:bg-gray-50"
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleSocialSignup('apple')}
              className="flex items-center justify-center p-2 border rounded hover:bg-gray-50"
            >
              <img src="/apple-icon.svg" alt="Apple" className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleSocialSignup('facebook')}
              className="flex items-center justify-center p-2 border rounded hover:bg-gray-50"
            >
              <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm">
          Want to know more? <a href="#" className="text-blue-600 hover:underline">Auction rules</a>
        </p>
      </div>
      
      <div className="w-1/2 bg-gray-50 flex items-center justify-center">
        <div className="max-w-md">
          {/* Add your illustration here */}
          <img src="/signup-illustration.svg" alt="Signup illustration" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Signup;