const axios = require('axios');

async function fetchReposByUsername(username, token) {
  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos`;
  const headers = { 'User-Agent': 'mini-app' };
  if (token) headers['Authorization'] = `token ${token}`;

  const response = await axios.get(url, {
    headers,
    params: { per_page: 100, sort: 'updated' }
  });

  return response.data; 
}

module.exports = { fetchReposByUsername };
