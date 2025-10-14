import { useEffect, useMemo, useState } from "react";
import { Search, Heart, MessageSquare, Bookmark } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import { Link } from "react-router-dom";

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

const CATEGORIES = ["Frontend", "Backend", "DevOps", "Database", "DSA"];

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("Latest"); // Latest | Trending | Following

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await axiosInstance.get("/posts");
        if (mounted) setPosts(data.posts || data || []);
      } catch (e) {
        setError(e.message || "Failed to load feed");
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

    if (tab === "Trending") {
      arr.sort((a, b) => (b.Likes?.length || 0) - (a.Likes?.length || 0));
    } else {
      arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (!q) return arr;
    return arr.filter((p) => {
      const inTitle = (p.title || "").toLowerCase().includes(q);
      const inProblem = (p.problem || "").toLowerCase().includes(q);
      const inSolution = (p.solution || "").toLowerCase().includes(q);
      const inTags = (p.tags || []).some((t) => (t || "").toLowerCase().includes(q));
      return inTitle || inProblem || inSolution || inTags;
    });
  }, [posts, query, tab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Top bar */}
      <div className="border-b border-gray-800 bg-black sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="font-semibold text-lg">DebugDiary</Link>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documentation..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Link
            to="/docs/new"
            className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            New Doc
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.length === 0 && <span className="text-gray-500 text-sm">No tags yet</span>}
              {allTags.slice(0, 12).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 text-sm rounded-full border border-gray-700 bg-gray-900 hover:bg-gray-800 text-gray-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c} className="flex justify-between text-sm">
                  <span className="text-gray-300">{c}</span>
                  <span className="text-gray-500">{categoryCounts[c]}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main feed */}
        <main className="lg:col-span-9">
          <h1 className="text-2xl font-bold mb-2">Documentation Feed</h1>
          <p className="text-gray-600 mb-4">Browse developer documentation shared by the community</p>

          <div className="flex items-center gap-2 mb-6">
            {["Latest", "Trending", "Following"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={
                  "px-3 py-1.5 rounded-md text-sm border " +
                  (tab === t ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-900 hover:bg-gray-800")
                }
              >
                {t}
              </button>
            ))}
          </div>

          {loading && <div className="text-gray-400">Loading...</div>}
          {error && <div className="text-red-400">{error}</div>}
          {!loading && filtered.length === 0 && (
            <div className="text-gray-500">No documents found.</div>
          )}

          <div className="space-y-4">
            {filtered.map((p) => (
              <article
                key={p._id}
                className="border border-gray-800 rounded-xl p-5 bg-gray-900 hover:bg-gray-800 transition"
              >
                <h2 className="text-xl font-semibold mb-1"><Link to={`/docs/${p._id}`}>{p.title}</Link></h2>
                <p className="text-gray-300 mb-3">
                  {(p.problem || "").slice(0, 180)}
                  {p.problem && p.problem.length > 180 ? "..." : ""}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(p.tags || []).map((t, i) => (
                    <span
                      key={`${t}-${i}`}
                      className="px-2 py-1 text-xs rounded-full border border-gray-700 bg-gray-900 text-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-gray-200">
                      {(p.createdBy?.name || "U")[0]}
                    </div>
                    <span>{p.createdBy?.name || "Unknown"}</span>
                    <span>•</span>
                    <span>{formatRelative(p.createdAt)}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Heart size={16} className="text-gray-500" />
                      {p.Likes?.length || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={16} className="text-gray-500" />
                      {/* Comments not implemented yet */}
                      0
                    </span>
                    <Bookmark size={16} className="text-gray-500" />
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
