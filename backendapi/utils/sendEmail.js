const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `
    <!DOCTYPE html>
    <html>
    
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
    
        .container {
          background-color: #f5f5f5;
          width: 40rem;
          height: 18rem;
          padding: 20px;
          border-width: 2px;
          border-radius: 5px;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
    
        h1 {
          color: #eddb8e;
          font-weight: 700;
        }
    
        h2 {
          color: #141414;
        }
    
        .button {
          width: 10rem;
          height: 3rem;
          background-color: #141414;
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-width: 2px;
          border-radius: 6px;
          text-decoration: none;
        }
    
        .button:hover {
          background-color: #eddb8e;
          color: #141414;
          outline: none;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <h1>${options.subject}</h1>
        <h2>${options.message}</h2>
        <a href="${options.url}" class="button">CLICK HERE</a>
      </div>
    </body>
    
    </html>
        `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
