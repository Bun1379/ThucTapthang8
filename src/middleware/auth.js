const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ EC: -999, DT: null, EM: "Access denied. No token provided." });
  }
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "")
    : null;

  if (!token) {
    return res
      .status(401)
      .json({ EC: -999, DT: null, EM: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    if (decoded && decoded.expires_in > Date.now()) {
      return next();
    }
    else {
      const msPassed = Date.now() - decoded.expires_in;
      const secondsPassed = Math.floor(msPassed / 1000);
      const minutesPassed = Math.floor(secondsPassed / 60);
      let timeString = '';
      if (minutesPassed > 0) {
        timeString = `${minutesPassed} m, ${secondsPassed % 60} s`;
      } else {
        timeString = `${secondsPassed} s`;
      }
      return res
        .status(401)
        .json({
          EC: -999, DT: null,
          EM: `Access denied. Token has expired ${timeString} ago.`
        });
    }
  } catch (error) {
    res.status(400).json({ EC: -999, DT: null, EM: "Invalid token." });
  }
};


module.exports = auth;
