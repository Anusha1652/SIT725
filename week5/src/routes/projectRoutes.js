const express = require('express');
const router = express.Router();
const { getProjects, createProject } = require('../controllers/projectController');

router.get('/projects', getProjects);
router.post('/projects', createProject);

module.exports = router;
