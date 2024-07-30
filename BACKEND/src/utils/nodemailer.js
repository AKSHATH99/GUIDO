import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Replace with your provider's SMTP server
  port: 587, // Port may vary depending on your provider
  secure: false, // Use true for TLS, false for non-TLS (consult your provider)
  auth: {
    user: "akshathpkk@gmail.com", // Replace with your email address
    pass: "rkld sxhr pcnn kfyn", // Replace with your email password
  },
});

const sendEmail = async (to , text ) => {
  const mailOptions = {
    from: "akshathpkk@gmail.com", // Replace with your email address
    to:to, // Replace with the recipient's email address
    subject: "Mentorship Request from a Student ", // Replace with your desired subject
    text: text, // Plain text content
    // or
  };
  console.log("AT SENDMAIL")
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export {sendEmail};