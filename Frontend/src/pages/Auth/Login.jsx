import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', 
        { email, password }, 
        { withCredentials: true }
      );
      
      // Save token to localStorage!
      localStorage.setItem('token', res.data.token);   // <-- Important line
    //   console.log(res);
      toast.success(res.data.message);
      navigate('/'); // Redirect to homepage
    } catch(error) {
      toast.error(error.response?.data?.message || 'Login failed');
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
        {/* Left Side */}
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
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Welcome Back to DebugDiary</h2>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.7,
            maxWidth: '320px',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Track your bugs and breakthroughs with ease. Let's get you signed in.
          </p>
          <svg width="100" height="100" viewBox="0 0 24 24" fill="#007BFF" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '2rem' }}>
            <path d="M9.707 16.293a1 1 0 0 1-1.414 1.414l-4.586-4.586a1 1 0 0 1 0-1.414l4.586-4.586a1 1 0 0 1 1.414 1.414L6.414 12l3.293 3.293zM14.293 7.707a1 1 0 0 1 1.414-1.414l4.586 4.586a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414-1.414L17.586 12l-3.293-3.293z"/>
          </svg>
        </div>
        {/* Right Side - Login form */}
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
            <h2 style={{ color: '#FFFFFF', marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.5rem' }}>Login to DebugDiary</h2>
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
              placeholder="Enter your password"
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
              Login
            </button>
            {/* Register Here Link */}
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <span style={{ color: '#CCCCCC' }}>Don't have an account? </span>
              <Link
                to="/register"
                style={{ color: '#007BFF', textDecoration: 'underline', cursor: 'pointer' }}
              >
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
