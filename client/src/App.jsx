import React from 'react';
import SearchForm from './components/SearchForm';
import RepoList from './components/RepoList';
import { fetchAndStore } from './api/api';

function App() {
  async function handleFetch(username) {
    const res = await fetchAndStore(username);
    alert(res.data.message || 'Fetched');
    window.dispatchEvent(new Event('repos:updated'));
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col">
      <header className="w-full py-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg flex flex-col items-center justify-center">
        <div className="flex items-center gap-4 mb-2">
          <img src="/vite.svg" alt="Logo" className="w-12 h-12 drop-shadow-lg" />
          <h1 className="text-4xl font-extrabold text-white tracking-tight">GitHub Repo Dashboard</h1>
        </div>
        <p className="text-lg text-white/80 text-center">Fetch and explore repositories</p>
      </header>
      <main className="flex-1 w-full flex flex-col items-center justify-start pt-10 px-2">
        <div className="w-full max-w-xl mb-8">
          <SearchForm onFetch={handleFetch} />
        </div>
        <div className="w-full max-w-6xl">
          <RepoList />
        </div>
      </main>
    </div>
  );
}

export default App;
