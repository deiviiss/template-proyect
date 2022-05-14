'use strict';
const { THOUGHT_TABLE } = require('../models/thought.model')
const { DataTypes } = require('sequelize')

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.changeColumn(THOUGHT_TABLE, 'thought', {
      type: DataTypes.TEXT
    });
  },

  down: async (queryInterface) => {

    await queryInterface.changeColumn(THOUGHT_TABLE, 'thought', {
      type: DataTypes.STRING
    });
  }
};
