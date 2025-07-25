import { Router } from "express";
import { createEmployee, deleteEmployee, fetchEmployeeImage, fetchEmployees, updateEmployee, uploadEmployeeImage } from "../controller/employee.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
import multer from "multer";
const EmployeeRouter = Router()

const storage = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, "storage/Employee")
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}.png`)
    }
})

const upload = multer({storage: storage})

EmployeeRouter.get("/", AuthMiddleware, fetchEmployees)
EmployeeRouter.post("/", AuthMiddleware, createEmployee)
EmployeeRouter.put("/:id", AuthMiddleware, updateEmployee)
EmployeeRouter.delete("/:id", AuthMiddleware, deleteEmployee)
EmployeeRouter.put("/upload-image/:id", AuthMiddleware, upload.single("image"), uploadEmployeeImage)
EmployeeRouter.get("/image/:id", AuthMiddleware, fetchEmployeeImage)

export default EmployeeRouter