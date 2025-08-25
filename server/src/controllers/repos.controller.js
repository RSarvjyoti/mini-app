const Repo = require("../models/repo.model");
const { fetchReposByUsername } = require("../services/github.service");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || null;

async function fetchAndStore(req, res) {
  try {
    const { username } = req.query;
    if (!username) return res.status(400).json({ message: 'username query param required' });

    const repos = await fetchReposByUsername(username, GITHUB_TOKEN);
    const results = [];
    for (const r of repos) {
      const payload = {
        githubId: r.id,
        name: r.name,
        full_name: r.full_name,
        html_url: r.html_url,
        description: r.description,
        language: r.language,
        stargazers_count: r.stargazers_count || 0,
        forks_count: r.forks_count || 0,
        owner_login: r.owner && r.owner.login
      };
      const doc = await Repo.findOneAndUpdate(
        { githubId: payload.githubId },
        { $set: payload },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      results.push(doc);
    }
    return res.json({ message: `Saved ${results.length} repos.`, repos: results });
  } catch (err) {
    console.error('fetchAndStore error', err.message || err);
    if (err.response && err.response.status === 404)
      return res.status(404).json({ message: 'GitHub user not found' });
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

async function listRepos(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.min(50, Math.max(5, parseInt(req.query.limit || '10', 10)));
    const skip = (page - 1) * limit;
    const filter = {};
    if (req.query.owner_login) filter.owner_login = req.query.owner_login;

    const [items, total] = await Promise.all([
      Repo.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Repo.countDocuments(filter)
    ]);

    return res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      items
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function getRepo(req, res) {
  try {
    const doc = await Repo.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Repo not found' });
    return res.json(doc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function createRepo(req, res) {
  try {
    const obj = req.body;
    const exists = await Repo.findOne({ githubId: obj.githubId });
    if (exists) return res.status(400).json({ message: 'Repo with same githubId exists' });
    const saved = await Repo.create(obj);
    return res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function updateRepo(req, res) {
  try {
    const doc = await Repo.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!doc) return res.status(404).json({ message: 'Repo not found' });
    return res.json(doc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function deleteRepo(req, res) {
  try {
    const doc = await Repo.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Repo not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { fetchAndStore, listRepos, getRepo, createRepo, updateRepo, deleteRepo };