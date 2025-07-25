import PaymentModel from '../model/payment.model.js'

export const createPayment = async (req, res)=>{
    try {
        req.body.school = req.school._id
        const payment = await PaymentModel.create(req.body)
        res.json(payment)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const fetchPayment = async (req, res)=>{
    try {
        const payments = await PaymentModel.find({school: req.school._id}).populate('student')
        res.json(payments)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const updatePayment = async (req, res)=>{
    try {
        const payment = await PaymentModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        
        if(!payment)
            return res.status(404).json({message: 'Payment not found'})

        res.json(payment)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

export const deletePayment = async (req, res)=>{
    try {
        const payment = await PaymentModel.findByIdAndDelete(req.params.id)
        
        if(!payment)
            return res.status(404).json({message: 'Payment not found'})

        res.json(payment)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}