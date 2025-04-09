const verifyEmail = async(email, link) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth:{
                user: process.env.USER,
                pass: process.env.PASSWORD,
            },
        });
        // SEND MAIL
        let info = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "Account Verification",
            text:"Welcome",
            html: `
            <div>
            <a href=${link}>Click here to verify your account.</a>
            </div>`
        });
        console.log("Mail Sent Successfully...")
    } catch (error) {
        console.log(error);
        console.log("Mail failed to send!")
    }
}

module.exports = verifyEmail