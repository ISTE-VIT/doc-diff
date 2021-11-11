const express = require('express');

const router = express.Router();

const { getAllProjects, createProject, getProjectById, updateShareableProject, deleteProject, updateProjectName, updateFileTree } = require('../controllers/projects');

router.get('/all', getAllProjects);
router.post('/create', createProject);
router.get('/:id', getProjectById);
router.patch('/share', updateShareableProject);
router.delete('/delete', deleteProject);
router.patch('/updatename', updateProjectName);
router.patch('/updatefiles', updateFileTree);

module.exports = router;