import { Router } from "express";
import { createClass, deleteClass, fetchClass, updateClass } from "../controller/class.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const ClassRouter = Router()

ClassRouter.post("/", AuthMiddleware, createClass)
ClassRouter.get("/", AuthMiddleware, fetchClass)
ClassRouter.put("/:id", AuthMiddleware, updateClass)
ClassRouter.delete("/:id", AuthMiddleware, deleteClass)

export default ClassRouter