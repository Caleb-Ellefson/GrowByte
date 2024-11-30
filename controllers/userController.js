import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Strat from "../models/deviceModel.js"; // Adjust if this should reference a different model
import { NotFoundError, BadRequestError } from "../errors/customErrors.js";

export const getCurrentUser = async (req, res) => {
  try {
    // Handle case where the user is not authenticated
    if (!req.user || !req.user.userId) {
      console.log("No user in request");
      return res.status(StatusCodes.OK).json({ user: null });
    }

    // Fetch user from the database
    const user = await User.findById(req.user.userId);
    if (!user) {
      console.log("User not found in database");
      return res.status(StatusCodes.OK).json({ user: null });
    }

    // Remove sensitive fields
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error fetching current user' });
  }
};

// Admin route: Get application stats
export const getApplicationStats = async (req, res) => {
  try {
    const users = (await User.countDocuments()) || 0;
    const strats = (await Strat.countDocuments()) || 0; // Adjust to match your actual model

    res.status(StatusCodes.OK).json({ users, strats });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error fetching application stats" });
  }
};

// Update user information
export const updateUser = async (req, res) => {
  try {
    const newUser = { ...req.body };

    // Remove sensitive fields
    delete newUser.password;
    delete newUser.role;

    // Optional: Handle avatar upload (commented out for now)
    /*
    if (req.file) {
      const file = formatImage(req.file); // Assuming formatImage is a helper function
      const response = await cloudinary.v2.uploader.upload(file);
      newUser.avatar = response.secure_url;
      newUser.avatarPublicId = response.public_id;
    }
    */

    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser, {
      new: true, // Return the updated document
      runValidators: true, // Validate the update against the schema
    });

    if (!updatedUser) {
      throw new NotFoundError("User not found");
    }

    // Optional: Clean up old avatar if a new one was uploaded
    /*
    if (req.file && updatedUser.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }
    */

    res.status(StatusCodes.OK).json({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error updating user" });
  }
};
