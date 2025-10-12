import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-black text-white border-b border-gray-800">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <span className="text-blue-400">&lt;/&gt;</span> DebugDiary
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-8 text-gray-300">
        <a href="#features" className="hover:text-white transition">Features</a>
        <a href="#community" className="hover:text-white transition">Community</a>
        <a href="#contributors" className="hover:text-white transition">Contributors</a>
        <a href="#docs" className="hover:text-white transition">Docs</a>
      </nav>

      {/* Right buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition">
          Login
        </button>
        <button className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition">
          Get Started
        </button>
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
          <a href="#docs" className="py-2 hover:text-blue-400">Docs</a>
          <button className="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
