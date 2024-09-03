const { getUser } = require("../_helpers");
const passport = require("../config/passport");

const authenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user)
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    req.user = user;
    next();
  })(req, res, next);
};

const authenticateUser = (req, res, next) => {
  const user = getUser(req);
  if (user && user.role === "user") return next();
  return res.status(403).json({
    status: "error",
    message: "Permission denied!",
  });
};

const authenticateAdmin = (req, res, next) => {
  const user = getUser(req);
  if (user && user.role === "admin") return next();
  return res.status(403).json({
    status: "error",
    message: "Permission denied!",
  });
};

module.exports = {
  authenticated,
  authenticateUser,
  authenticateAdmin,
};
