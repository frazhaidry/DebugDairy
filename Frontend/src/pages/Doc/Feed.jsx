import { useEffect, useMemo, useState } from 'react';
import { Search, Heart, MessageSquare, Bookmark } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

function formatRelative(dateStr) {
  const d = new Date(dateStr);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const CATEGORIES = ['Frontend', 'Backend', 'DevOps', 'Database', 'DSA'];

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('Latest'); // Latest | Trending | Following

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await axiosInstance.get('/posts');
        if (mounted) setPosts(data.posts || data || []);
      } catch (e) {
        setError(e.message || 'Failed to load feed');
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const allTags = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => (p.tags || []).forEach((t) => t && set.add(t)));
    return Array.from(set);
  }, [posts]);

  const categoryCounts = useMemo(() => {
    const counts = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
    posts.forEach((p) => {
      const tags = (p.tags || []).map((t) => t.toLowerCase());
      CATEGORIES.forEach((c) => {
        if (tags.includes(c.toLowerCase())) counts[c] += 1;
      });
    });
    return counts;
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = [...posts];

    if (tab === 'Trending') {
      arr.sort((a, b) => (b.Likes?.length || 0) - (a.Likes?.length || 0));
    } else {
      arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (!q) return arr;
    return arr.filter((p) => {
      const inTitle = (p.title || '').toLowerCase().includes(q);
      const inProblem = (p.problem || '').toLowerCase().includes(q);
      const inSolution = (p.solution || '').toLowerCase().includes(q);
      const inTags = (p.tags || []).some((t) => (t || '').toLowerCase().includes(q));
      return inTitle || inProblem || inSolution || inTags;
    });
  }, [posts, query, tab]);

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background text-text dark:text-dark-text transition-colors duration-500">
      {/* Top bar */}
      <div className="border-b border-border dark:border-dark-border bg-background dark:bg-dark-background sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="font-semibold text-lg text-text dark:text-dark-text">
            DebugDiary
          </Link>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary dark:text-dark-secondary" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documentation..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-border dark:border-dark-border bg-card dark:bg-dark-card text-text dark:text-dark-text placeholder-secondary dark:placeholder-dark-secondary focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
            />
          </div>
          <Link
            to="/docs/new"
            className="px-3 py-2 text-sm rounded-md bg-primary dark:bg-dark-primary text-text dark:text-dark-text hover:bg-primary-hover dark:hover:bg-dark-primary-hover transition"
          >
            New Doc
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div>
            <h3 className="font-semibold mb-3 text-text dark:text-dark-text">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.length === 0 && <span className="text-secondary dark:text-dark-secondary text-sm">No tags yet</span>}
              {allTags.slice(0, 12).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 text-sm rounded-full border border-border dark:border-dark-border bg-card dark:bg-dark-card hover:bg-secondary dark:hover:bg-dark-secondary text-text dark:text-dark-text transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-text dark:text-dark-text">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c} className="flex justify-between text-sm">
                  <span className="text-text dark:text-dark-text">{c}</span>
                  <span className="text-secondary dark:text-dark-secondary">{categoryCounts[c]}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main feed */}
        <main className="lg:col-span-9">
          <h1 className="text-2xl font-bold mb-2 text-text dark:text-dark-text">Documentation Feed</h1>
          <p className="text-secondary dark:text-dark-secondary mb-4">Browse developer documentation shared by the community</p>

          <div className="flex items-center gap-2 mb-6">
            {['Latest', 'Trending', 'Following'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={
                  'px-3 py-1.5 rounded-md text-sm border transition ' +
                  (tab === t
                    ? 'bg-card dark:bg-dark-card border-border dark:border-dark-border text-text dark:text-dark-text'
                    : 'bg-background dark:bg-dark-background hover:bg-secondary dark:hover:bg-dark-secondary border-border dark:border-dark-border text-text dark:text-dark-text')
                }
              >
                {t}
              </button>
            ))}
          </div>

          {loading && <div className="text-secondary dark:text-dark-secondary">Loading...</div>}
          {error && <div className="text-red-400">Error: {error}</div>}
          {!loading && filtered.length === 0 && (
            <div className="text-secondary dark:text-dark-secondary">No documents found.</div>
          )}

          <div className="space-y-4">
            {filtered.map((p) => (
              <article
                key={p._id}

                className="relative border border-border dark:border-dark-border rounded-xl p-5 
bg-card dark:bg-dark-card transition-all duration-300 ease-in-out overflow-hidden 
hover:scale-[1.03] hover:shadow-lg hover:bg-secondary/80 dark:hover:bg-dark-secondary/80 
before:absolute before:top-0 before:left-0 before:w-full before:h-[3px] 
before:bg-gradient-to-r before:from-primary before:to-secondary 
before:scale-x-0 hover:before:scale-x-100 before:origin-left 
before:transition-transform before:duration-300"
              >
                <h2 className="text-xl font-semibold mb-1 text-text dark:text-dark-text">
                  <Link to={`/docs/${p._id}`}>{p.title}</Link>
                </h2>
                <p className="text-secondary dark:text-dark-secondary mb-3">
                  {(p.problem || '').slice(0, 180)}
                  {p.problem && p.problem.length > 180 ? '...' : ''}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(p.tags || []).map((t, i) => (
                    <span
                      key={`${t}-${i}`}
                      className="px-2 py-1 text-xs rounded-full border border-border dark:border-dark-border bg-card dark:bg-dark-card text-text dark:text-dark-text"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-secondary dark:text-dark-secondary">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-card dark:bg-dark-card flex items-center justify-center text-text dark:text-dark-text">
                      {(p.createdBy?.name || 'U')[0]}
                    </div>
                    <span>{p.createdBy?.name || 'Unknown'}</span>
                    <span>•</span>
                    <span>{formatRelative(p.createdAt)}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Heart size={16} className="text-secondary dark:text-dark-secondary" />
                      {p.Likes?.length || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={16} className="text-secondary dark:text-dark-secondary" />
                      {/* Comments not implemented yet */}
                      0
                    </span>
                    <Bookmark size={16} className="text-secondary dark:text-dark-secondary" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}