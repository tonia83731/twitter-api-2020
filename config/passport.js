const passport = require("passport");
const LocalStrategy = require("passport-local");

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const bcrypt = require("bcryptjs");
const { User } = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "account",
      passwordField: "password",
      passReqToCallback: true, // 如果需要在 verify callback 中取得 req
    },
    // 因為上面有註明 passReqToCallback: true，所以第一個參數會是 req
    async (req, account, password, done) => {
      const user = await User.findOne({
        where: { account },
      });
      if (!user) {
        const err = new Error("帳號不存在!");
        err.status = 404;
        throw err;
      }
      const comparedPassword = await bcrypt.compare(password, user.password);
      if (!comparedPassword) {
        const err = new Error("帳號或密碼錯誤!");
        err.status = 401;
        throw err;
      }
      return done(null, user);
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findByPk(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findByPk(id);
    const userData = user.toJSON();
    return done(null, userData);
  } catch (error) {
    return done(error);
  }
});
module.exports = passport;
