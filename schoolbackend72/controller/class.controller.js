import ClassModel from "../model/class.model.js"

export const createClass = async (req, res)=>{
    try {
        req.body.school = req.school._id
        const classs = await ClassModel.create(req.body)
        res.json(classs)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const fetchClass = async (req, res)=>{
    try {
        const classes = await ClassModel.find({school: req.school._id}).populate("classTeacher")
        res.json(classes)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const updateClass = async (req, res)=>{
    try {
        const classes = await ClassModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if(!classes)
            return res.status(404).json({message: 'Class not found with id value'})

        res.json(classes)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const deleteClass = async (req, res)=>{
    try {
        const classes = await ClassModel.findByIdAndDelete(req.params.id)

        if(!classes)
            return res.status(404).json({message: 'Class not found with id value'})

        res.json(classes)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}