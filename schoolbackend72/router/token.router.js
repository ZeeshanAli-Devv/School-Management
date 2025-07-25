import { Router } from "express";
import { verifyToken } from "../controller/token.controller.js";
const TokenRouter = Router()

TokenRouter.post("/verify", verifyToken)

export default TokenRouter