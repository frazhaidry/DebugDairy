import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  // ✅ Validation function (fixed)
  const validateForm = (field, value) => {
    let newErrors = { ...errors };

    // Email validation
    if (field === 'email' || field === 'all') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim()) newErrors.email = 'Email is required';
      else if (!emailRegex.test(email)) newErrors.email = 'Enter a valid email address';
      else delete newErrors.email;
    }

    // Password validation
    if (field === 'password' || field === 'all') {
      if (!password) newErrors.password = 'Password is required';
      else if (password.length < 6)
        newErrors.password = 'Password must be at least 6 characters long';
      else if (!/[A-Z]/.test(password))
        newErrors.password = 'Must contain at least one uppercase letter';
      else if (!/[0-9]/.test(password))
        newErrors.password = 'Must contain at least one number';
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        newErrors.password = 'Must contain at least one special character';
      else delete newErrors.password;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Real-time button enable/disable
  useEffect(() => {
    const valid = validateForm('all');
    setIsButtonDisabled(!valid);
  }, [email, password]);

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm('all')) return;

    try {
      const res = await axios.post(
        'http://localhost:8000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem('token', res.data.token);
      toast.success(res.data.message || 'Login successful');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          backgroundColor: '#121212',
          color: '#fff',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {/* Left Side */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#1E1E1E',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 10px 0 30px #007BFF',
            height: '100vh',
          }}
        >
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Welcome Back to DebugDiary</h2>
          <p
            style={{
              fontSize: '1.1rem',
              opacity: 0.7,
              maxWidth: '320px',
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            Track your bugs and breakthroughs with ease. Let's get you signed in.
          </p>
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="#007BFF"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginBottom: '2rem' }}
          >
            <path d="M9.707 16.293a1 1 0 0 1-1.414 1.414l-4.586-4.586a1 1 0 0 1 0-1.414l4.586-4.586a1 1 0 0 1 1.414 1.414L6.414 12l3.293 3.293zM14.293 7.707a1 1 0 0 1 1.414-1.414l4.586 4.586a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414-1.414L17.586 12l-3.293-3.293z" />
          </svg>
        </div>

        {/* Right Side - Login form */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#181818',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '2.5rem 2rem',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '400px',
              boxShadow: '0 0 24px rgba(0,0,0,0.7)',
              backgroundColor: '#232323',
            }}
          >
            <h2
              style={{
                color: '#FFFFFF',
                marginBottom: '1.5rem',
                textAlign: 'center',
                fontSize: '1.5rem',
              }}
            >
              Login to DebugDiary
            </h2>

            {/* Email */}
            <label
              htmlFor="email"
              style={{ color: '#CCCCCC', display: 'block', marginBottom: '0.5rem' }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: 'none',
                marginBottom: errors.email ? '0.5rem' : '1.25rem',
                outline: 'none',
                backgroundColor: '#181818',
                color: '#FFFFFF',
                fontSize: '1rem',
              }}
              placeholder="you@example.com"
            />
            {errors.email && (
              <small style={{ color: '#FF6B6B', display: 'block', marginBottom: '1rem' }}>
                {errors.email}
              </small>
            )}

            {/* Password */}
            <label
              htmlFor="password"
              style={{ color: '#CCCCCC', display: 'block', marginBottom: '0.5rem' }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: 'none',
                marginBottom: errors.password ? '0.5rem' : '1.5rem',
                outline: 'none',
                backgroundColor: '#181818',
                color: '#FFFFFF',
                fontSize: '1rem',
              }}
              placeholder="Enter your password"
            />
            {errors.password && (
              <small style={{ color: '#FF6B6B', display: 'block', marginBottom: '1rem' }}>
                {errors.password}
              </small>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={isButtonDisabled}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: isButtonDisabled ? '#444' : '#007BFF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                transition: 'background-color 0.3s ease',
              }}
            >
              Login
            </button>

            {/* Register Link */}
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














