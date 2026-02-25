import userModel from "../../../DB/model/user.model.js";
import { emailEvent } from "../../../utils/events/email.event.js";
import { asyncHandler } from "../../../utils/response/error.response.js";
import successResponse from "../../../utils/response/success.response.js";
import { compareHash, generateHash } from "../../../utils/security/hash.security.js";
import {  generateToken } from "../../../utils/security/token.security.js";

export const login= asyncHandler(
    async(req,res,next)=>{
        const{ email, password}=req.body
        console.log({email,password});
        const user = await userModel.findOne({ where: { email } })
        if(!user){
            return next(new Error("not found",{cause:404}))
        }
        if(!compareHash({plainText:password, hashValue: user.password})){
            return next(new Error("Email or password is incorrect",{cause:404}))
        }
        const access_token=generateToken({payload:{id:user.id , role:user.role}, signature:user.role === 'admin' ? process.env.SYSTEM_ACCESS_TOKEN : process.env.USER_ACCESS_TOKEN  })
        const refreshToken=generateToken({payload:{id:user.id}, signature:user.role === 'admin' ?process.env.SYSTEM_REFRESH_TOKEN:process.env.USER_REFRESH_TOKEN,expiresIn:31536000})
        return successResponse({res, status:201, data:{token:{
            access_token,
            refreshToken} } })
    }
)

export const forgetPassword = asyncHandler(async(req,res,next)=>{
    const {email}= req.body
    const user= await userModel.findOne({where: { email}} )
    if(!user){
        return next(new Error("in-valid account",{cause:404}))
    }
    emailEvent.emit('sendForgetPassword',{id :user.id ,email})
    return successResponse({res, status:201, data:{user} })
}
)

export const resetPassword = asyncHandler(async(req,res,next)=>{

    const {email,code,password}= req.body
    const user= await userModel.findOne({where: { email}})
    if(!user){
        return next(new Error("in-valid account",{cause:404}))
    }
    if(!compareHash({plainText:code, hashValue:user.forgetPasswordOTP})){
        return next(new Error("in-valid  rest code",{cause:400}))
    }
    if ( Date.now() > user.OTPExpiry) {
        return next(new Error("expired OTP",{cause:404}))
    }
    const hashPassword= generateHash({plainText:password})
    await userModel.update({password:hashPassword,changeCredentialTime: Date.now(), forgetPasswordOTP:null, emailOTP:null},{ where: { email } })
    return successResponse({res, status:201, data:{user} })
}
)

