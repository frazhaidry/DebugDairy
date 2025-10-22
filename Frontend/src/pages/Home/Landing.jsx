import { motion as Motion } from "framer-motion";
import { ArrowRight, Code2, Users, Zap, Github, Sun, Moon } from "lucide-react";
import { useTheme } from '../../themes/theme.jsx';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    
    return (
        <button 
          onClick={toggleTheme} 
          className="absolute top-4 right-4 p-2 sm:p-3 rounded-full z-50 transition-colors duration-300 text-text dark:text-dark-text bg-card dark:bg-dark-card hover:bg-secondary dark:hover:bg-dark-secondary shadow-md"
          aria-label="Toggle Dark/Light Mode"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
    );
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-text dark:bg-dark-background dark:text-dark-text font-sans overflow-x-hidden transition-colors duration-500">
      
      {/* ================= HERO ================= */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] w-full bg-background dark:bg-gradient-to-b dark:from-dark-background dark:via-[#0d0d0d] dark:to-dark-background px-4 md:px-6 overflow-hidden border-b border-border dark:border-dark-border">

        {/* Background glow effects - Visible only in Dark Mode */}
        <div className="absolute inset-0 -z-10 opacity-70 dark:opacity-70">
          <div className="hidden dark:block absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] glow-effect blur-[150px] rounded-full"></div>
          <div className="hidden dark:block absolute bottom-20 right-40 w-[300px] h-[300px] glow-effect-purple blur-[120px] rounded-full"></div>
        </div>

        <Motion.div 
          className="z-10" 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
        >
          {/* Title */}
          <Motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 leading-tight tracking-tight 
              text-gray-900 dark:text-white dark:drop-shadow-[0_0_10px_rgba(59,130,246,0.1)]"
          >
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-600">DebugDiary</span>
            <br />
            <span className="text-gray-500 text-3xl sm:text-4xl md:text-5xl font-light block mt-2">Where Devs Log Their Battles</span>
          </Motion.h1>

          {/* Subtitle */}
          <Motion.p 
            variants={itemVariants}
            className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 text-base md:text-xl leading-relaxed px-4"
          >
            A place where developers share their bugs, breakthroughs, and brainwaves.
            <span className="block mt-1 text-gray-400 dark:text-gray-500 text-sm md:text-lg">Discover real fixes, not just Stack Overflow echoes.</span>
          </Motion.p>

          {/* Buttons - Keep them colorful for both modes */}
          <Motion.div 
            variants={itemVariants} 
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="px-7 py-3 md:px-8 md:py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl 
              shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2 text-base md:text-lg">
              Get Started <ArrowRight size={20} />
            </button>

            <button className="px-7 py-3 md:px-8 md:py-3.5 border border-gray-300 dark:border-gray-700 hover:border-blue-400 rounded-xl font-semibold 
              text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white flex items-center gap-2 transition-all duration-300 
              hover:bg-gray-100 dark:hover:bg-[#111111]/60 backdrop-blur-sm text-base md:text-lg">
              <Github size={20} /> Contribute
            </button>
          </Motion.div>
        </Motion.div>

        {/* Scroll hint - Changes color based on theme */}
        <div className="absolute bottom-8 text-sm text-gray-500 dark:text-gray-500 animate-bounce">
          scroll to explore ↓
        </div>
      </section>


      {/* ================= FEATURES ================= */}
      <section
        className="min-h-[80vh] flex flex-col justify-center items-center px-4 md:px-8 py-20 bg-card dark:bg-dark-card relative overflow-hidden border-b border-border dark:border-dark-border transition-colors duration-500"
      >
        {/* Glowing background orbs - Dark Mode Only */}
        <div className="absolute inset-0 -z-10 opacity-50 dark:opacity-50">
          <div className="hidden dark:block absolute top-32 left-20 w-[300px] h-[300px] glow-effect blur-[150px] rounded-full"></div>
          <div className="hidden dark:block absolute bottom-20 right-20 w-[400px] h-[400px] glow-effect-purple blur-[180px] rounded-full"></div>
        </div>

        <Motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold mb-14 text-center text-text dark:text-dark-text tracking-tight"
        >
          Why Developers{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-700 dark:from-dark-primary dark:via-purple-400 dark:to-pink-500">
            Love
          </span>{' '}
          DebugDiary
        </Motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {[
            {
              icon: <Code2 size={36} className="text-primary dark:text-dark-primary" />,
              title: 'Document Every Fix',
              desc: 'Log your debugging stories, keep track of every tricky bug, and revisit your solutions anytime.',
            },
            {
              icon: <Users size={36} className="text-purple-600 dark:text-purple-400" />,
              title: 'Community Wisdom',
              desc: 'Explore real-world bugs solved by thousands of devs and share your own learning experience.',
            },
            {
              icon: <Zap size={36} className="text-yellow-600 dark:text-yellow-400" />,
              title: 'Search. Tag. Discover.',
              desc: 'Find solutions instantly using smart tags, keywords, or by your favorite contributors.',
            },
          ].map((f, i) => (
            <Motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group bg-card dark:bg-dark-card border border-border dark:border-dark-border hover:border-primary/50 dark:hover:border-dark-primary/50 rounded-2xl p-6 md:p-8 text-left shadow-md hover:shadow-lg dark:shadow-2xl dark:hover:shadow-[0_0_50px_rgba(37,99,235,0.1)] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
            >
              <div className="mb-4">
                <div className="p-3 rounded-xl bg-card dark:bg-dark-card border border-border dark:border-dark-border group-hover:bg-primary/10 dark:group-hover:bg-dark-primary/10 transition duration-300 inline-block">
                  {f.icon}
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-text dark:text-dark-text mb-2">{f.title}</h3>
              <p className="text-secondary dark:text-dark-secondary leading-normal text-base">{f.desc}</p>
            </Motion.div>
          ))}
        </div>
      </section>


      {/* ================= COMMUNITY SECTION (Call to Action) ================= */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 md:px-8 py-20 bg-background dark:bg-dark-background">
        <Motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-8 text-text dark:text-dark-text"
        >
          Join the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600 dark:from-dark-primary dark:to-cyan-400">
            Movement
          </span>
        </Motion.h2>

        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl text-secondary dark:text-dark-secondary mb-8 md:mb-10 text-base md:text-lg"
        >
          DebugDiary is more than a tool — it’s a developer community. Connect with peers, share insights, and grow
          together.
        </Motion.p>

        <Motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="px-8 py-4 bg-gradient-to-r from-primary to-primary hover:from-primary-hover hover:to-primary-hover text-text dark:text-dark-text font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary-hover/50 transition-all duration-300 flex items-center gap-2 text-lg"
        >
          Join Discord <ArrowRight size={20} />
        </Motion.button>
      </section>

      {/* FOOTER */}
      <footer className="py-6 border-t border-border dark:border-dark-border text-center text-sm text-secondary dark:text-dark-secondary bg-card dark:bg-dark-card transition-colors duration-500">
        &copy; {new Date().getFullYear()} DebugDiary. All rights reserved.
      </footer>
    
    </div>
  );
};

export default Landing;
