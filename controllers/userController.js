const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {attachCookiesToResponse, createTokenUser, checkPermissions} = require('../utils')

const getAllUsers = async (req,res)=>{
    console.log(req.user)
    const user = await User.find({role:'employer'}).select('-password')
    res.status(StatusCodes.OK).json({user,num: user.length})
}
const getSingleUser = async (req,res)=>{
    const user = await User.findOne({_id:req.params.id}).select('-password')
    checkPermissions(req.user,user._id)
    res.status(StatusCodes.OK).json({user})
}
const showCurrentUser = async (req,res)=>{
    res.status(StatusCodes.OK).json({user:req.user})
}

  const updateAUser = async (req,res)=>{
    const { email, name } = req.body;
    if (!email || !name) {
      throw new CustomError.BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ _id: req.user.userId });
  
    user.email = email;
    user.name = name;
  
    await user.save();
  
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
  
  
  }
  
const updateUserPassword = async (req,res)=>{
    const { oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError('enter both fields')
    }
    const user = await User.findOne({_id: req.user.userId})

    const isPasswordCorrect = await user.comparePassword(oldPassword)

    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('old-password is incorrect')
    }
    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({msg:'successful changed password'})
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateAUser,
    updateUserPassword,
  };
