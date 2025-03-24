const { google } = require("googleapis");
const nodeMailer = require("nodemailer");
require('dotenv').config({path : "./config/config.env"})

// ✅ Initialize OAuth2 Client
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

// ✅ Explicitly set refresh token
if (process.env.REFRESH_TOKEN) {
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN, 
    });
} else {
    console.error("❌ REFRESH_TOKEN is missing!");
    process.exit(1); // Stop execution if refresh token is missing
}

// ✅ Function to get access token
const getAccessToken = async () => {
    try {
        console.log("🔍 Fetching Access Token...");
        const { token } = await oAuth2Client.getAccessToken(); // ✅ Fetch access token
        if (!token) throw new Error("Failed to retrieve access token.");
        console.log("✅ Access Token Retrieved:", token);
        return token;
    } catch (error) {
        console.error("❌ Error fetching access token:", error);
        throw error;
    }
};

// ✅ Function to send email
const sendEmail = async ({ email, subject, message }) => {
    try {
        const accessToken = await getAccessToken();

        const transporter = nodeMailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                type: "OAuth2",
                user: process.env.SMTP_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            }
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            html: message,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`📧 Email sent successfully! Message ID: ${info.messageId}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

module.exports = { sendEmail };
