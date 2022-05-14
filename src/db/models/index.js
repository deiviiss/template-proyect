const { User, UserSchema } = require('./user.model')
const { Thought, ThoughtSchema } = require('./thought.model')
const { Emotion, EmotionSchema } = require('./emotion.model')

function setupModels(sequelize) {

  //init models
  User.init(UserSchema, User.config(sequelize))
  Thought.init(ThoughtSchema, Thought.config(sequelize))
  Emotion.init(EmotionSchema, Emotion.config(sequelize))

  //execute methods of associations
  User.associate(sequelize.models)
  Thought.associate(sequelize.models)
  Emotion.associate(sequelize.models)

}

module.exports = setupModels