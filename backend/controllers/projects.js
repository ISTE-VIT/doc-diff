const mongoose = require('mongoose');

const Project = require('../models/Project')

const getAllProjects = async (req, res) => {
    const { uid } = req.query

    const projects = await Project.find({ uid })

    if (!projects) return res.status(404).send('No projects found')

    return res.status(200).send(projects)
}

const getProjectFiles = async (req, res) => {
    // const { uid, fid } = req.body

    // const folder = await Project.find({ uid, fid })

    // if (!folder) {
    //     return res.status(404).send('No project found')
    // }

    // return res.status(200).send(folder)
}

const createProject = async (req, res) => {
    const { uid, name, objectArray } = req.body

    const project = new Project({ uid, name, children: objectArray })

    await project.save()

    return res.status(201).send(project)
}

module.exports = { getAllProjects, getProjectFiles, createProject }