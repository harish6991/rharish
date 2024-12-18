const db = require("../models");
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const {sendConfrimationEmail} = require("../utils/helpers");
const User = db.users;
const Role = db.roles;
const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncError = require("../middleware/catchAsyncError");


exports.singup =  CatchAsyncError(async (req,res,next)=>{
  const token = jwt.sign({email: req.body.email}, process.env.PASSWORD_SECRET)
  const isEmail = (input) => /\S+@\S+\.\S+/.test(input);
  const isPhoneNumber = (input) => /^\d+$/.test(input);

  // checking wheater user have sign up using emal or via phone number
  if(isEmail(req.body.user)){
    const bytesNeeded = Math.ceil((22 * 3) / 4);
    const emailConfimationToken = crypto.randomBytes(bytesNeeded).toString('base64url').slice(0, 22);
    let username = req.body.user.split('@')[0]
    const user = new User({username:username,email:req.body.user,phone:null,password:bcrypt.hashSync(req.body.password,8),confirmationCode:emailConfimationToken});
    try{

      await user.save();
       if (req.body.roles){
          const roles = await Role.find({ name: { $in: req.body.roles } });
          user.roles = roles.map(role => role._id);
          await user.save();
       }
       else{
         const guestRole = await Role.findOne({ name: 'guest' });
         user.roles = [guestRole._id];
         await user.save();
       }
       sendConfrimationEmail(username, req.body.user, emailConfimationToken);
       return res.status(201).send({ message: "User was registered successfully! Please check your email" });
    }
    catch(err){
      console.error('Error fetching roles:', err);
      return next(new ErrorHandler(err,500));
    }
  }
  else if(isPhoneNumber(req.body.user)){
    const bytesNeeded = Math.ceil((22 * 3) / 4);
    const confirmation_token = crypto.randomBytes(bytesNeeded).toString('base64url').slice(0, 22);
    console.log(confirmation_token)
    return res.send({message:`The Otp Service coming soon`})
  }
  else {
    // checking for invalid Phone or email
    return next(new ErrorHandler("Invalid email or phone number", 400));
  }
})



exports.verifyUser = CatchAsyncError(async (req, res, next) => {
  try {

    const user = await User.findOne({ confirmationCode: req.params.confirmationCode });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    user.status = "Active";
    await user.save();
    return res.status(200).send({ message: "Thanks for confirming the email!" });
  } catch (err) {

    console.error('Error during user verification:', err);
    return next(new ErrorHandler("Error confirming email", 500));
  }
});
