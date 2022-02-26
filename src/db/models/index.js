const { User, UserSchema } = require('./user.model')

function setupModels(sequelize) {

  //init models
  User.init(UserSchema, User.config(sequelize))

  //execute methods of associations
  // User.associate(sequelize.models)

}

module.exports = setupModels