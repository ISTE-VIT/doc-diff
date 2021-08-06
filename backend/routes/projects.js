const express = require('express');

const router = express.Router();

const { getAllProjects, getProjectFiles, createProject } = require('../controllers/projects');

router.use('/', getAllProjects);
router.use('/project', getProjectFiles);
router.use('/create', createProject);

module.exports = router;