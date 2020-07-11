module.exports = (app) => {
	const users = require("./user.controller");

	var router = require("express").Router();

	// Create a new Tutorial
	router.post("/", users.create);

	// Login
	router.post("/login", users.login);

	// Logout
	router.post("/logout", users.logout);

	// Retrieve all users
	router.get("/", users.findAll);

	// Retrieve a single Tutorial with id
	router.get("/:id", users.findOne);

	// Update a Tutorial with id
	router.put("/:id", users.update);

	// Delete a Tutorial with id
	router.delete("/:id", users.delete);

	app.use("/api/users", router);
};
