import { Router } from "express";
import { createTeacher, deleteTeacher, fetchTeacherImage, fetchTeachers, updateTeacher, uploadTeacherImage } from "../controller/teacher.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
import multer from "multer";
const TeacherRouter = Router()

const storage = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, "storage/teacher")
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}.png`)
    }
})

const upload = multer({storage: storage})

TeacherRouter.get("/", AuthMiddleware, fetchTeachers)
TeacherRouter.post("/", AuthMiddleware, createTeacher)
TeacherRouter.put("/:id", AuthMiddleware, updateTeacher)
TeacherRouter.delete("/:id", AuthMiddleware, deleteTeacher)
TeacherRouter.put("/upload-image/:id", AuthMiddleware, upload.single("image"), uploadTeacherImage)
TeacherRouter.get("/image/:id", AuthMiddleware, fetchTeacherImage)

export default TeacherRouter