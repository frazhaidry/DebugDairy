import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { Heart, Link as LinkIcon, ArrowLeft } from "lucide-react";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString();
}

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await axiosInstance.get(`/posts/${id}`);
        const p = data.post || data; // backend returns { post }
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

  if (loading) return <div className="max-w-4xl mx-auto p-6 text-white">Loading...</div>;
  if (error) return <div className="max-w-4xl mx-auto p-6 text-red-400">{error}</div>;
  if (!post) return <div className="max-w-4xl mx-auto p-6 text-white">Not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-6">
          <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-gray-200">
            {(post.createdBy?.name || "U")[0]}
          </div>
          <span>{post.createdBy?.name || "Unknown"}</span>
          <span>•</span>
          <span>{formatDate(post.createdAt)}</span>
          <span className="ml-auto inline-flex items-center gap-1">
            <Heart size={16} className="text-gray-500" />
            {post.Likes?.length || 0}
          </span>
        </div>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Problem</h2>
            <p className="text-gray-200 whitespace-pre-line">{post.problem}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Solution</h2>
            <p className="text-gray-200 whitespace-pre-line">{post.solution}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {(post.tags || []).map((t, i) => (
                <span key={`${t}-${i}`} className="px-2 py-1 text-xs rounded-full border border-gray-700 bg-gray-900 text-gray-200">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Resources</h2>
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
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                    >
                      <LinkIcon size={16} /> {url}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <div className="mt-8">
          <Link to="/docs" className="px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-800 text-gray-200">Back to Feed</Link>
        </div>
      </div>
    </div>
  );
}
