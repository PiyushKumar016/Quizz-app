import UserModel from "../models/user-model.js";

export const register = async (userObject) => {
  const { name, email, password } = userObject || {};

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  const existingUser = await UserModel.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new Error("User already exists");
  }

  await UserModel.create({
    name: name.trim(),
    email: normalizedEmail,
    password: password.trim(), 
    role: "user",
  });

  return "User Registered Successfully";
};

export const login = async (userObject) => {
  if (!userObject?.email || !userObject?.password) {
    throw new Error("Email and Password are required");
  }

  const email = String(userObject.email).trim().toLowerCase();
  const password = String(userObject.password).trim();

  const user = await UserModel.findOne({ email, password });

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  return {
    message: "Login Successful",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};