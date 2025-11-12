// Frontend/src/Components/Comments/Comments.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import axiosInstance from '../../api/axiosInstance';

const timeAgo = (iso) => (iso ? new Date(iso).toLocaleString() : '');

export default function Comments({ postId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  // refs
  const mountedRef = useRef(false);
  const didLogMountRef = useRef(false);
  const intervalIdRef = useRef(null);

  // Stable fetch function
  const fetchComments = useCallback(
    async ({ background } = {}) => {
      try {
        // axiosInstance already returns response.data (see your interceptor)
        const data = await axiosInstance.get(`/posts/${postId}/comments`);
        // data might be { comments: [...] } or an array, handle both
        let serverComments = [];
        if (Array.isArray(data)) serverComments = data;
        else if (Array.isArray(data.comments)) serverComments = data.comments;
        else if (Array.isArray(data.data)) serverComments = data.data;
        else if (data.comment) serverComments = [data.comment];

        // Only update state if changed to avoid re-renders
        setComments((prev) => {
          const prevJSON = JSON.stringify(prev);
          const serverJSON = JSON.stringify(serverComments);
          if (prevJSON === serverJSON) return prev;
          return serverComments;
        });

        // debug: log only once on initial mount (avoid spamming)
        if (!didLogMountRef.current && !background) {
          console.log('Comments API response:', data);
          didLogMountRef.current = true;
        }
      } catch (err) {
        if (!background) console.error('Could not load comments', err);
      }
    },
    [postId]
  );

  // mount / interval effect
  useEffect(() => {
    mountedRef.current = true;

    // fetch once immediately
    fetchComments({ background: false });

    // start interval to poll every 6s
    intervalIdRef.current = setInterval(() => {
      // background: don't spam console
      fetchComments({ background: true });
    }, 6000);

    return () => {
      mountedRef.current = false;
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [fetchComments]);

  // submit handler
  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !currentUser) return;
    setSending(true);

    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      _id: tempId,
      body: text.trim(),
      userId: { _id: currentUser?.id, name: currentUser?.name || 'You' },
      createdAt: new Date().toISOString(),
      optimistic: true,
    };

    // optimistic UI
    setComments((prev) => [optimistic, ...prev]);
    setText('');

    try {
      const res = await axiosInstance.post(`/posts/${postId}/comments`, {
        body: optimistic.body,
      });
      // backend returns { comment } usually; axiosInstance already returned data
      const created = res.comment || res.data?.comment || res;
      setComments((prev) => prev.map((c) => (c._id === tempId ? created : c)));
    } catch (err) {
      // remove optimistic
      setComments((prev) => prev.filter((c) => c._id !== tempId));
      console.error('Post comment failed', err);
      alert('Failed to post comment. Please try again.');
    } finally {
      if (mountedRef.current) setSending(false);
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error('Could not delete comment', err);
      alert('Could not delete comment.');
    }
  };

  return (
    <div className="comments-section" style={{ marginTop: 24 }}>
      <h3>Comments</h3>

      <form onSubmit={submit} style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={currentUser ? 'Write a comment...' : 'Log in to comment'}
          disabled={!currentUser || sending}
          rows={3}
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 8,
            backgroundColor: '#0f1720',
            color: '#e6eef8',
            border: '1px solid rgba(255,255,255,0.06)',
            outline: 'none',
            resize: 'none',
            fontSize: '1rem',
          }}
        />
        <div style={{ alignSelf: 'flex-end' }}>
          <button
            type="submit"
            disabled={!currentUser || sending}
            style={{
              padding: '10px 16px',
              background: '#0ea5ff',
              color: '#02201a',
              border: 'none',
              borderRadius: 8,
              cursor: sending ? 'wait' : 'pointer',
            }}
          >
            {sending ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>

      {Array.isArray(comments) && comments.length > 0 ? (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {comments.map((c) => (
            <li
              key={c._id}
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 0' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#fff' }}>{c.userId?.name || c.user?.name || 'Unknown'}</strong>
                <small style={{ color: '#9ca3af' }}>{timeAgo(c.createdAt)}</small>
              </div>
              <p style={{ margin: '8px 0', color: '#d1d5db' }}>{c.body}</p>
              {currentUser && (currentUser.id === (c.userId?._id || c.user?._id) || currentUser.isAdmin) && (
                <button onClick={() => deleteComment(c._id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#9ca3af' }}>No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
}
