const dbConfig = require("../config/db.config.js")
const Sequelize = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.syncAtStart = dbConfig.syncAtStart 
db.forceDbClean = dbConfig.forceDbClean 

// Models
db.tutorials = require("../modules/tutorial/tutorial.model")(sequelize, Sequelize)
db.users = require("../modules/user/user.model")(sequelize, Sequelize)

module.exports = db