import StudentModel from "../model/student.model.js"

export const admission = async (req, res)=>{
    try {
        req.body.school = req.school._id
        const student = await StudentModel.create(req.body)
        res.json(student)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const fetchStudents = async (req, res)=>{
    try {
        let admissions = []
        const session = req.query.session

        if(session)
        {
            admissions = await StudentModel.find({school: req.school._id, session: session}).populate("class").sort({createdAt: -1})
        }
        else {
            admissions = await StudentModel.find({school: req.school._id}).populate("class").sort({createdAt: -1})
        }

        res.json(admissions)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const updateStudent = async (req, res)=>{
    try {
        const admission = await StudentModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if(!admission)
            return res.status(404).json({message: 'Student not found with id value'})

        res.json(admission)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const deleteStudent = async (req, res)=>{
    try {
        const admission = await StudentModel.findByIdAndDelete(req.params.id)

        if(!admission)
            return res.status(404).json({message: 'Student not found with id value'})

        res.json(admission)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}