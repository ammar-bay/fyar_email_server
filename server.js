require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
var sha256 = require("js-sha256");

const PORT = process.env.PORT || 3500;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "muhammad.ammar.ibrahim.9064@gmail.com",
    pass: "penvkxixafngjkdy",
  },
});
transporter.verify().then(console.log).catch(console.error);

//Routes
app.use("/", (req, res) => {
  const otp = Math.random().toString().substring(2, 6);
  const email = req.body.email;
  transporter
    .sendMail({
      from: '"Muhammad Ammar Ibrahim" fyar@worldtech.com', // sender address
      to: `${email}`, // list of receivers
      subject: "FYAR OTP ✔", // Subject line
      text: `OTP for your fyar app is ${otp}`, // plain text body
      html: `<b>OTP for your fyar app is ${otp}</b>`, // html body
    })
    .then((info) => {
      console.log({ info });
    })
    .catch(console.error);

  res.send(sha256.sha256(otp));
});

// Server
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);