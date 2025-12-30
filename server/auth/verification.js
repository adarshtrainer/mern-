import jwt from "jsonwebtoken";

export const authorize = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(400)
      .json({ success: false, message: "NO token, Please login." });
  }

  try {
    const token = authToken.split(" ")[1];

    // Token verification
    const decodedToken = jwt.verify(token, process.env.JWT_token);

    req.userId = decodedToken.id;
    req.role = decodedToken.role;
    req.name = decodedToken.name;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token experied" });
    } else {
      console.log(error);
      return res.status(500).json({ success: false, message: " server error" });
    }
  }
};

export const restrict = (role) => (req, res, next) => {
  try {
    const userRole = req.role;

    if (userRole === "admin" && role.includes("admin")) {
      next();
    } else if (userRole === "user" && role.includes("user")) {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Access Denied...!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
