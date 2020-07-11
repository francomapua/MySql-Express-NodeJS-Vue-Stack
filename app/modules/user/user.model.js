module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    salt: {
      type: Sequelize.STRING
    },
    hash: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    tokenString: {
      type: Sequelize.STRING
    },
    tokenExpiry: {
      type: `DATETIME`
    }
  }, {underscored : true})

  return User
}