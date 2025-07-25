    import mongoose, {Schema, model} from 'mongoose'

    const paymentSchema = new Schema({
        school: {
            type: mongoose.Types.ObjectId,
            ref: 'School',
            required: true
        },
        student: {
            type: mongoose.Types.ObjectId,
            ref: 'Student',
            required: true
        },
        fatherName: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        fee: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }, {timestamps: true})

    const PaymentModel = model("Payment", paymentSchema)
    export default PaymentModel
