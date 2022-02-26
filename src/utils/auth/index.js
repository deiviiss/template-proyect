const passport = require('passport')

//strategy (local - twwiter - google)
const LocalStrategy = require('./strategies/local.strategy')
const JwtStrategy = require('./strategies/jwt.strategy')

passport.use(LocalStrategy)
passport.use(JwtStrategy)