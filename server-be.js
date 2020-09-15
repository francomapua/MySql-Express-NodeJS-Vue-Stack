const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

var corsOptions = { // For Dev
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Main Router
require("./app/router")(app)
app.use(express.static('dist'))

// Sync DB
const db = require("./app/db/sequelizeDb")
if(db.syncAtStart)
  db.sequelize.sync({ force: db.forceDbClean }) // Force drops and resyncs


// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
}) 