import mongoose, {model, Schema} from 'mongoose'

const expenseSchema = new Schema({
    school: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    expenseAt: {
        type: Date,
        required: true
    }
}, {timestamps: true})

const ExpenseModel = model("Expense", expenseSchema)
export default ExpenseModel