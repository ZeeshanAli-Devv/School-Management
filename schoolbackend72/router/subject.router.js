import { Router } from "express";
import { createSubject, deleteSubject, fetchSubjects, updateSubjects } from "../controller/subject.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
const SubjectRouter = Router()

SubjectRouter.get("/", AuthMiddleware, fetchSubjects)
SubjectRouter.post("/", AuthMiddleware, createSubject)
SubjectRouter.put("/:id", AuthMiddleware, updateSubjects)
SubjectRouter.delete("/:id", AuthMiddleware, deleteSubject)

export default SubjectRouter