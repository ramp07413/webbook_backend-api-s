const { generateVerificationOtpEmailTemplet } =  require("./emailTemplets");
const { sendEmail } = require("./sendEmail");

async function sendVerificationCode(verificationCode, email, res){

    try {

        const message = generateVerificationOtpEmailTemplet(verificationCode);
        sendEmail({
            email,
            subject : "verification Code (BookLAB)",
            message,
        });
        res.status(200).json({
            succuss : true,
            message : "verification code sent successfully",
        });
        
    } catch (error) {
        res.status(500).json({
            succuss : false,
            message : "verification code failed to send"
        })
    }
}

module.exports = {sendVerificationCode}