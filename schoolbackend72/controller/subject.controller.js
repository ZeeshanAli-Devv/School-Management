import SubjectModel from "../model/subject.model.js"

export const createSubject = async (req, res)=>{
    try {
        req.body.school = req.school._id
        const subject = await SubjectModel.create(req.body)
        res.json(subject)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const fetchSubjects = async (req, res)=>{
    try {
        const subjects = await SubjectModel.find({school: req.school._id})
        res.json(subjects)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const updateSubjects = async (req, res)=>{
    try {
        const subject = await SubjectModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if(!subject)
            return res.status(404).json({message: 'Subject not found'})

        res.json(subject)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const deleteSubject = async (req, res)=>{
    try {
        const subject = await SubjectModel.findByIdAndDelete(req.params.id)

        if(!subject)
            return res.status(404).json({message: 'Subject not found'})

        res.json({message: 'Subject deleted'})
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}