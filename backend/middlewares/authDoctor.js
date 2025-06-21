import jwt from "jsonwebtoken"

//Doctor authentication middleware
const authDoctor = async (req,res,next) =>{
    try {
        const {dtoken} = req.headers
        if(!dtoken) {
            return res.json({succes:false,message:"not authorized login again"})
        }
        const token_decode = jwt.verify(dtoken,process.env.JWT_SECRET)
        if (!req.body) req.body = {}
        req.body.docId = token_decode.id

        next()

    } catch (e) {
        console.log(e)
        res.json({success:false,message:e.message})
    }
}

export default authDoctor