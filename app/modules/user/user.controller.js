const db = require("../../db/sequelizeDb");
const Crypto = require("../../utils//crypto/Crypto");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
	const username = req.body.username,
		password = req.body.password,
		role = req.body.role;

	if (!password || !username || !role) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		return;
	}

	// Generate a Hash and a Salt
	const { salt, hash } = Crypto.encryptPassword(password);

	// Check for duplicates
	User.findOne({ where: { username } })
		.then((data) => {
			if (data && data.id)
				throw new Error(`User with username ${username} alread exists`);
			else return User.create({ username, salt, hash, role });
		})
		.then((data) => {
			res.send({ id: data.id });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the User.",
			});
		});
};

// Login
exports.login = (req, res) => {
	const username = req.body.username,
		password = req.body.password;

	if (!username || !password) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		return;
	}
	var tokenObject;

	User.findOne({ where: { username } })
		.then((user) => {
			if (!user || !user.hash || !user.salt)
				throw new Error(`Invalid Username or Password`);
			const hash = Crypto.hashPassword(user.salt, password);
			if (hash !== user.hash) throw new Error(`Invalid Username or Password`);
			tokenObject = Crypto.generateToken();
			return User.update(tokenObject, { where: { id: user.id } });
		})
		.then((rowsUpdated) => {
			if (rowsUpdated == 1) {
				res.send({
					token: tokenObject.tokenString,
				});
			} else {
				throw new Error(`Could not log you in`);
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Users.",
			});
		});
};

// Logout
exports.logout = (req, res) => {
	const username = req.body.username;

	if (!username) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		return;
	}

	User.findOne({ where: { username } })
		.then((user) => {
			if (!user || !user.tokenString){
				res.status(400).send({
					message: "User is already logged out.",
				});
			}
			else {
				return User.update(
					{ tokenString: null, tokenExpiry: null },
					{ where: { id: user.id } }
				)
				.then((rowsUpdated) => {
					if (rowsUpdated == 1) {
						res.send({ message: `Logged out successfully` });
					} else {
						throw new Error(`Could not log you out`);
					}
				})
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Users.",
			});
		});
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
	const username = req.query.username;
	var condition = username
		? { username: { [Op.like]: `%${username}%` } }
		: null;

	User.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Users.",
			});
		});
};

// Find a single User with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	User.findByPk(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error retrieving User with id=" + id + ": " + err,
			});
		});
};

// Update a User by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	User.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "User was updated successfully.",
				});
			} else {
				res.send({
					message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating User with id=" + id + " " + err,
			});
		});
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	User.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "User was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete User with id=${id}. Maybe User was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete User with id=" + id + " " + err,
			});
		});
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
	User.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({ message: `${nums} Users were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while removing all Users.",
			});
		});
};
