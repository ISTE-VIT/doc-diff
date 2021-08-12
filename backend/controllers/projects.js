const mongoose = require('mongoose');

const Project = require('../models/Project')

const getAllProjects = (req, res) => {
    const { uid } = req.body

    const projects = Project.find({ uid })

    if (!projects) {
        return res.status(404).send('No projects found')
    }

    return res.status(200).send(projects)
}

const getProjectFiles = async (req, res) => {
    const { uid, fid } = req.body

    const folder = await Project.find({ uid, fid })

    if (!folder) {
        return res.status(404).send('No project found')
    }

    return res.status(200).send(folder)
}

const createProject = (req, res) => {
    const { uid, fid, name, desc } = req.body

    const project = new Project({ uid, fid, name, desc })

    Project.create(project)

    return res.status(201).send('Successfully created project')
}

module.exports = { getAllProjects, getProjectFiles, createProject }