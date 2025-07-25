import EmployeeModel from "../model/employee.model.js"
import path from 'path'

export const createEmployee = async (req, res)=>{
    try {
        req.body.school = req.school._id
        const employee = await EmployeeModel.create(req.body)
        res.json(employee)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const fetchEmployees = async (req, res)=>{
    try {
        const employees = await EmployeeModel.find({school: req.school._id})
        res.json(employees)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const updateEmployee = async (req, res)=>{
    try {
        const employee = await EmployeeModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if(!employee)
            return res.status(404).json({message: 'Employee not found'})

        res.json(employee)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const deleteEmployee = async (req, res)=>{
    try {
        const employee = await EmployeeModel.findByIdAndDelete(req.params.id)

        if(!employee)
            return res.status(404).json({message: 'Employee not found'})

        res.json({message: 'Employee deleted'})
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const uploadEmployeeImage = async (req, res)=>{
    try {
        await EmployeeModel.findByIdAndUpdate(req.params.id, {image: req.file.path})
        res.json({message: "Upload success"})
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const fetchEmployeeImage = async (req, res)=>{
    try {
        const {image} = await EmployeeModel.findById(req.params.id, {image: 1})
        const root = process.cwd()
        const fullUrl = path.join(root, image)
        res.sendFile(fullUrl)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}