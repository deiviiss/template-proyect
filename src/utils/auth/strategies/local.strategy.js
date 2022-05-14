const { Strategy } = require('passport-local');

//service
const AuthService = require('../../../services/auth.service')
const service = new AuthService()

//strategy
const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
    try {

      const user = await service.getUser(email, password, done)

      done(null, user)

    } catch (error) {
      done(false)
    }
  })

module.exports = LocalStrategy