const { Sequelize } = require('sequelize')

//enviroment
const { config } = require('./../config')
//models
const setupModels = require('./../db/models/index')
//conection to bd
const URI = config.dbUrl

const options = {
  dialect: 'mysql'
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(URI, options);

//setup de los modelos
setupModels(sequelize)

module.exports = sequelize