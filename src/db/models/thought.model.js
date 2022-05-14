const { Model, DataTypes, Sequelize } = require('sequelize')
const { USER_TABLE } = require('./user.model')
const { EMOTION_TABLE } = require('./emotion.model')

//table name
const THOUGHT_TABLE = 'thoughts'

//table structure
const ThoughtSchema = {
  thoughtId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
    field: 'thought_id'
  },
  thought: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  emotionId: {
    field: 'emotion_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { //relacion foreign key
      model: EMOTION_TABLE, //nombre de la tabla
      key: 'emotion_id'//llave
    }
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { //relacion foreign key
      model: USER_TABLE, //nombre de la tabla
      key: 'user_id'//llave
    }
  }
}

//contains the User model
class Thought extends Model {
  static associate(models) {

    this.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });

    this.belongsTo(models.Emotion, { as: 'emotion', foreignKey: 'emotionId' });

  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: THOUGHT_TABLE,
      modelName: "Thought",
      timestamps: false
    }
  }
}

module.exports = { Thought, ThoughtSchema, THOUGHT_TABLE }