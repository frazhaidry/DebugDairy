import { motion as Motion } from "framer-motion";
import { ArrowRight, Code2, Users, Zap, Github } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-x-hidden">
      
      {/* ================= HERO ================= */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen w-full bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-black px-6 overflow-hidden">

  {/* Background glow effects */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[180px] rounded-full"></div>
    <div className="absolute bottom-20 right-40 w-[400px] h-[400px] bg-purple-600/20 blur-[160px] rounded-full"></div>
  </div>

  {/* Title */}
  <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white tracking-tight drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]">
    Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600">DebugDiary</span>
    <br />
    <span className="text-gray-400 text-4xl md:text-5xl font-light">Where Devs Log Their Battles</span>
  </h1>

  {/* Subtitle */}
  <p className="text-gray-400 max-w-2xl mb-10 text-lg leading-relaxed">
    A place where developers share their bugs, breakthroughs, and brainwaves.<br />
    <span className="text-gray-500">Discover real fixes, not just Stack Overflow echoes.</span>
  </p>

  {/* Buttons */}
  <div className="flex flex-wrap justify-center gap-4">
    <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 flex items-center gap-2">
      Get Started <ArrowRight size={20} />
    </button>

    <button className="px-8 py-3 border border-gray-700 hover:border-blue-400 rounded-2xl font-semibold text-gray-300 hover:text-white flex items-center gap-2 transition-all duration-300 hover:bg-[#111111]/60 backdrop-blur-sm">
      <Github size={20} /> Contribute
    </button>
  </div>

  {/* Scroll hint */}
  <div className="absolute bottom-8 text-sm text-gray-500 animate-pulse">
    scroll to explore ↓
  </div>
</section>


      {/* ================= FEATURES ================= */}
      <section className="min-h-screen flex flex-col justify-center items-center px-8 py-20 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-black relative overflow-hidden">
  {/* Subtle glowing background orbs */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-32 left-20 w-[400px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full"></div>
    <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-purple-600/10 blur-[180px] rounded-full"></div>
  </div>

  <h2 className="text-4xl md:text-5xl font-extrabold mb-14 text-center text-white tracking-tight">
    Why Developers <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">Love</span> DebugDiary
  </h2>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
    {[
      {
        icon: <Code2 size={44} className="text-blue-400" />,
        title: "Document Every Fix",
        desc: "Log your debugging stories, keep track of every tricky bug, and revisit your solutions anytime.",
      },
      {
        icon: <Users size={44} className="text-purple-400" />,
        title: "Community Wisdom",
        desc: "Explore real-world bugs solved by thousands of devs and share your own learning experience.",
      },
      {
        icon: <Zap size={44} className="text-yellow-400" />,
        title: "Search. Tag. Discover.",
        desc: "Find solutions instantly using smart tags, keywords, or by your favorite contributors.",
      },
    ].map((f, i) => (
      <div
        key={i}
        className="group bg-gradient-to-b from-gray-800/50 to-gray-900/40 border border-gray-700 hover:border-blue-500/40 rounded-2xl p-8 text-center shadow-[0_0_25px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.2)] transition-all duration-500 backdrop-blur-md hover:-translate-y-2"
      >
        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-full bg-gray-900/70 group-hover:bg-gray-800/60 transition duration-300">
            {f.icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{f.title}</h3>
        <p className="text-gray-400 leading-relaxed">{f.desc}</p>
      </div>
    ))}
  </div>
</section>


      {/* ================= COMMUNITY SECTION ================= */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 py-20 bg-gradient-to-b from-gray-950 to-black">
        <Motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-8"
        >
          Join the <span className="text-blue-500">Community</span>
        </Motion.h2>

        <p className="max-w-2xl text-gray-400 mb-10">
          DebugDiary is more than a tool — it’s a developer movement.
          Connect with peers, share insights, and grow together.
        </p>

        <Motion.button
          whileHover={{ scale: 1.05 }}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold text-lg flex items-center gap-2 transition"
        >
          Join Discord <ArrowRight size={20} />
        </Motion.button>
      </section>

    
    </div>
  );
};

export default Landing;
