import ExpenseModel from '../model/expense.model.js'

export const createExpense = async (req, res)=>{
    try {
        req.body.school = req.school._id
        const expense = await ExpenseModel.create(req.body)
        res.json(expense)
    }   
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const fetchExpenses = async (req, res)=>{
    try {
        const schoolId = req.school._id
        const expenses = await ExpenseModel.find({school: schoolId}).sort({createdAt: -1})
        res.json(expenses)
    }   
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}


export const updateExpense = async (req, res)=>{
    try {
        const expense = await ExpenseModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(expense)
    }   
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const deleteExpense = async (req, res)=>{
    try {
        const expense = await ExpenseModel.findByIdAndDelete(req.params.id)
        res.json(expense)
    }   
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}