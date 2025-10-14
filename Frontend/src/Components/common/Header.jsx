import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleDocsClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.info("Please login to access the docs");
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-black text-white border-b border-gray-800">
      {/* Logo */}
      <div onClick={() => navigate('/')} className="flex items-center gap-2 text-xl font-semibold tracking-tight cursor-pointer">
        <span className="text-blue-400">&lt;/&gt;</span> DebugDiary
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-8 text-gray-300">
        <Link to="/features" className="hover:text-white transition">Features</Link>
        <Link to="/community" className="hover:text-white transition">Community</Link>
        <Link to="/contributors" className="hover:text-white transition">Contributors</Link>
        <Link to="/docs" className="hover:text-white transition" onClick={handleDocsClick}>Docs</Link>
      </nav>

      {/* Right buttons */}
      <div className="hidden md:flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate('/login')} className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition">
              Login
            </button>
            <button onClick={() => navigate('/register')} className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition">
              Get Started
            </button>
          </>
        ) : (
          <button onClick={handleLogout} className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium transition">
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black border-t border-gray-800 flex flex-col items-center py-4 md:hidden">
          <a href="#features" className="py-2 hover:text-blue-400">Features</a>
          <a href="#community" className="py-2 hover:text-blue-400">Community</a>
          <a href="#contributors" className="py-2 hover:text-blue-400">Contributors</a>
          <Link to="/docs" className="py-2 hover:text-blue-400" onClick={handleDocsClick}>Docs</Link>
          {!isLoggedIn ? (
            <>
              <Link
                to="/register"
                className="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Get Started
              </Link>
              <button onClick={() => navigate("/login")} className="mt-4 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition">
                Login
              </button>
            </>
          ) : (
            <button onClick={handleLogout} className="mt-4 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition">
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
