const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, title, location, bio, skills } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // hash password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 5);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing",
        error: err.message
      });
    }

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      title: title || "",
      location: location || "",
      bio: bio || "",
      skills: Array.isArray(skills) ? skills : []
    });

    res.status(200).json({
      success: true,
      message: "Signup successful",
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Signup failed",
      error: err.message
    });
  }
};


//LOGIN        .............@@@@@

exports.Login = async(req, res)=>{
try{
  const{email,password} = req.body;

  if(!email || !password){
   return res.status(400)
   .json({
        success:false,
        message:"Please Fill all the entries",
      
     });
  }
  let existingUser = await User.findOne({email});
  if(!existingUser){
    return  res.status(401)
     .json({
        success:false,
        message:"Email is not signed in"
     });
  }

  const payload = {
   email:existingUser.email,
   id:existingUser._id,
  }
  //verify Password
  if(await bcrypt.compare(password,existingUser.password)){
  let token = jwt.sign(payload, process.env.JWT_SECRET,
   {
      expiresIn:"2h",
   });
   
   existingUser = existingUser.toObject();
   existingUser.token = token;
   existingUser.password = undefined;
   

   const options = {
      expires: new Date (Date.now() +3 * 24 * 60 * 60 * 1000),
      httpOnly:true
   }

   res.cookie("token",token,options).status(200)
     .json({
        success:true,
        token,
        existingUser,
        message:"User Logged IN"
     });
  }

  else{
    return res.status(403)
     .json({
        success:false,
        message:"Incorrect Password"
     });
  }
}

catch(err){
     console.error(err);
     return res.status(404)
     .json({
        success:false,
        data:"error hai bro",
     });

}
}


// Get logged-in user's profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// Update profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { title, location, bio, skills } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { title, location, bio, skills },
      { new: true }
    ).select("-password");

    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


