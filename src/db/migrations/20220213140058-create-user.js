'use strict';
const { USER_TABLE } = require('../models/user.model')
const { DataTypes, Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.createTable(USER_TABLE, {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
        type: DataTypes.STRING,
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
    });

    const hash = await bcrypt.hash('123456', 10);
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        email: 'admin@mail.com',
        password: hash,
        role: 'admin',
        create_at: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {

    await queryInterface.dropTable(USER_TABLE);
  }
};
