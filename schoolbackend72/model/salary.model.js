import mongoose, {Schema, model} from 'mongoose'

const salarySchema = new Schema({
    school: {
        type: mongoose.Types.ObjectId,
        ref: 'School',
        required: true
    },
    employeeName: {
    type: mongoose.Types.ObjectId,
    ref: 'Employee',
    required: true
    },
    salary: {
        type: Number,
        required: true
    },
    salaryDate: {
        type: Date,
        required: true
    },
    description: {
        type: String
    }
}, {timestamps: true})

const SalaryModel = model("Salary", salarySchema)
export default SalaryModel