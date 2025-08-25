const express = require('express');
const { getRepo, createRepo, updateRepo, deleteRepo, fetchAndStore, listRepos } = require('../controllers/repos.controller');
const router = express.Router();

router.get('/fetch', fetchAndStore);

router.get('/', listRepos);

router.get('/:id', getRepo);
router.post('/', createRepo);
router.put('/:id', updateRepo);
router.delete('/:id', deleteRepo);

module.exports = router;
