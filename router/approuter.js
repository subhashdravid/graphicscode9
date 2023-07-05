const approuter = require("express").Router();
import { createTransport } from "nodemailer";
// contact
approuter.post("/contact", async (req, res) => {
  try {
    const { email, name, number, message } = req.body;

    if(!email || !name || !number || !message){
        res.render("error", {
            message: "please fill all the data ...",
          });
          return
    }
    const transporter = createTransport({
      service: "Gmail",
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });
    // Set up your email transporter options (e.g., SMTP, Gmail)

    const mailOptions = {
      from: email,
      to: process.env.email,
      subject: "contact from graphicscode client",
      text: `hello -- 
      our phone number is :: ${number} \n
      my name is ${name} \n and email is ${email}
      message :: \n \t ${message}`,
    };
    await transporter.sendMail(mailOptions);

    res.render("error", {
      message: "mail send successfully ...",
    });
    //
  } catch (error) {
    res.render("error", {
      message:
        "mail not send some problem accure contact us on different platform",
    });
  }
});

// Define a route for the homepage
approuter.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.render("error", {
      message: "internal server error",
    });
  }
});

//   404 page not found
approuter.get("/*", (req, res) => {
  res.render("error", {
    message: "404 page not found",
  });
});

export default approuter;
