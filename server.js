const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

var corsOptions = {
  origin: "http://localhost:8081"
}


app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
require("./app/routes/tutorial.routes.js")(app)

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." })
})

// Sync DB
const db = require("./app/models")
if(db.syncAtStart)
  db.sequelize.sync({ force: db.forceDbClean }) // Force drops and resyncs


// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
}) 