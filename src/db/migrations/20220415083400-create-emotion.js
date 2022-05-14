'use strict';
const { EMOTION_TABLE } = require('../models/emotion.model')
const { DataTypes, Sequelize } = require('sequelize')

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.createTable(EMOTION_TABLE, {
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
    });
  },

  down: async (queryInterface) => {

    await queryInterface.dropTable(EMOTION_TABLE);
  }
};
