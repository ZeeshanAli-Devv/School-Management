import TeacherModel from "../model/teacher.model.js"
import path from 'path'

export const createTeacher = async (req, res)=>{
    try {
        req.body.school = req.school._id
        const Teacher = await TeacherModel.create(req.body)
        res.json(Teacher)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const fetchTeachers = async (req, res)=>{
    try {
        const Teachers = await TeacherModel.find({school: req.school._id})
        res.json(Teachers)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const updateTeacher = async (req, res)=>{
    try {
        const Teacher = await TeacherModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if(!Teacher)
            return res.status(404).json({message: 'Teacher not found'})

        res.json(Teacher)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const deleteTeacher = async (req, res)=>{
    try {
        const Teacher = await TeacherModel.findByIdAndDelete(req.params.id)

        if(!Teacher)
            return res.status(404).json({message: 'Teacher not found'})

        res.json({message: 'Teacher deleted'})
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const uploadTeacherImage = async (req, res)=>{
    try {
        await TeacherModel.findByIdAndUpdate(req.params.id, {image: req.file.path})
        res.json({message: "Upload success"})
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const fetchTeacherImage = async (req, res)=>{
    try {
        const {image} = await TeacherModel.findById(req.params.id, {image: 1})
        const root = process.cwd()
        const fullUrl = path.join(root, image)
        res.sendFile(fullUrl)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}