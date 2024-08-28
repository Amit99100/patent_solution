const nodemailer = require('nodemailer');

const emailUser = "akm1632456@gmail.com";
// const pass = "Rack@191170";
const pass = "zqlwpjjqbqwofdbg"; // came by creating the nodemailer app , in google 
//https://stackoverflow.com/questions/60701936/error-invalid-login-application-specific-password-required  for more info 


module.exports = async (email, subject, text) => {

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



        const mailOptions = {
            from: emailUser,
            to: email,
            subject: subject,
            html: text,
        };



        await transporter.sendMail(mailOptions);
        console.log("mail send successfully ");
    } catch (error) {
        console.log("Error not sending email:", error.message);
    }

}