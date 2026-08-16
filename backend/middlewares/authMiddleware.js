import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Frontend se Authorization header milega:
    // Bearer eyJhbGciOiJIUzI1Ni...

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    // "Bearer TOKEN" me se sirf TOKEN nikal rahe hain
    const token = authHeader.split(" ")[1];

    // Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Logged-in user ki information request me store
    req.user = decoded;

    // Ab next controller execute hoga
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;