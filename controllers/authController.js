import { StatusCodes } from "http-status-codes";
import User from '../models/userModel.js'
import { createJWT } from '../utils/tokenUtils.js';
import { UnauthenticatedError } from "../errors/customErrors.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";


export const register = async(req, res) => {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
  
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
  
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'user created' });
}


export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
  
    const isValidUser =
      user && (await comparePassword(req.body.password, user.password))
  
    if (!isValidUser) throw new UnauthenticatedError('invalid credentials')
  
    const token = createJWT({ userId: user._id, role: user.role })

    //1 second * 60 seconds = 1 min * 60 = 1hr * 24 = 1 day
    const oneDay = 1000 * 60 * 60 * 24;
    
    res.cookie('token', token, {
    //Cant access token with js on frontend
    httpOnly: true,
    //set equal to JWT token expiration
    expires: new Date(Date.now() + oneDay),
    // HTTP ----> HTTPS
    secure: process.env.NODE_ENV === 'production',
  });

    res.status(StatusCodes.OK).json({ msg: 'user logged in' });
}


export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};