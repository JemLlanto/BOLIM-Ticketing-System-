const user_service = require("../services/user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "24h";

const login = async (req, res) => {
  try {
    const { user_name, password } = req.body;

    // Validate input
    if (!user_name || !password) {
      return res.json({
        success: false,
        message: "Username and password are required.",
      });
    }

    // Find user
    const user = await user_service.find(user_name);
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // DEBUG: Log to see what fields the user has
    // console.log("User object:", user.username);
    // console.log("Password from request:", password);
    // console.log("PasswordHash from DB:", user.password);

    // Check if passwordHash exists
    if (!user.password) {
      console.error("User found but passwordHash is missing!");
      return res.json({
        success: false,
        message: "Account configuration error",
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // console.log("Generating jwt for user: ", user.id);
    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        // username: user.username,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    // Send token to frontend
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Middleware to verify JWT
const authenticateToken = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
    // console.log("Token: ", token);

    if (!token) {
      console.log("Access token required.");
      return res
        .status(401)
        .json({ success: false, message: "Access token required." });
    }

    // VERIFICATION AND DECODING OF TOKEN
    const decoded = jwt.verify(token, JWT_SECRET);

    // EXTRACTING USER IS IN DECODED TOKEN
    const userId = decoded.id;
    // console.log("DecodedID: ", userId);

    // USING DECODED ID FOR FINDING USER
    const user = await user_service.find_by_id(userId);

    if (!user) {
      console.log("User not found.");
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const { password, ...userWithoutPassword } = user;

    // console.log("User: ", user);

    return res.status(200).json({
      success: true,
      data: {
        id: user.id,
        user_name: user.user_name,
        is_admin: user.is_admin,
      },
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Token." });
    }
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token Expired." });
    }
    console.error("Token Verification Error: ", error);
    res.status(500).json({ success: false, message: "Server Error." });
  }
};

module.exports = {
  login,
  authenticateToken,
};
