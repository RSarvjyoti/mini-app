import { useState } from "react";
import {FaGithub, FaStar, FaCodeBranch, FaEdit , FaTrash } from 'react-icons/fa'

export default function RepoItem({ repo, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState(repo.notes || '');

  async function save() {
    await onUpdate(repo._id, { notes });
    setEditing(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100 flex flex-col justify-between min-h-[260px] transition-transform hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex flex-row items-center gap-4 mb-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 shadow">
          <FaGithub className="text-3xl text-blue-700" />
        </div>
        <div className="flex-1 min-w-0">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline text-xl font-bold break-words"
          >
            {repo.full_name || repo.name}
          </a>
          <div className="text-sm text-gray-600 mt-1 break-words line-clamp-2">{repo.description}</div>
          <div className="text-xs text-gray-500 mt-2 flex flex-row items-center gap-3">
            {repo.language && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold">{repo.language}</span>}
            <span className="flex items-center gap-1"><FaStar className="text-yellow-400" /> {repo.stargazers_count}</span>
            <span className="flex items-center gap-1"><FaCodeBranch className="text-purple-500" /> {repo.forks_count}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center mt-2">
        <div className="flex-1">
          {editing ? (
            <div className="mt-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700 bg-blue-50"
                placeholder="Add your notes here..."
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={save}
                  className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow flex items-center gap-2"
                >
                  <FaEdit /> Save
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-2 text-gray-800 text-base font-medium min-h-[32px]">{repo.notes}</div>
          )}
        </div>
        <div className="flex flex-col gap-2 items-end ml-4">
          <button
            onClick={() => setEditing((s) => !s)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg shadow hover:brightness-110 transition-all font-medium flex items-center gap-2"
          >
            <FaEdit /> {editing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={() => onDelete(repo._id)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg shadow hover:brightness-110 transition-all font-medium flex items-center gap-2"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
