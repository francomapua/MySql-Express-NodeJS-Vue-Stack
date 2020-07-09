module.exports = {
  HOST: "localhost",
  USER: "username",
  PASSWORD: "password",
  DB: "db",
  dialect: "mysql",
  syncAtStart : false,
  forceDbClean : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
