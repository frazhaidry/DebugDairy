import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../themes/theme.jsx';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-background dark:bg-dark-background text-text dark:text-dark-text border-b border-border dark:border-dark-border transition-colors duration-500">
      {/* Logo */}
      <div onClick={() => navigate('/')} className="flex items-center gap-2 text-xl font-semibold tracking-tight cursor-pointer">
        <span className="text-primary dark:text-dark-primary">&lt;/&gt;</span> DebugDiary
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-8 text-secondary dark:text-dark-secondary">
        <Link to="/features" className="hover:text-primary dark:hover:text-dark-primary transition">
          Features
        </Link>
        <Link to="/community" className="hover:text-primary dark:hover:text-dark-primary transition">
          Community
        </Link>
        <Link to="/contributors" className="hover:text-primary dark:hover:text-dark-primary transition">
          Contributors
        </Link>
        <Link to="/docs" className="hover:text-primary dark:hover:text-dark-primary transition">
          Docs
        </Link>
      </nav>

      {/* Right buttons */}
      <div className="hidden md:flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-md bg-card dark:bg-dark-card hover:bg-secondary dark:hover:bg-dark-secondary text-text dark:text-dark-text transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-4 py-2 rounded-md bg-primary dark:bg-dark-primary hover:bg-primary-hover dark:hover:bg-dark-primary-hover text-text dark:text-dark-text font-medium transition"
            >
              Get Started
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-text dark:text-dark-text font-medium transition"
          >
            Logout
          </button>
        )}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-text dark:text-dark-text bg-card dark:bg-dark-card hover:bg-secondary dark:hover:bg-dark-secondary transition"
          aria-label="Toggle Dark/Light Mode"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-secondary dark:text-dark-secondary"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-background dark:bg-dark-background border-t border-border dark:border-dark-border flex flex-col items-center py-4 md:hidden transition-colors duration-500">
          <Link to="/features" className="py-2 text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary transition">
            Features
          </Link>
          <Link to="/community" className="py-2 text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary transition">
            Community
          </Link>
          <Link to="/contributors" className="py-2 text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary transition">
            Contributors
          </Link>
          <Link to="/docs" className="py-2 text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary transition">
            Docs
          </Link>
          {!isLoggedIn ? (
            <>
              <Link
                to="/register"
                className="mt-4 px-4 py-2 rounded-md bg-primary dark:bg-dark-primary text-text dark:text-dark-text hover:bg-primary-hover dark:hover:bg-dark-primary-hover transition"
              >
                Get Started
              </Link>
              <button
                onClick={() => navigate('/login')}
                className="mt-4 px-4 py-2 rounded-md bg-card dark:bg-dark-card text-text dark:text-dark-text hover:bg-secondary dark:hover:bg-dark-secondary transition"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 rounded-md bg-red-600 text-text dark:text-dark-text hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
          <button
            onClick={toggleTheme}
            className="mt-4 p-2 rounded-full text-text dark:text-dark-text bg-card dark:bg-dark-card hover:bg-secondary dark:hover:bg-dark-secondary transition"
            aria-label="Toggle Dark/Light Mode"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;