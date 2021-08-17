const express = require('express');

const router = express.Router();

const { getAllProjects, createProject, getProjectById, updateShareableProject } = require('../controllers/projects');

router.get('/all', getAllProjects);
router.post('/create', createProject);
router.get('/:id', getProjectById);
router.patch('/share', updateShareableProject);

module.exports = router;