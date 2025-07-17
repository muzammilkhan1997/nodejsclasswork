// import User from "../models/user.mjs";
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer"

// const getAllUsers=async (req,res)=>{
//     try {
//         const users = await User.find();
//         if(users.length > 0){
//             res.json({msg: "showing our users!", users:users})
//         }else{
//             res.status(404).json({msg:"no user found"})
//         }
//         }catch (error){
//             res.status(500).json({msg:error})
//         }
// }

// //Registration / Signup
// const Signup =async(req,res)=>{
//     try{
//         const checkUser = await User.findOne({email:req.body.email});
//         if(checkUser){
//             res.json({msg:"user already exsits"})
//         }else{
//             bcrypt.hash(req.body.password , 15).then (async function (hash){
//                 const newUser = new User({
//                     username: req.body.username,
//                     email:req.body.email,
//                     password:hash,
//                     profilePicture:req.body.profilePicture
//                 })
//                 const addUser= await User.insertOne(newUser);
//                 if(addUser){
//                     res.json ({msg:"signup successsfull", user: addUser})
//                 }else{
//                     res.status(400).json({msg:"failed to register user right now..!"})
//                 }
//             });
//         }
//     }catch(error){
//         res.status(500).json({msg:error})
//     }
// }

// //Login
// let Login= async(req,res)=>{
//     const checkUser = await User.findOne({email:req.body.email});

//     if(!checkUser){
//         res.json({msg:"User does not exists.Please register first"}).status(200);
//     }else{
//         const match = await bcrypt.compare(req.body.password, checkUser.password);

//         if(match){
//             const token= await jwt.sign({email:checkUser.email,role:checkUser.role},process.env.JWT_SECRET,{expiresIn:'2h'})

//             res.json({msg:"User Logged In succesfully", user: checkUser, token:token}).status(200);
//         }
//         else 
//         {
//             res.json({msg:"invalid credentials"}).status(400);
//         }
//     };
// }

// //auth
// const auth = async (req,res,next) => {
//     try{
//         const authHeader = req.headers.authorization;
//         if(!authHeader || authHeader.startsWith('Bearer')){
//             return res.status(401).json({msg:'Authorization token missing or mailformed'});
//         }

//         const token = authHeader.split(' ')[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = decoded;
//         console.log(decoded)
//         next();
//     }catch(error)
//     {
//         console.error(error);
//         res.status(401).json ({msg : 'Invalid or expired token'});
//     }
// }
// // node mailer
// const sendVerification=async(req,res)=>{
//     try{ 
//         const transport = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 587,
//             secure: false, // true for 465, false for 587
//             auth: {
//               user: process.env.EMAIL_USER,
//               pass: process.env.EMAIL_PASSWORD,
//             },
//           });
//     let sendMailStatus = await transport.sendMail({
//         from:`verify email<${process.env.EMAIL_USER}>`,
//         to:req.body.email,
//         subject:'Verify your account',
//         html:`<!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <title>Verify Your Account</title>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               background-color: #f6f9fc;
//               margin: 0;
//               padding: 20px;
//             }
//             .container {
//               max-width: 600px;
//               margin: 0 auto;
//               background: #ffffff;
//               padding: 30px;
//               border-radius: 8px;
//               box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//             }
//             .btn {
//               display: inline-block;
//               background-color: #007bff;
//               color: white;
//               padding: 12px 20px;
//               margin-top: 20px;
//               text-decoration: none;
//               border-radius: 5px;
//             }
//             .footer {
//               margin-top: 30px;
//               font-size: 12px;
//               color: #888;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <h2>Verify Your Account</h2>
//             <p>Hello [User's Name],</p>
//             <p>Thank you for signing up. To complete your registration, please verify your email address by clicking the button below:</p>
//             <a href="[VERIFICATION_LINK]" class="btn">Verify My Account</a>
//             <p>If you did not create an account, you can safely ignore this email.</p>
//             <div class="footer">
//               <p>&copy; [Your Company] — All rights reserved.</p>
//             </div>
//           </div>
//         </body>
//         </html>
//         `
//     });
//     if(sendMailStatus){
//         res.status(200).json({msg:'Email sent successfully'})
//     }
//     else{
//         res.status(400).json({msg:'failed not sent'})

// }
//  }

// catch (error){
//     res.status(500).json({msg:error})
// }
// }

