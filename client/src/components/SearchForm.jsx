import React, { useState } from 'react';

export default function SearchForm({ onFetch }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return alert('Enter a GitHub username');
    setLoading(true);
    try {
      await onFetch(username.trim());
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub username"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded shadow hover:brightness-110 transition-all w-full md:w-auto"
        >
          {loading ? 'Fetching...' : 'Fetch repos & Save'}
        </button>
      </form>
    </div>
  );
}