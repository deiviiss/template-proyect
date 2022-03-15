'use strict';
const { THOUGHT_TABLE } = require('../models/thought.model')
const { DataTypes, Sequelize } = require('sequelize')
const { USER_TABLE } = require('../models/user.model')

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.createTable(THOUGHT_TABLE, {
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
        type: DataTypes.STRING,
      },
      createAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      },
      // emotionId: {
      //   field: 'emotion_id',
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      //   references: { //relacion foreign key
      //     model: EMOTION_TABLE, //nombre de la tabla
      //     key: 'emotion_id'//llave
      //   }
      // },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { //relacion foreign key
          model: USER_TABLE, //nombre de la tabla
          key: 'user_id'//llave
        }
      }
    });
  },

  down: async (queryInterface) => {

    await queryInterface.dropTable(USER_TABLE);
  }
};
