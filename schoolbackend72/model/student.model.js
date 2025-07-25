import mongoose, { Schema, model } from "mongoose";
import getSession from "../util/get-session.js";

const studentSchema = new Schema({
    school: {
        type: mongoose.Types.ObjectId,
        ref: 'School',
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
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
    class: {
        type: mongoose.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    section: {
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
    previousSchool: {
        type: String
    },
    session: {
        type: String
    },
    roll: {
        type: Number
    }
}, {timestamps: true})


studentSchema.pre('save', async function(next){
    const admission = await model("Student").findOne({class: this.class, section: this.section}).sort({roll: -1})
    if(admission)
    {
        this.roll =  admission.roll+1
    }
    else {
        this.roll = 1
    }
    next()
})

studentSchema.pre('save', function(next){
    this.session = getSession()
    next()
})

const StudentModel = model("Student", studentSchema)
export default StudentModel