const nodeMailer = require("nodemailer")

const sendEmail = (emailIds, subject, html, text) => {

    // const ids = ["123ght@gmail.com, 12yuht@gmail.com, opi3ght@gmail.com"];

    let emailString = emailIds.reduce((acc, value) => {
        if (acc == "") {
            return value;
        }
        return acc + ", " + value;
    }, "")

    let transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: "suchit.kumar2146@gmail.com",
            pass: "xfsoujrgjzzcragp"
        }
    });

    let mailDetails = {
        from: "suchit.kumar2146@gmail.com",
        to: emailString,
        subject: subject
    }

    if (html) {
        mailDetails.html = html;
    }

    if (text) {
        mailDetails.text = text;
    }
    // console.log(mailDetails);

    transporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log("unable to send email");
        } else {
            console.log("email sent successfully");
        }
    })
}

module.exports = {
    sendEmail
}