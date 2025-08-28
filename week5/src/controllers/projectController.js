const Project = require('../models/Project');

// GET /api/projects
const getProjects = async (_req, res) => {
  try {
    const items = await Project.find({}).sort({ createdAt: -1 });
    res.json({ statusCode: 200, data: items, message: 'Success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Error fetching projects' });
  }
};

// POST /api/projects
const createProject = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const doc = await Project.create({
      title: title || 'Untitled',
      description: description || 'No description',
      link: link || '#'
    });
    res.json({ statusCode: 200, data: doc, message: 'Created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Error creating project' });
  }
};

module.exports = { getProjects, createProject };
