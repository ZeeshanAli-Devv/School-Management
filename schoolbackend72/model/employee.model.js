import mongoose, {Schema, model} from 'mongoose'

const employeeSchema = new Schema({
    school: {
        type: mongoose.Types.ObjectId,
        ref: 'School'
    },
    employeeName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    designation: {
        type: String,
        required: true
    }
},{timestamps: true})

const EmployeeModel = model("Employee", employeeSchema)
export default EmployeeModel