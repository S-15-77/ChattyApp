const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req,res,next) =>{
    // console.log(req.body);

    try{

    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({username});
    if (usernameCheck){
        return res.json({msg: "Username already exists",status: false});
        
    }
    const emailCheck = await User.findOne({email});
    if(emailCheck){
        return res.json({msg: "Email already exists",status: false});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        email,username,password:hashedPassword,
    });
    delete user.password;
    return res.json({status : true,user});
    }
    catch(e){
        next(e);
    }
};


module.exports.login = async (req,res,next) =>{
    // console.log(req.body);

    try{

    const { username, password } = req.body;
    const user = await User.findOne({username});
    if (!user){
        // console.log("Username doesn't exist");
        return res.json({msg: "Username doesn't exist",status: false});
        
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    // console.log(isPasswordValid);
    if(isPasswordValid == false){
        // console.log(isPasswordValid);
        return res.json({msg: "Password is Incorrect",status: false});
        
    }
    delete user.password;
    return res.json({status : true,user});
    }
    catch(e){
        next(e);
    }
};

module.exports.setAvatar = async (req,res,next) =>{
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImgSet : true,
            avatarImage,
        });
        return res.json({isSet : userData.isAvatarImgSet ,image:userData.avatarImage});
    }catch(e){
        next(e);
    }
}


module.exports.getAllUsers = async (req,res,next) =>{
    try{
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "email","username","avatarImage","_id",
        ]);
        return res.json(users);
    }catch(e){
        next(e);
    }
};