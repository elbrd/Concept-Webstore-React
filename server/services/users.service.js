import User from "../models/users.model.js";

// Get user
export const getUser = async (email) => {
  try {
    const result = await User.findOne({ email });

    if (result) {
      return {
        success: true,
        user: result,
      };
    } else throw new Error("User not found");
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Register user
export const registerUser = async (newUser) => {
  try {
    const result = await User.create(newUser);

    if (result) {
      return {
        success: true,
        user: result,
      };
    } else throw new Error("Failed to register user");
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
