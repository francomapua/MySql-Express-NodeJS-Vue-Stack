const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const history = require("connect-history-api-fallback");
const app = express();

// CORS
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(history())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("dist"));

// set port, listen for requests
const PORT = config.portFe || 80;
app.listen(PORT, () => {
	console.log(`Frontend Server is running on port ${PORT}.`);
});