// let ChangeActivationStatus = async (req,res)=>{
//     try{
//         const id = req.params.id;
//         let newStatus= req.params.status;
//         console.log(newStatus);
//         if(newStatus == "active"){
//             newStatus = true;
//         }else if (newStatus =="deactive"){
//             newStatus = false;

//         }else {
//             newStatus = true
//         }
//         const changeActivationStatus = await User.updateOne({_id:id},
//         {isActive:newStatus});
//         if(!changeActivationStatus){
//             res.json({msg :"failed to update status right now"}).status(200);
//         }
//         else{
//             res.json({msg :"User status updated successfully"}).status(200);
//         };

//     }catch(error){
//         console.log(error)
//         res.json({msg:error})
//     }
    
// }

// const userController ={getAllUsers,Signup,Login,auth ,sendVerification,ChangeActivationStatus}

// export default userController
import User from "../models/user.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Send OTP Helper
const sendOTPEmail = async (email, otp) => {
  const transport = nodemailer.createTransport({
    host: "muzammilkhan20010407.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transport.sendMail({
    from: `Verify OTP <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: `
      <h2>Email Verification</h2>
      <p>Your OTP is: <strong>${otp}</strong></p>
      <p>This OTP is valid for 1 minute.</p>
    `
  });
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) {
      res.json({ msg: "Showing all users!", users });
    } else {
      res.status(404).json({ msg: "No user found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Registration / Signup with OTP
const Signup = async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
      return res.json({ msg: "User already exists" });
    }

    bcrypt.hash(req.body.password, 15).then(async (hash) => {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date(Date.now() + 1 * 60 * 1000); // 1 minute

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        profilePicture: req.body.profilePicture,
        otp,
        otpExpiry,
        isVerified: false,
      });

      const savedUser = await newUser.save();

      await sendOTPEmail(req.body.email, otp);

      res.json({ msg: "Signup successful. OTP sent to email", userId: savedUser._id });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// OTP Verification
const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.isVerified) return res.json({ msg: "User already verified" });

    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ msg: "OTP verified. Account activated." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Login
const Login = async (req, res) => {
  const checkUser = await User.findOne({ email: req.body.email });

  if (!checkUser) {
    return res.status(200).json({ msg: "User does not exist. Please register." });
  }

  const match = await bcrypt.compare(req.body.password, checkUser.password);

  if (match) {
    if (!checkUser.isVerified) {
      return res.status(401).json({ msg: "Please verify your account first via OTP." });
    }

    const token = jwt.sign(
      { email: checkUser.email, role: checkUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({ msg: "User Logged In successfully", user: checkUser, token });
  } else {
    res.status(400).json({ msg: "Invalid credentials" });
  }
};

// Auth Middleware
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

// Change Activation Status
const ChangeActivationStatus = async (req, res) => {
  try {
    const id = req.params.id;
    let newStatus = req.params.status;

    newStatus = newStatus === "active" ? true : false;

    const update = await User.updateOne({ _id: id }, { isActive: newStatus });
    if (!update) {
      return res.status(200).json({ msg: "Failed to update status" });
    }

    res.status(200).json({ msg: "User status updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Send Verification Email (HTML format)
const sendVerification = async (req, res) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const sendMailStatus = await transport.sendMail({
      from: `verify email <${process.env.EMAIL_USER}>`,
      to: req.body.email,
      subject: 'Verify your account',
      html: `<!DOCTYPE html>
        <html><head><meta charset="UTF-8"><title>Verify Your Account</title>
        <style>
          body { font-family: Arial; background-color: #f6f9fc; padding: 20px; }
          .container { max-width: 600px; background: #fff; padding: 30px; border-radius: 8px; }
          .btn { background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; }
          .footer { margin-top: 30px; font-size: 12px; color: #888; }
        </style></head>
        <body><div class="container"><h2>Verify Your Account</h2>
        <p>Hello [User's Name],</p>
        <p>Thank you for signing up. Click below to verify your email:</p>
        <a href="[VERIFICATION_LINK]" class="btn">Verify My Account</a>
        <p>If you didn’t request this, ignore this email.</p>
        <div class="footer"><p>&copy; Your Company</p></div></div></body></html>`
    });

    if (sendMailStatus) {
      res.status(200).json({ msg: 'Email sent successfully' });
    } else {
      res.status(400).json({ msg: 'Failed to send email' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Export controller
const userController = {
  getAllUsers,
  Signup,
  verifyOTP,
  Login,
  auth,
  sendVerification,
  ChangeActivationStatus,
};

export default userController;
