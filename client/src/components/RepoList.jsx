import React, { useEffect, useState } from 'react';
import RepoItem from './RepoItem';
import { listRepos, updateRepo, deleteRepo } from '../api/api';

export default function RepoList() {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function load(pageToLoad = 1) {
    setLoading(true);
    try {
      const res = await listRepos(pageToLoad, 10);
      setRepos(res.data.items);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      alert('Failed to load repos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(1); }, []);

  async function handleUpdate(id, payload) {
    await updateRepo(id, payload);
    // optimistic refresh
    load(page);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this repo from DB?')) return;
    await deleteRepo(id);
    load(page);
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6 w-full">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Saved Repos</h3>
      {loading && <div className="text-center text-blue-500">Loading...</div>}
      {!loading && repos.length === 0 && <div className="text-center text-gray-500">No repos stored yet.</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {repos.map((r) => <RepoItem key={r._id} repo={r} onUpdate={handleUpdate} onDelete={handleDelete} />)}
      </div>
      <div className="flex justify-center items-center gap-4 mt-8 w-full">
        <button
          onClick={() => load(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded shadow hover:brightness-110 transition-all disabled:bg-gray-300 disabled:text-gray-500"
        >
          Prev
        </button>
        <div className="text-gray-700 font-medium">Page {page} / {totalPages}</div>
        <button
          onClick={() => load(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded shadow hover:brightness-110 transition-all disabled:bg-gray-300 disabled:text-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}