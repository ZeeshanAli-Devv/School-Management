import {Router} from 'express'
import {createPayment, deletePayment, fetchPayment, updatePayment} from '../controller/payment.controller.js'
import AuthMiddleware from '../middleware/auth.middleware.js'
const PaymentRouter = Router()

PaymentRouter.post("/", AuthMiddleware, createPayment)
PaymentRouter.get("/", AuthMiddleware, fetchPayment)
PaymentRouter.put("/:id", AuthMiddleware, updatePayment)
PaymentRouter.delete("/:id", AuthMiddleware, deletePayment)

export default PaymentRouter