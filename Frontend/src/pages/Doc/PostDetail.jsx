import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { Heart, Link as LinkIcon, ArrowLeft, User } from "lucide-react";
import Comments from '../../Components/Comments/Comments';


function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString();
}

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user')); // ✅ move this up here
  console.log("Current user in PostDetail:", currentUser);


  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/posts/${id}`);
        console.log("Fetched post:", response);
        const p = response.post || response;

        if (mounted) setPost(p);
      } catch (e) {
        setError(e.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading)
    return <div className="max-w-4xl mx-auto p-6 text-white text-center text-xl">Loading...</div>;
  if (error)
    return <div className="max-w-4xl mx-auto p-6 text-red-400 text-center">{error}</div>;
  if (!post)
    return <div className="max-w-4xl mx-auto p-6 text-white text-center">Post not found</div>;

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-10 px-4 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white"
          : "bg-gradient-to-b from-gray-100 via-white to-gray-200 text-gray-900"
      }`}
    >
      <div
        className={`max-w-3xl w-full backdrop-blur-lg border rounded-2xl shadow-2xl p-8 transition duration-300 ${
          isDarkMode
            ? "bg-white/5 border-white/10 hover:shadow-blue-500/20"
            : "bg-white border-gray-200 hover:shadow-blue-200"
        }`}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-current transition"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-3 text-sm mb-8 text-gray-500 dark:text-gray-300">
          <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-200 shadow-inner">
            {post.createdBy?.name ? post.createdBy.name[0].toUpperCase() : <User size={16} />}
          </div>
          <span className="font-medium">{post.createdBy?.name || "Unknown Author"}</span>
          <span>•</span>
          <span>{formatDate(post.createdAt)}</span>
          <span className="ml-auto inline-flex items-center gap-1 text-gray-400 hover:text-red-400 transition">
            <Heart size={16} />
            {post.Likes?.length || 0}
          </span>
        </div>

        {/* Content Section */}
        <section className="space-y-8">
          {/* Problem */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-white-800/40 to-white-900/40 border border-white/10 dark:border-white-200/20">
            <h2 className="text-2xl font-semibold mb-2 text-blue-400">Problem</h2>
            <p className="leading-relaxed whitespace-pre-line">{post.problem}</p>
          </div>

          {/* Solution */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-white-800/40 to-white-900/40 border border-white/10 dark:border-white-200/20">
            <h2 className="text-2xl font-semibold mb-2 text-green-400">Solution</h2>
            <p className="leading-relaxed whitespace-pre-line">{post.solution}</p>
          </div>

          {/* Tags */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-yellow-400">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {(post.tags || []).map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="px-3 py-1 text-xs font-medium rounded-full border border-yellow-400/30 bg-yellow-500/10 text-yellow-300"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-pink-400">Resources</h2>
            {(post.resourceLinks || []).length === 0 ? (
              <p className="text-gray-400">No resources provided.</p>
            ) : (
              <ul className="space-y-2">
                {post.resourceLinks.map((url, i) => (
                  <li key={`${url}-${i}`}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all"
                    >
                      <LinkIcon size={16} /> {url}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Back to Feed */}
        <div className="mt-10 text-center">
          <Link
            to="/docs"
            className="px-6 py-2.5 rounded-md border border-gray-700 text-white-200 hover:bg-gray-500 hover:border-gray-600 transition-all"
          >
            ← Back to Feed
          </Link>
        </div>

        {/* 💬 Comments Section */}
        <div className="mt-10">
          <h2 style={{ color: 'red' }}>COMMENTS TEST — if you see this, component is rendering.</h2>
          <Comments postId={post?._id || id} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}
