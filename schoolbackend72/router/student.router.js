import { Router } from "express";
import { admission, deleteStudent, fetchStudents, updateStudent } from "../controller/student.controller.js";
import AuthMiddleware from '../middleware/auth.middleware.js'
const StudentRouter = Router()

StudentRouter.post('/', AuthMiddleware, admission)
StudentRouter.get('/', AuthMiddleware, fetchStudents)
StudentRouter.put('/:id', AuthMiddleware, updateStudent)
StudentRouter.delete('/:id', AuthMiddleware, deleteStudent)

export default StudentRouter