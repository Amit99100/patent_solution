

const User = require("../models/user");
const nodemailer = require('nodemailer');
const randomString = require('randomstring');
require('dotenv').config();
const emailUser ="some@gmail.com" ; 
const pass ="something" ; // came by creating the nodemailer app , in google 
//https://stackoverflow.com/questions/60701936/error-invalid-login-application-specific-password-required  for more info 

const sendResetPasswordMail = async (name, email, token) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: emailUser,
                pass: pass,
            }
        });



        // const mailOptions = {
        //     from: emailUser,
        //     to: email,
        //     subject: "For Reset Password",
        //     html: '<p>Hi ' + name + ', please copy the link <a href="' + process.env.FRONTEND_URL + '/api/reset-password?token=' + token + '"> and reset your password</a></p>'
        // };

        const mailOptions = {
            from: emailUser,
            to: email,
            subject: "Reset Your Password",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Forgot Your Password?</h2>
                    <p>Hello ${name},</p>
                    <p>We received a request to reset your password. Please COPY the following link to reset it:</p>
                    <p style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
                        <a href="${process.env.BACKEND_URL}/api/reset-password?token=${token}" 
                           style="display: inline-block; background-color: #007bff; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px;">
                            Copy This link and paste in Browser
                        </a>
                    </p>
                    <p>If you did not request a password reset, please ignore this email.</p>
                    <p>Thank you,</p>
                    <p>Your Company Name</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("mail send ");
    } catch (error) {
        console.log("Error sending email:", error.message);
    }
}

const forgetpassword = async (req, res) => {
    try {
        const email = req.body.email;
        const userdata = await User.findOne({ email: email });

        if (userdata) {
            const randomstring = randomString.generate();
            await User.updateOne({ email: email }, { $set: { token2: randomstring } });

            await sendResetPasswordMail(userdata.name, userdata.email, randomstring);
            res.status(200).send({ success: true, msg: "Please check your inbox to reset your password." });
        } else {
            res.status(404).send({ success: false, msg: "User does not exist." });
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message });
    }
}

module.exports = { forgetpassword };
