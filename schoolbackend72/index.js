import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
mongoose.connect(process.env.DB)

.then(()=>console.log("Database connected"))

.catch(()=>console.log("Failed to connect with database"))

import cors from 'cors'
import express from "express"
import SchoolRouter from './router/school.router.js'
import SubjectRouter from './router/subject.router.js'
import TeacherRouter from './router/teacher.router.js'
import ClassRouter from './router/class.router.js'
import TokenRouter from './router/token.router.js'
import StudentRouter from './router/student.router.js'
import ExpenseRouter from './router/expense.router.js'
import EmployeeRouter from './router/employee.router.js'
import SalaryRouter from './router/salary.router.js'
import PaymentRouter from './router/payment.router.js'
import DashboardRouter from './router/dashboard.router.js'

const app = express()
app.listen(8080, ()=>console.log("App is running on 8080"))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/school", SchoolRouter)
app.use("/subject", SubjectRouter)
app.use("/teacher", TeacherRouter)
app.use("/class", ClassRouter)
app.use("/token", TokenRouter)
app.use("/student", StudentRouter)
app.use("/expense", ExpenseRouter)
app.use("/employee", EmployeeRouter)
app.use("/salary", SalaryRouter)
app.use("/payment", PaymentRouter)
app.use("/dashboard", DashboardRouter)