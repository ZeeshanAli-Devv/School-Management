import jwt from 'jsonwebtoken'

const AuthMiddleware = async (req, res, next)=>{
    try {
        const authorization = req.headers?.authorization

        if(!authorization)
            throw next(new Error("Unauthorized user"))

        const [type, token] = authorization.split(" ")

        if(type !== "Bearer")
            throw next(new Error("Unauthorized user"))

        const school = await jwt.verify(token, process.env.JWT_SECRET)
        req.school = school
        next()
    }
    catch(err)
    {
        res.status(401).json({message: "Unauthorized user"})
    }
}

export default AuthMiddleware