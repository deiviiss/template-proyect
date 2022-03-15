const { Model, DataTypes, Sequelize } = require('sequelize')

//table name
const USER_TABLE = 'users'

//table structure
const UserSchema = {
  userId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
    field: 'user_id'
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'active'
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    unique: true,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: Sequelize.DataTypes.STRING
  }
}

//contains the User model
class User extends Model {
  static associate(models) {
    this.hasOne(models.Thought, { as: 'thought', foreignKey: 'userId' })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false
    }
  }
}

module.exports = { User, UserSchema, USER_TABLE }