import {Router} from 'express'
import { createExpense, deleteExpense, updateExpense } from '../controller/expense.controller.js'
import { fetchExpenses } from '../controller/expense.controller.js'
import AuthMiddleware from '../middleware/auth.middleware.js'

const ExpenseRouter = Router()

ExpenseRouter.post("/", AuthMiddleware, createExpense)
ExpenseRouter.get("/", AuthMiddleware, fetchExpenses)
ExpenseRouter.put('/:id', AuthMiddleware, updateExpense)
ExpenseRouter.delete('/:id', AuthMiddleware, deleteExpense)

export default ExpenseRouter