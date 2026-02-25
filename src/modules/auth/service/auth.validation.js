import joi  from 'joi'
export const signup =joi.object().keys({
    email:joi.string().email({tlds:{allow:["com", "net"]},minDomainSegments:2, maxDomainSegments:3}).required(),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)).required(),
    role: joi.string().valid('admin','user').optional(),
}).required()

export const login =joi.object().keys({
    email:joi.string().email({tlds:{allow:["com", "net"]},minDomainSegments:2, maxDomainSegments:3}).required(),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)).required(),
}).required()

export const forgetPassword =joi.object().keys({
    email:joi.string().email({tlds:{allow:["com", "net"]},minDomainSegments:2, maxDomainSegments:3}).required(),
    
}).required()

export const resetPassword =joi.object().keys({
    code:joi.string().pattern(new RegExp(/^\d{4}$/)),
    email:joi.string().email({tlds:{allow:["com", "net"]},minDomainSegments:2, maxDomainSegments:3}).required(),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)).required(),
    confirmationPassword:joi.string().valid(joi.ref('password')),
}).required()


