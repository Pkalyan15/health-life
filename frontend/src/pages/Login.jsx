import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(true); // Default to Sign Up
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendUrl, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const endpoint = isSignUp ? '/api/user/register' : '/api/user/login';
      const payload = isSignUp ? { name, email, password } : { email, password };

      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload); // ✅ Template literal fixed

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success(`${isSignUp ? 'Registered' : 'Logged in'} successfully!`); // ✅ Template literal fixed
        navigate('/dashboard'); // Adjust route as needed
      } else {
        toast.error(data.message || 'An error occurred');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          {isSignUp ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          {isSignUp ? 'Please sign up to book appointment' : 'Login to continue'}
        </p>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {isSignUp ? 'Create account' : 'Login'}
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:underline"
          >
            {isSignUp ? 'Login here' : 'Sign up here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
