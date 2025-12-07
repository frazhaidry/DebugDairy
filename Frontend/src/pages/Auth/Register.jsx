import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // ✅ Dark mode detection (same as CreateDoc)
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // ✅ Real-time validation
  useEffect(() => {
    validateFields();
  }, [name, email, password]);

  const validateFields = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) newErrors.name = 'Name is required';
    else if (!/^[A-Za-z ]+$/.test(name))
      newErrors.name = 'Name must contain only alphabets';
    else if (name.length < 2)
      newErrors.name = 'Name must be at least 2 characters long';

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(email))
      newErrors.email = 'Please enter a valid email address';

    // Password validation
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters long';
    else if (!/[A-Z]/.test(password))
      newErrors.password = 'Must contain at least one uppercase letter';
    else if (!/[0-9]/.test(password))
      newErrors.password = 'Must contain at least one number';
    else if (!/[^A-Za-z0-9]/.test(password))
      newErrors.password = 'Must contain at least one special character';

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
      navigate('/login');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  // ✅ Styles that depend on dark mode
  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    marginBottom: '0.75rem',
    outline: 'none',
    backgroundColor: isDarkMode ? '#181818' : '#f0f0f0',
    color: isDarkMode ? '#FFFFFF' : '#111',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  const errorStyle = {
    color: '#ff4c4c',
    fontSize: '0.85rem',
    marginBottom: '0.75rem',
  };

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          transition: 'all 0.5s ease',
          backgroundColor: isDarkMode ? '#121212' : '#f9f9f9',
          color: isDarkMode ? '#fff' : '#000',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {/* Left Side */}
        <div
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? '#1E1E1E' : '#E6E6E6',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isDarkMode
              ? 'inset 10px 0 30px #007BFF'
              : 'inset 10px 0 30px #80BFFF',
            height: '100vh',
            transition: 'background-color 0.5s ease',
          }}
        >
          <h2
            style={{
              fontSize: '2.2rem',
              marginBottom: '1rem',
              color: isDarkMode ? '#fff' : '#111',
            }}
          >
            Join DebugDiary
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              opacity: 0.8,
              maxWidth: '320px',
              textAlign: 'center',
              marginBottom: '2rem',
              color: isDarkMode ? '#ddd' : '#333',
            }}
          >
            Start logging bugs and breakthroughs with the developer community.
          </p>
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="#007BFF"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginBottom: '2rem' }}
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.55-.63-4.9-1.69l1.03-1.55C9.06 17.29 10.47 18 12 18c1.53 0 2.94-.71 3.87-1.24l1.03 1.55C15.55 19.37 13.85 20 12 20z" />
          </svg>
        </div>

        {/* Right Side - Register Form */}
        <div
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? '#181818' : '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            transition: 'background-color 0.5s ease',
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '2.5rem 2rem',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '400px',
              boxShadow: isDarkMode
                ? '0 0 24px rgba(0,0,0,0.7)'
                : '0 0 24px rgba(0,0,0,0.1)',
              backgroundColor: isDarkMode ? '#232323' : '#fefefe',
              transition: 'all 0.4s ease',
            }}
          >
            <h2
              style={{
                color: isDarkMode ? '#FFFFFF' : '#111',
                marginBottom: '1.5rem',
                textAlign: 'center',
                fontSize: '1.5rem',
              }}
            >
              Register for DebugDiary
            </h2>

            {/* Name */}
            <label
              htmlFor="name"
              style={{
                color: isDarkMode ? '#CCCCCC' : '#333',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Name
            </label>
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
            <label
              htmlFor="email"
              style={{
                color: isDarkMode ? '#CCCCCC' : '#333',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Email
            </label>
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
            <label
              htmlFor="password"
              style={{
                color: isDarkMode ? '#CCCCCC' : '#333',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="Create a password"
            />
            {errors.password && <p style={errorStyle}>{errors.password}</p>}

            <p
              style={{
                color: isDarkMode ? '#CCCCCC' : '#555',
                fontSize: '0.875rem',
                marginBottom: '1rem',
                opacity: 0.7,
              }}
            >
              Must include 6+ chars, one uppercase, one number, and one special
              symbol.
            </p>

            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: isFormValid
                  ? '#007BFF'
                  : isDarkMode
                  ? '#444'
                  : '#ccc',
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
              <span style={{ color: isDarkMode ? '#ccc' : '#333' }}>
                Already have an account?{' '}
              </span>
              <Link
                to="/login"
                style={{
                  color: '#007BFF',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
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











