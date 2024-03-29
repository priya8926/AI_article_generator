const nodemailer = require("nodemailer")

const sendEmail = async(options) =>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: false, // upgrade later with STARTTLS and remove this line
        service : "gmail",
        auth:{
            user : "priyapatel.892002@gmail.com",
            pass : "PriyaPatel"
        }
    })
    const mailOptions = {
        from : "priyapatel.892002@gmail.com",
        to : options.email,
        subject : options.subject,
        text : options.text
    }
    await  transporter.sendMail(mailOptions)
}

module.exports = sendEmail