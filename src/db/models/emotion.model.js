const { Model, DataTypes, Sequelize } = require('sequelize')

//table name
const EMOTION_TABLE = 'emotions'

//table structure
const EmotionSchema = {
  emotionId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
    field: 'emotion_id'
  },
  emotion: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'no-emotion'
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    unique: true,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

//contains the User model
class Emotion extends Model {
  static associate(models) {

    this.hasOne(models.Thought, { as: 'thought', foreignKey: 'thoughtId' })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: EMOTION_TABLE,
      modelName: "Emotion",
      timestamps: false
    }
  }
}

module.exports = { Emotion, EmotionSchema, EMOTION_TABLE }