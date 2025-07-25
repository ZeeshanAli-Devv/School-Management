import mongoose, {Schema, model} from 'mongoose'

const teacherSchema = new Schema({
    school: {
        type: mongoose.Types.ObjectId,
        ref: 'School'
    },
    teacherName: {
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
    subjects: [{
        type: String,
        required: true
    }],
    previousSchool: {
        type: String
    },
    image: {
        type: String
    }
},{timestamps: true})

const TeacherModel = model("Teacher", teacherSchema)
export default TeacherModel