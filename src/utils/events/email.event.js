import { EventEmitter } from "node:events";
import { nanoid, customAlphabet } from "nanoid";
import { sendEmail, subjectTypes } from "../email/send.email.js";
import { verificationEmailTemplate } from "../email/template/verfication.email.js";
import { generateHash } from "../security/hash.security.js";
import userModel from "../../DB/model/user.model.js";

export const emailEvent = new EventEmitter({});

const sendCode = async ({data, subject = subjectTypes.confirmEmail} = {}) => {
    const {id, email} = data;
    const otp = customAlphabet("0123456789", 4)();
    const html = verificationEmailTemplate({code: otp});
    const text = `Your verification code is: ${otp}`;
    const hash = generateHash({plainText: otp});
    const OTPExpiry = Date.now() + 10 * 60 * 1000;

    let dataUpdate = {};
    switch (subject) {
        case subjectTypes.resetPassword:
            dataUpdate = {
        forgetPasswordOTP: hash,
        OTPExpiry: new Date(OTPExpiry)};

            break;
        default:
            break;
    }

    await userModel.update(
    dataUpdate,
    { where: { id } }
    );

    await sendEmail({
        to: email,
        subject,
        text,
        html
    });

    console.log("Email sent");
}

emailEvent.on("sendForgetPassword", async (data) => {
    await sendCode({data, subject: subjectTypes.resetPassword});
    console.log("Password reset email sent");
});



