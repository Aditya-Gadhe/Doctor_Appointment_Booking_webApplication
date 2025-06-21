import jwt from "jsonwebtoken"

//user authentication middleware
const authUser = async (req,res,next) =>{
    try {
        const {token} = req.headers
        if(!token) {
            return res.json({succes:false,message:"Not Authorized, login again"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        
        if (!req.body) {
            req.body = {};
        }
        req.body.userId = token_decode.id
        

        next()

    } catch (e) {
        console.log(e)
        res.json({success:false,message:e.message})
    }
}

export default authUser