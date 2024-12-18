const nodemailer = require("nodemailer");
const dotenv = require('dotenv')

dotenv.config()

const user = process.env.EMAIL_HOST_USER;
const pass = process.env.EMAIL_HOST_PASSWORD;

// Function to send email
// async function sendEmail(to, subject, text) {
//   try {
//     // Create a transporter object using your email service and credentials
//     let transporter = nodemailer.createTransport({
//       service: 'gmail', // Use any supported email service (e.g., Gmail, Outlook, etc.)
//       auth: {
//         user: 'your-email@gmail.com', // Your email
//         pass: 'your-email-password'   // Your email password or app password if 2FA is enabled
//       }
//     });
//
//     // Define email options
//     let mailOptions = {
//       from: 'your-email@gmail.com', // Sender address
//       to: to,                       // Recipient address
//       subject: subject,             // Subject line
//       text: text                    // Plain text body
//     };
//
//     // Send the email
//     let info = await transporter.sendMail(mailOptions);
//     console.log(`Email sent: ${info.response}`);
//   } catch (error) {
//     console.error(`Error sending email: ${error}`);
//   }
// }
//
// Example usage
// sendEmail('recipient@example.com', 'Test Subject', 'Hello! This is a test email.');




const sendEmail = async (emailOptions) => {
  try{
    let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: user,
          pass: pass
        }
    })


    let mailOptions = {
      from:user ,
      to: emailOptions.to,
      subject: emailOptions.subject,
      html: emailOptions.html
    };
    let info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);

  }
  catch (error) {
    console.error(`Error sending email: ${error}`);
  }

};


module.exports = {
    sendConfrimationEmail:async function(name,email,confirmationCode){

      await sendEmail({
        to:email,
        subject:"Please Confirm Your Account",
        html:`<h1>Email Confirmation</h1>
              <h2>Hello ${name}</h2>
              <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
              <a href=https://rharish.in/api/auth/confirm/${confirmationCode}> Click here</a>
              `
      })


    }

}
