import { Router } from "express";
import { fetchDashboard } from "../controller/dashboard.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
const DashboardRouter = Router()

DashboardRouter.get("/", AuthMiddleware, fetchDashboard)
export default DashboardRouter