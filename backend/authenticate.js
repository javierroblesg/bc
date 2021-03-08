//passport and jsonwebtoken
//const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

const db = require('./database/index');
//const { authenticate } = require('passport');
const User = db.models.User;

require('dotenv').config();

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.REFRESH_TOKEN_SECRET;
jwtOptions.passReqToCallback = true;

// getUser function
const getUser = async obj => {
  try {
    return await User.findOne({
      where: obj,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

// Web token strategy
let strategy = new JwtStrategy(jwtOptions, async function (req, jwt_payload, next) {
  //console.log('payload received', jwt_payload);
  const user = await getUser({ id: jwt_payload.id });
  if (user) {
    let userModules = JSON.parse(user.modules);
    let moduleToAccess = req.query.module;
    if (userModules[moduleToAccess] === 2) {
      req.query.user_id = jwt_payload.id;
      req.query.canEdit = true;
      next(null, user);
    } else if (userModules[moduleToAccess] === 1) {
      req.query.user_id = jwt_payload.id;
      req.query.canEdit = false;
      next(null, user);
    } else {
      next(null, false);
    }
  } else {
    next(null, false);
  }
});

passport.use(strategy);

exports.jwtOptions;
exports.verifyUser = passport.authenticate('jwt', {session: false});