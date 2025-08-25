const mongoose = require('mongoose');

const RepoSchema = new mongoose.Schema({
  githubId: { type: Number, required: true, unique: true }, 
  name: { type: String, required: true },
  full_name: { type: String },
  html_url: { type: String },
  description: { type: String },
  language: { type: String },
  stargazers_count: { type: Number, default: 0 },
  forks_count: { type: Number, default: 0 },
  owner_login: { type: String },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Repo = mongoose.model('Repo', RepoSchema);
module.exports = Repo