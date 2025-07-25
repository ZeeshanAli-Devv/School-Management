import SalaryModel from '../model/salary.model.js'

export const createSalary = async (req, res)=>{
    try {
        req.body.school = req.school._id
        const salary = await SalaryModel.create(req.body)
        res.json(salary)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const fetchSalary = async (req, res)=>{
    try {
        const salaries = await SalaryModel.find({school: req.school._id}).populate("employeeName");
        res.json(salaries)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const updateSalary = async (req, res)=>{
    try {
        const salary = await SalaryModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if(!salary)
            return res.status(404).json({message: 'Salary not found by id'})

        res.json(salary)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const deleteSalary = async (req, res)=>{
    try {
        const salary = await SalaryModel.findByIdAndDelete(req.params.id)

        if(!salary)
            return res.status(404).json({message: 'Salary not found by id'})

        res.json(salary)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}