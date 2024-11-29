import { StatusCodes } from "http-status-codes";
import User from '../models/userModel.js'
import Strat from '../models/deviceModel.js'


export const getCurrentUser = async (req, res) => {
    //Find user in Database
    const user = await User.findOne({ _id: req.user.userId });
    //Convert userdata to JSON and remove password
    const userWithoutPassword = user.toJSON();
    //return user JSON object
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
  };


//ADMIN ROUTE
  export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const strats = await Strat.countDocuments();
    res.status(StatusCodes.OK).json({ users, strats });
  };

  export const updateUser = async (req, res) => {
    //previous user data
    const newUser = { ...req.body };
    //remove password
    delete newUser.password;
    //remove role
    delete newUser.role;
  
    //avatar ICON
    // if (req.file) {
    //   const file = formatImage(req.file);
    //   const response = await cloudinary.v2.uploader.upload(file);
    //   newUser.avatar = response.secure_url;
    //   newUser.avatarPublicId = response.public_id;
    // }
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
  
    
    // if (req.file && updatedUser.avatarPublicId) {
    //   await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    // }
  
    res.status(StatusCodes.OK).json({ msg: 'update user' });
  };