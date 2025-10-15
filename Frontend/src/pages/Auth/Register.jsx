import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', {
        name,
        email,
        password,
      });
      toast.success(res.data.message); // Show success toast
      // Remove navigation if you want to handle redirect later or manually
      // navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed'); // Show error toast
    }
  };

  return (
    <>
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        backgroundColor: '#121212',
        color: '#fff',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}>
        {/* Left Side - interactive visual */}
        <div style={{
          flex: 1,
          backgroundColor: '#1E1E1E',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 10px 0 30px #007BFF',
          height: '100vh',
        }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Join DebugDiary</h2>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.7,
            maxWidth: '320px',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Start logging bugs and breakthroughs with the developer community.
          </p>
          <svg width="100" height="100" viewBox="0 0 24 24" fill="#007BFF" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '2rem' }}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.55-.63-4.9-1.69l1.03-1.55C9.06 17.29 10.47 18 12 18c1.53 0 2.94-.71 3.87-1.24l1.03 1.55C15.55 19.37 13.85 20 12 20zm6.36-3.09l-1.03-1.55c.37-.56.67-1.19.83-1.87H19c0 .89-.29 1.78-.64 2.42zM5 12c0-.44.04-.88.1-1.3h1.71c-.16.8-.29 1.6-.29 2.3s.13 1.5.29 2.3H5.1A7.882 7.882 0 0 1 5 12zm1.53 5.09C6.29 15.78 6 14.89 6 14h1.21c.14.69.33 1.34.56 1.99l-1.03 1.55zM12 6c2.37 0 4.35 1.64 4.85 3.84h-1.71A3.002 3.002 0 0 0 12 8c-1.3 0-2.4.84-2.84 2.04h-1.71C7.65 7.64 9.63 6 12 6zm-2.97 5.34A4.98 4.98 0 0 1 12 10c1.3 0 2.4.84 2.84 2.04C14.95 14.32 13.6 16 12 16s-2.95-1.68-2.97-4.66zm7.42-1.9A7.936 7.936 0 0 1 19 12h-1.21c-.16-.8-.29-1.6-.29-2.3s.13-1.5.29-2.3H18.9z"/>
          </svg>
        </div>
        {/* Right Side - Register form */}
        <div style={{
          flex: 1,
          backgroundColor: '#181818',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
          <form onSubmit={handleSubmit} style={{
            padding: '2.5rem 2rem',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 0 24px rgba(0,0,0,0.7)',
            backgroundColor: '#232323',
          }}>
            <h2 style={{
              color: '#FFFFFF',
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontSize: '1.5rem'
            }}>
              Register for DebugDiary
            </h2>
            <label htmlFor="name" style={{ color: '#CCCCCC', display: 'block', marginBottom: '0.5rem' }}>Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: 'none',
                marginBottom: '1.25rem',
                outline: 'none',
                backgroundColor: '#181818',
                color: '#FFFFFF',
                fontSize: '1rem',
              }}
              placeholder="Your name"
            />
            <label htmlFor="email" style={{ color: '#CCCCCC', display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: 'none',
                marginBottom: '1.25rem',
                outline: 'none',
                backgroundColor: '#181818',
                color: '#FFFFFF',
                fontSize: '1rem',
              }}
              placeholder="you@example.com"
            />
            <label htmlFor="password" style={{ color: '#CCCCCC', display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: 'none',
                marginBottom: '1.5rem',
                outline: 'none',
                backgroundColor: '#181818',
                color: '#FFFFFF',
                fontSize: '1rem',
              }}
              placeholder="Create a password"
            />
            <button type="submit" style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#007BFF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: '600',
            }}>
              Register
            </button>
            {/* Login Link */}
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <span style={{ color: '#CCCCCC' }}>Already have an account? </span>
              <Link
                to="/login"
                style={{ color: '#007BFF', textDecoration: 'underline', cursor: 'pointer' }}
              >
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
