import mongoose, {Schema, model} from 'mongoose'

const subjectSchema = new Schema({
    school: {
        type: mongoose.Types.ObjectId,
        ref: 'School'
    },
    subjectName: {
        type: String,
        required: true
    },
    fullmarks: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const SubjectModel = model("Subject", subjectSchema)
export default SubjectModel