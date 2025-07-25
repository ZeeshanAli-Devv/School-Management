import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res)=>{
    try {
        const payload = await jwt.verify(req.body.token, process.env.JWT_SECRET)
        res.json(payload)
    }
    catch(err){
        res.status(401).json({message: 'Invalid token'})
    }
}