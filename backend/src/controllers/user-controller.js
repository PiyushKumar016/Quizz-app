import {
  register as registerUser,
  login as loginUser,
} from "../services/user-service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    const obj = await loginUser({ email, password });

    res.status(200).json(obj);
  } catch (err) {
    res.status(400).json({
      message: err.message || "Login Failed",
    });
  }
};

export const register = async (req, res) => {
  try {
    const message = await registerUser(req.body);

    res.status(200).json({ message });
  } catch (err) {
    res.status(400).json({
      message: err.message || "Register Failed",
    });
  }
};

export const profile = async (req, res) => {
  res.json({ message: "Profile working 🚀" });
};