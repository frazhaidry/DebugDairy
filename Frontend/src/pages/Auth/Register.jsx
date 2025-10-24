import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Real-time validation
  useEffect(() => {
    validateFields();
  }, [name, email, password]);

  const validateFields = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) newErrors.name = 'Name is required';
    else if (!/^[A-Za-z ]+$/.test(name)) newErrors.name = 'Name must contain only alphabets';
    else if (name.length < 2) newErrors.name = 'Name must be at least 2 characters long';

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(email)) newErrors.email = 'Please enter a valid email address';

    // Password validation
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    else if (!/[A-Z]/.test(password)) newErrors.password = 'Must contain at least one uppercase letter';
    else if (!/[0-9]/.test(password)) newErrors.password = 'Must contain at least one number';
    else if (!/[^A-Za-z0-9]/.test(password)) newErrors.password = 'Must contain at least one special character';

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateFields();

    if (!isFormValid) {
      toast.error('Please correct all errors before submitting');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', {
        name,
        email,
        password,
      });
      toast.success(res.data.message);
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  // Common input style
  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    marginBottom: '0.75rem',
    outline: 'none',
    backgroundColor: '#181818',
    color: '#FFFFFF',
    fontSize: '1rem',
  };

  const errorStyle = {
    color: '#ff4c4c',
    fontSize: '0.85rem',
    marginBottom: '0.75rem',
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
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.55-.63-4.9-1.69l1.03-1.55C9.06 17.29 10.47 18 12 18c1.53 0 2.94-.71 3.87-1.24l1.03 1.55C15.55 19.37 13.85 20 12 20zm6.36-3.09l-1.03-1.55c.37-.56.67-1.19.83-1.87H19c0 .89-.29 1.78-.64 2.42zM5 12c0-.44.04-.88.1-1.3h1.71c-.16.8-.29 1.6-.29 2.3s.13 1.5.29 2.3H5.1A7.882 7.882 0 0 1 5 12zm1.53 5.09C6.29 15.78 6 14.89 6 14h1.21c.14.69.33 1.34.56 1.99l-1.03 1.55zM12 6c2.37 0 4.35 1.64 4.85 3.84h-1.71A3.002 3.002 0 0 0 12 8c-1.3 0-2.4.84-2.84 2.04h-1.71C7.65 7.64 9.63 6 12 6zm-2.97 5.34A4.98 4.98 0 0 1 12 10c1.3 0 2.4.84 2.84 2.04C14.95 14.32 13.6 16 12 16s-2.95-1.68-2.97-4.66zm7.42-1.9A7.936 7.936 0 0 1 19 12h-1.21c-.16-.8-.29-1.6-.29-2.3s.13-1.5.29-2.3H18.9z" />
          </svg>
        </div>

        {/* Right Side - Register Form */}
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

            {/* Name */}
            <label htmlFor="name" style={{ color: '#CCCCCC', display: 'block', marginBottom: '0.5rem' }}>Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              placeholder="Your name"
            />
            {errors.name && <p style={errorStyle}>{errors.name}</p>}

            {/* Email */}
            <label htmlFor="email" style={{ color: '#CCCCCC', display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="you@example.com"
            />
            {errors.email && <p style={errorStyle}>{errors.email}</p>}

            {/* Password */}
            <label htmlFor="password" style={{ color: '#CCCCCC', display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="Create a password"
            />
            {errors.password && <p style={errorStyle}>{errors.password}</p>}

            <p style={{ color: '#CCCCCC', fontSize: '0.875rem', marginBottom: '1rem', opacity: 0.7 }}>
              Must include 6+ chars, one uppercase, one number, and one special symbol.
            </p>

            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: isFormValid ? '#007BFF' : '#555',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                fontWeight: '600',
                transition: 'background-color 0.3s ease',
              }}
            >
              Register
            </button>

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
