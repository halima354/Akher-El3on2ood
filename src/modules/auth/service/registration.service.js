import userModel from "../../../DB/model/user.model.js";
import { asyncHandler } from "../../../utils/response/error.response.js"
import successResponse from "../../../utils/response/success.response.js";
import {   generateHash } from "../../../utils/security/hash.security.js";

export const signup = asyncHandler (
    async (req, res, next) => {
    const{ password, email}=req.body
    console.log({password,email});
    if(await userModel.findOne({ where: { email }})){
        return next(new Error("email exist",{cause:409}))
    }
    const hashPassword= generateHash({plainText:password})
    const user= await userModel.create({email,password:hashPassword}
    )
    return successResponse({res, status:201, data:{user} })
}
)




