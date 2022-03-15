const { User, UserSchema } = require('./user.model')
const { Thought, ThoughtSchema } = require('./thought.model')

function setupModels(sequelize) {

  //init models
  User.init(UserSchema, User.config(sequelize))
  Thought.init(ThoughtSchema, Thought.config(sequelize))
  //execute methods of associations
  User.associate(sequelize.models)
  Thought.associate(sequelize.models)

}

module.exports = setupModels