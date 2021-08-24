const mongoose = require('mongoose');

const Project = require('../models/Project')

const getAllProjects = async (req, res) => {
    const { uid } = req.query

    const projects = await Project.find({ uid })
    if (!projects) return res.status(404).send('No projects found')

    return res.status(200).send(projects)
}

const createProject = async (req, res) => {
    const { uid, projectName, folderTree } = req.body 

    const existingProject = await Project.findOne({ uid, name: projectName })
    if (existingProject) return res.status(409).send('Project with the same name already exists')

    const project = new Project({ uid, name: projectName, files: folderTree })
    await project.save()

    return res.status(201).send(project)
}

const getProjectById = async (req, res) => {
    const { id } = req.params

    const project = await Project.findById(id)
    if (!project) return res.status(404).send('Project not found')

    const { shareable, uid } = project

    if (shareable) return res.status(200).send(project)
    else {
        if (project.uid !== uid) return res.status(401).send('Unauthorized user')

        return res.status(200).send(project)
    }
}

const updateShareableProject = async (req, res) => {
    const { id } = req.params

    const existingProject = await Project.findById(id)
    if (!existingProject) return res.status(404).send('Project not found')

    const { shareable, uid } = existingProject

    if (existingProject.uid !== uid) return res.status(401).send('Unauthorized user')
        const project = await Project.findByIdAndUpdate(id, shareable)

    return res.status(200).send(project)
}

module.exports = { getAllProjects, createProject, getProjectById, updateShareableProject }